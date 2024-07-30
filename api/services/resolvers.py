from crewai import Agent, Task, Crew, Process
from services.database import DatabaseManager
from services.utils import filterSchema, filterSchema_v2, markdownSQL, extractMarkdown, process_data
from prompts.agents import SQLAgents
from prompts.tasks import SQLTasks
from fastapi import HTTPException
import json 

agents = SQLAgents()
tasks = SQLTasks()
database = DatabaseManager("mysql")

class Resolvers():
    async def initialize_chat(self, file):
        if file == None:
            raise HTTPException(status_code=404, detail="File not found")   
        try: 
            contents = await file.read()
            schema = contents.decode('utf-8')
            
            filtered_schema = filterSchema_v2(schema)
            
            title_agent = agents.sql_title_agent()
            title_task = tasks.sql_title_task(title_agent, filtered_schema)

            recommended_agent = agents.sql_recommended_agent();
            recommended_task = tasks.sql_recommended_task(recommended_agent, filtered_schema)
            
            crew = Crew(
                    agents=[title_agent, recommended_agent],
                    tasks=[title_task, recommended_task],
                    verbose=True,
                )
            crew.kickoff()
            
            title = title_task.output.raw_output
            recommends = recommended_task.output.raw_output
            return {'title': title, 'recommends': json.loads(recommends), 'sql_content': schema}
        except HTTPException as e:
             raise HTTPException(status_code=500, detail="Initialize error")         
        
    
    async def ask_chat(self, requirement, schema, model, is_explain=False):     
        try:   
            filtered_schema = filterSchema_v2(schema)
            query_output = {"query", ""}
            explain_output = {"explain": ""}
            
            if is_explain == True:
                specialist = agents.sql_specialist_agent(model)
                expert = agents.sql_expert_agent(model)
                agent_list = [specialist, expert]

                design_task = tasks.sql_design_task(specialist, requirement, filtered_schema)  
                analyze_task = tasks.sql_expert_task(expert, design_task)
                task_list = [design_task, analyze_task]

                crew = Crew(agents=agent_list, tasks=task_list, verbose=True, process=Process.sequential)       
                crew.kickoff()
                
                query_output = json.loads(design_task.output.exported_output)
                explain_output = json.loads(analyze_task.output.exported_output)
            else:
                specialist = agents.sql_specialist_agent(model)
                agent_list = [specialist]

                design_task = tasks.sql_design_task(specialist, requirement, filtered_schema)  
                task_list = [design_task]
            
                crew = Crew(agents=agent_list, tasks=task_list, verbose=True)       
                crew.kickoff()
            
                query_output = json.loads(design_task.output.exported_output)
          
            completed_setup = await database.setup(schema)   
            if completed_setup == False:
                raise HTTPException(status_code=409, detail='SQL setup failed')

            # print(f"Query Output: {design_task.output.exported_output}")  
            # print(f"Explain Output: {analyze_task.output.exported_output}")  
            
            metadata = await database.execute(query_output.get("query", ""))
                
            return {
                'query': markdownSQL(query_output.get("query", "")),
                'explain': explain_output.get("explanation", ""),
                'suggest': explain_output.get("suggestion", ""),
                'problems':explain_output.get("problems", ""),
                'rows': process_data(metadata['rows']),
                'columns': metadata['columns']
            }
        except HTTPException as e:
            raise HTTPException(status_code=500, detail="Output")
          
           