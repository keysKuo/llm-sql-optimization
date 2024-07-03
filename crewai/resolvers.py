from crewai import Agent, Task, Crew, Process
from database import DatabaseManager
from utils import filterSchema, markdownSQL, extractMarkdown, createPrompt
from agents import SQLAgents
from tasks import SQLTasks
import re

agents = SQLAgents()
tasks = SQLTasks()

class Resolvers():
    def generate_sql(self, requirement, schema, model):
        specialist = agents.sql_specialist_agent_70b() if model == '70b' else agents.sql_specialist_agent_8b()
        design_task = tasks.sql_design_task(specialist, requirement, filterSchema(schema))
        
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
            DB.setup(schema)     
            result, columns, error = DB.query(ssql)

            # Return test result
            response['output'] = markdownSQL(ssql)
            response['execute'] = result
            response['columns'] = columns
            return response

        except Exception as e:
            print("Lỗi ở local: " + str(e))
            return response
    