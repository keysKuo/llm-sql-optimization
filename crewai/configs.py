from dotenv import load_dotenv
import os

load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME_SETUP = os.getenv('DB_NAME_SETUP')
DB_NAME_USE = os.getenv('DB_NAME_USE')

GROQ_API_BASE = os.getenv('GROQ_API_BASE')
GROQ_MODEL_NAME = os.getenv('GROQ_MODEL_NAME')
GROQ_API_KEY = os.getenv('GROQ_API_KEY')

SYSTEM_EXTEND_PROMPT = """
            * Generate a MySQL query to answer to the question
            * Respond as a valid MySQL query in type string
            * 'SELECT' at least 4 columns in query
            * DO NOT use 'SELECT *'
            * DO NOT use 'WHERE' clause unless Question mention
            * All tables referenced MUST be aliased
            * ONLY use exact names of columns and tables in the Schema
            * CHECK exactly whether columns name is belong to right tables.
            * ALWAYS use 'LIMIT' function to limit for instance 20 rows.
            * Keep your query as simple and straightforward as possible; do not use subqueries
            * Use function 'CURRENT_DATE', if the question involves "today".
            * Use 'JOIN' function to join tables if there are tables need to be joined
            * ONLY query columns that are needed to answer the user question.
            * 'GROUP BY' enough essential columns
            * In cases of many-to-many relationships between tables, such as between `order` and `product`, use the intermediary table (e.g., `orderDetail`) to link the tables. For example, if querying product information related to orders, use `productId` from `orderDetail` instead of directly from `order`.
            * Minimizing the risk of using incorrect column names
            * DO NOT generate any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database
            * Reply Vietnamese Language if question use Vietnamese language
"""