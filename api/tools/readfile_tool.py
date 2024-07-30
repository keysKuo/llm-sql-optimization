from crewai_tools import BaseTool
from pydantic import BaseModel, Field
import os

class SQLFileReadTool(BaseTool):
    name: str = "SQLFileReadTool"
    description: str = "This tool reads a SQL database schema file_path and extracts information to assist with query design."
    file_path: str = Field(..., description="Path to the SQL file to be read")
    
    def _run(self) -> str:
        # Use the provided argument if available, otherwise use the initialized file path
        path_to_read = self.file_path
        
        if not path_to_read:
            return "No file path provided."

        if not os.path.isfile(path_to_read):
            return f"File '{path_to_read}' does not exist."

        try:
            with open(path_to_read, 'r') as file:
                file_contents = file.read()
            # Here you can implement parsing logic to extract schema information
            return file_contents
        except Exception as e:
            return f"Error reading file: {e}"

class SQLReadTool(BaseTool):
    name: str = "SQLReadTool"
    description: str = "Read database schema input then write sql query solve the requirement"
    schema: str = Field(..., description="Database schema")
    requirement: str = Field(..., description="User requirement")
    
    def _run(self):
        return f"""
            Schema
            -------
            {self.schema}
            
            Requirement
            -------
            {self.requirement}
            
            IMPORTANT*: Iter only once
                """