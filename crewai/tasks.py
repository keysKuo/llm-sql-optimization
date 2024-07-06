from textwrap import dedent
from crewai import Task
from configs import SYSTEM_EXTEND_PROMPT

class SQLTasks():
    def sql_design_task(self, agent, requirement, schema):
        return Task(
            description=dedent(f"""
            Based on the Schema, you will design MySQL query to solve the Requirement below while strictly adhering to the Instructions:
            
            Schema:
            -----------
            {schema}
            
            Requirement
            -----------
            {requirement}
            
            Instructions
            ------------
            {SYSTEM_EXTEND_PROMPT}
            """),
            agent=agent,
            expected_output="""
                MySQL query code.
                No Explaination, No Note.
            """
        )
        
    def sql_expert_task(self, agent, context):
        return Task(
            description=dedent(f"""
            You will analyze and evaluate the query from the 'SQL Specialist' if it is optimize, how it work and show its problem if it is irrelevant to the Requirement.
            """),
            agent=agent,
            # context=[context],
            expected_output="""
                Result includes:
                - **SQL Query**: markdown (Query from 'SQL Specialist')
                - **Explaination**: text (Explain how query work)
                - **Problems**: text (Show the problems if exist)
            """
        )