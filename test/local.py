from langchain_community.llms import Ollama
from crewai import Agent, Task, Crew, Process
from Database import DatabaseManager
from utils import filterSchema, markdownSQL, extractMarkdown, createPrompt
import re


# Define model
model = Ollama(model="llama3")

def generate_local(question, schema, memory=""):
    json = filterSchema(schema)
    err = "None"
    count = 0
    prompt = createPrompt(question, schema)
    response = dict()
    
    while err is not None and count < 5:
        generator = Agent(
            role="Database Query Specialist",
            goal="Generate SQL queries based on user input while adhering to strict guidelines.",
            backstory=f"""
                You are a database query specialist with extensive experience in creating precise and efficient SQL queries. Your expertise ensures that every query you generate adheres to the highest standards and rules set by the database schema.
                {prompt}
            """,
            verbose=True,
            allow_delegation=False,
            llm=model 
        )

        # Define tasks
        generator_task = Task(
            description=f"""
                Question: 
                --------
                {question}
                --------

                Structure:
                --------
                {json}
                --------
                
                Memory: 
                --------
                {memory}
                --------
                
                Error:
                --------
                {err}
                --------
                
                Based on the Structure and Question, write a valid MySQL query that strictly adheres to Reminder, optimizing for readability and performance where applicable
                If Question contains 'Error', rewrite query base on the Question's Error
            """,
            agent=generator,
            # tools= [search_tool],
            expected_output="""
                ONLY An optimal, syntactically correct MySQL query to retrieve relevant information of the Question based on the Schema
                No Explaination, No Note
            """
        )

        extractor = Agent(
            role = "SQL Query Extractor",
            goal = """
                To extract only SQL query code block from a passage or text while adhering to strict guidelines.
            """,
            backstory = """
                You are an SQL queries extractor expert and specialist.
                You are responsible for extracting ONLY SQL queries code block from a passage or text.
                You must extract SQL queries and place it in this format ```sql ```.
            """,
            verbose=True,
            allow_delegation=False,
            llm=model
        )

        extractor_task = Task(
            description = """
                Strictly adhering to the following rules:
                    - Receive the output from 'generator' agent and extract ONLY the SQL queries code block.
                    - Format the SQL queries code block to format ```sql ``` of markdown.
                    Do NOT skip this step.
            """,
            agent=extractor,
            expected_output = """
                Explaination of the query,
                SQL language markdown code get from 'generator'.
            """,
            context = [generator_task]
        )

        # Define crew
        crew = Crew(
            agents=[generator],
            tasks=[generator_task],
            verbose=2,
            process=Process.sequential
        )

        # Kickoff the process and print the output
        output = crew.kickoff()
        ssql = extractMarkdown(output)
        
        try:
            DB = DatabaseManager("mysql")
            DB.setup(schema)     
            result, columns, error = DB.query(ssql)
            
            if error is not None:
                response['output'] = markdownSQL(ssql)
                err = error
                count = count + 1
                continue

            # return test result
            response['output'] = markdownSQL(ssql)
            response['execute'] = result
            response['columns'] = columns
            
            err = None
            return response

        except Exception as e:
            print("Lỗi ở local: " + str(e))
            return response
    return response

