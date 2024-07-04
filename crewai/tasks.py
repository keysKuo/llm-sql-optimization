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