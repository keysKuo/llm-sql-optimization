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
                Result includes:
                - **SQL Query** (output)
            """
        )
        
    def sql_expert_task(self, agent, context):
        return Task(
            description=dedent(f"""
            You will analyze and evaluate the query from the 'SQL Specialist'.
            If query is optimize, explain how it works,
            else you will suggest how to optimize it (such as index, partition, ...) and show its problem if it is irrelevant to the Requirement
            """),
            output_file='outputs/result.txt',
            create_directory=True,
            agent=agent,
            expected_output="""
                Result includes:
                - **SQL Query:** (Query from 'SQL Specialist')
                - **Explanation:** (Explain how query work)
                - **Suggestion:** (Suggest how to optimize)
                - **Problems:** (Show the problems if exist)
            """
        )