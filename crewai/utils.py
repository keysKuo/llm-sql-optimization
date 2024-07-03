import re
import json
from datetime import timedelta, date

def createPrompt(question, schema):
    return f"""
    Schema:
    -------
    {schema}
    -------

    Question:
    --------
    {question}
    --------

    Reminder:
    -------- 
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
    --------
    """

def filterSchema(schema):
    lines = schema.split(";\n")
    queries = dict()
    for line in lines:
        strip = line.strip()
        if strip.upper().startswith('CREATE'):
            table_name, columns = parseQuery(strip)
            queries[table_name] = columns
    
    return queries
    

def parseQuery(sql):
    table_regex = r'CREATE\s+TABLE\s+(\w+)\s*\(([^;]+)\)'
    column_regex = r'(\w+)\s+([^\n,]+),?'

    table_match = re.search(table_regex, sql, re.IGNORECASE)
    if not table_match:
        raise ValueError("Invalid CREATE TABLE statement")

    table_name = table_match.group(1)
    columns_part = table_match.group(2)

    columns = {}
    for match in re.finditer(column_regex, columns_part):
        column_name = match.group(1)
        column_definition = match.group(2).strip()
        columns[column_name] = column_definition

    return table_name, columns

def markdownSQL(query):    
    return f"```sql\n{query}\n```"

def extractMarkdown(markdown_text):
    # Regular expression to match SQL statements in markdown
    sql_patterns = [
        re.compile(r"```sql\n(.*?)\n```", re.DOTALL),
        re.compile(r"```\n(.*?)\n```", re.DOTALL)
    ]
    
    # Find all SQL matches from both patterns
    sql_matches = []
    for pattern in sql_patterns:
        sql_matches.extend(pattern.findall(markdown_text))
    
    if len(sql_matches) == 0:
        return markdown_text
    else:
        return sql_matches[0]



# Hàm tùy chỉnh để chuyển đổi các đối tượng phức tạp thành dạng có thể tuần tự hóa
def custom_serializer(obj):
    if isinstance(obj, timedelta):
        return str(obj)  # Chuyển thành chuỗi
    elif isinstance(obj, date):
        return obj.isoformat()  # Chuyển thành định dạng ISO
    raise TypeError(f"Type {type(obj)} not serializable")

