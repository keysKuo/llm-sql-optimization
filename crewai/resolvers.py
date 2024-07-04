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
        # specialist = agents.sql_specialist_agent_70b() if model == '70b' else agents.sql_specialist_agent_8b()
        specialist = agents.sql_specialist_agent(model)
        design_task = tasks.sql_design_task(specialist, requirement, filterSchema_v2(schema))
        
        crew = Crew(
            agents=[specialist],
            tasks=[design_task],
            verbose=True
        )
        
        output = crew.kickoff()
        ssql = extractMarkdown(output)
        response = dict()
        
        try:
            DB = DatabaseManager("mysql")
            # DB.setup(schema)     
            result, columns, error = DB.query(ssql)

            # Return test result
            response['output'] = markdownSQL(ssql)
            response['execute'] = result
            response['columns'] = columns
            return response

        except Exception as e:
            print("Lỗi ở local: " + str(e))
            return response
    