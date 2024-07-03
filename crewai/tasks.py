from textwrap import dedent
from crewai import Task

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
                    * 'SELECT' at least 4 columns in query.
                    * DO NOT use 'SELECT *' clause.
                    * DO NOT use 'WHERE' clause unless Requirement mention.
                    * ONLY use exact names of columns and tables in the Schema.
                    * Respond as a valid MySQL query in type string.
                    * All tables referenced MUST be aliased.
                    * CHECK exactly whether columns name is belong to right tables.
                    * ALWAYS use 'LIMIT' function to limit for instance 20 rows.
                    * Keep your query as simple and straightforward as possible; do not use subqueries.
                    * Use function 'CURRENT_DATE', if the Requiment involves "today".
                    * Use 'JOIN' function to join tables if there are tables need to be joined.
                    * ONLY query columns that are needed to solve the Requirement.
                    * 'GROUP BY' enough essential columns.
                    * In cases of many-to-many relationships between tables, such as between `order` and `product`, use the intermediary table (e.g., `orderDetail`) to link the tables. For example, if querying product information related to orders, use `productId` from `orderDetail` instead of directly from `order`.
                    * Minimizing the risk of using incorrect column names.
                    * DO NOT write any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database."""),
            agent=agent,
            expected_output="""
                MySQL query.
                No Explaination, No Note.
            """
        )