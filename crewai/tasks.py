from textwrap import dedent
from crewai import Task
from configs import DESIGN_TASK_DESCRIPTION, DESIGN_TASK_EXPECTED_OUTPUT, \
EXPERT_TASK_DESCRIPTION, EXPERT_TASK_EXPECTED_OUTPUT

class SQLTasks():
    def sql_design_task(self, agent, requirement, schema):
        return Task(
            description=dedent(DESIGN_TASK_DESCRIPTION(schema, requirement)),
            agent=agent,
            expected_output=DESIGN_TASK_EXPECTED_OUTPUT
        )
        
    def sql_expert_task(self, agent, context):
        return Task(
            description=dedent(EXPERT_TASK_DESCRIPTION),
            output_file='outputs/result.txt',
            create_directory=True,
            agent=agent,
            expected_output=EXPERT_TASK_EXPECTED_OUTPUT
        )