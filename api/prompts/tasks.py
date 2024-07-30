from textwrap import dedent
from crewai import Task
from prompts.configs import DESIGN_TASK_DESCRIPTION, DESIGN_TASK_EXPECTED_OUTPUT, \
EXPERT_TASK_DESCRIPTION, EXPERT_TASK_EXPECTED_OUTPUT, \
TITILE_TASK_DESCRIPTION, TITLE_TASK_EXPECTED_OUTPUT, \
RECOMMEND_TASK_DESCRIPTION, RECOMMEND_TASK_EXPECTED_OUTPUT
from pydantic import BaseModel
from tools.readfile_tool import SQLReadTool


class QueryOutput(BaseModel):
    query: str

class ExplainOutput(BaseModel):
    explanation: str
    suggestion: str
    problems: str

class SQLTasks():
    def sql_design_task(self, agent, requirement, schema):
        sql_read_tool = SQLReadTool(schema=schema, requirement=requirement)
        return Task(
            description="",
            agent=agent,
            output_file='outputs/query.json',
            create_directory=True,
            tools=[sql_read_tool],
            expected_output=DESIGN_TASK_EXPECTED_OUTPUT,
            output_json=QueryOutput
        )
        
    def sql_expert_task(self, agent, context):
        return Task(
            description=dedent(EXPERT_TASK_DESCRIPTION),
            output_file='outputs/analyze.json',
            create_directory=True,
            agent=agent,
            expected_output=EXPERT_TASK_EXPECTED_OUTPUT,
            output_json=ExplainOutput
        )
    
    def sql_title_task(self, agent, schema):
        return Task(
            description=dedent(TITILE_TASK_DESCRIPTION(schema)),
            agent=agent,
            expected_output=TITLE_TASK_EXPECTED_OUTPUT
        )
        
    def sql_recommended_task(self, agent, schema):
        return Task(
            description=dedent(RECOMMEND_TASK_DESCRIPTION(schema)),
            agent=agent,
            expected_output=RECOMMEND_TASK_EXPECTED_OUTPUT
        )