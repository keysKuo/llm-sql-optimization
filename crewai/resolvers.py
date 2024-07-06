from crewai import Agent, Task, Crew, Process
from database import DatabaseManager
from utils import filterSchema, filterSchema_v2, markdownSQL, extractMarkdown
from agents import SQLAgents
from tasks import SQLTasks
import re

agents = SQLAgents()
tasks = SQLTasks()

class Resolvers():
    def setup_sql(self, schema):
        try:
            DB = DatabaseManager("mysql")
            DB.setup(schema)       
            return True
        except Exception as e:
            print("Error: " + str(e))
            return False
    
    def generate_sql(self, requirement, schema, model):
        filter = filterSchema_v2(schema)

        specialist = agents.sql_specialist_agent_groq() if model == 'groq' else agents.sql_specialist_agent(model)
        design_task = tasks.sql_design_task(specialist, requirement, filter)
        expert = agents.sql_expert_agent_groq() if model == 'groq' else agents.sql_expert_agent(model)
        analyze_task = tasks.sql_expert_task(expert, design_task)

        crew = Crew(
            agents=[specialist, expert],
            tasks=[design_task, analyze_task],
            verbose=True,
            process=Process.sequential
        )
        
        output = crew.kickoff()
        print(output)
        ssql = extractMarkdown(output)
        
        response = dict()
        
        try:
            DB = DatabaseManager("mysql")
            # DB.setup(schema)     
            result, columns, error = DB.query(ssql)

            # Return test result
            response['output'] = output
            response['execute'] = result
            response['columns'] = columns
            return response

        except Exception as e:
            print("Lỗi ở local: " + str(e))
            return response
    