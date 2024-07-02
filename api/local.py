from langchain_community.llms import Ollama
from crewai import Agent, Task, Crew, Process
from Database import DatabaseManager
from crewai_tools import SerperDevTool
from utils import filterSchema
import re

# from db_schema_2 import schema2

# Define model
model = Ollama(model="llama3")
search_tool = SerperDevTool()

def generate_local(question, schema, memory=""):
    json = filterSchema(schema)
    
    generator = Agent(
        role="Database Query Specialist",
        goal="Generate SQL queries based on user input while adhering to strict guidelines.",
        backstory=f"""
            You are a database query specialist with extensive experience in creating precise and efficient SQL queries. Your expertise ensures that every query you generate adheres to the highest standards and rules set by the database schema.

            Schema:
            -------
            {schema}
            -------
            
            Question:
            --------
            {question}
            --------
            
            Reminder: Generate a MySQL query to answer to the question
            * Respond as a valid MySQL query
            * Use 'SELECT* at least 4 columns in query
            * DO NOT use 'SELECT *'
            * All tables referenced MUST be aliased
            * ONLY use exact names of columns and tables in the Schema
            * CHECK exactly whether columns name is belong to right tables.
            * ALWAYS use 'LIMIT' function to limit for instance 20 rows.
            * Keep your query as simple and straightforward as possible; do not use subqueries
            * Use function to get the current date, if the question involves "today".
            * Use 'JOIN' function to join tables if there are tables need to be joined
            * ONLY query columns that are needed to answer the user question.
            * 'GROUP BY' enough essential columns
            * DO NOT generate any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database
            * Reply Vietnamese Language if question use Vietnamese language
        """,
        # tools=[search_tool],
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
            
            Based on the Structure and Question, write a valid MySQL query that strictly adheres to Reminder, optimizing for readability and performance where applicable
            If Question contains 'Error', rewrite query base on the Question's Error
        """,
        agent=generator,
        # tools= [search_tool],
        expected_output="""
            ONLY An optimal, syntactically correct MySQL query to retrieve relevant information of the Question based on the Schema
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
        agents=[generator, extractor],
        tasks=[generator_task, extractor_task],
        verbose=2,
        process=Process.sequential
    )

    # Kickoff the process and print the output
    output = crew.kickoff()
    # past_result = output
    # print("* SQl Query: \n" + output)

    sql_query = ""
    pattern_1 = re.compile(r'```sql(.*?)```', re.DOTALL)
    matches_1 = pattern_1.findall(output)
    if len(matches_1) != 0:
        sql_query = matches_1[0]  
    

    try:
        DB = DatabaseManager("mysql")
        DB.setup(schema)
        result, columns = DB.query(sql_query)

        # return test result
        d = dict()
        d['output'] = output
        d['execute'] = result
        d['columns'] = columns
        return d

    except Exception as e:
        print("Lỗi ở local: " + str(e))
        d = dict()
        d['output'] = output
        return d
