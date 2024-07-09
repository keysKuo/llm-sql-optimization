import os 
from configs import GROQ_API_BASE, GROQ_MODEL_NAME, GROQ_API_KEY, \
SPECIALIST_AGENT_ROLE, SPECIALIST_AGENT_GOAL, SPECIALIST_AGENT_BACKSTORY, \
EXPERT_AGENT_ROLE, EXPERT_AGENT_GOAL, EXPERT_AGENT_BACKSTORY

os.environ["OPENAI_API_BASE"] = GROQ_API_BASE
os.environ["OPENAI_MODEL_NAME"] = GROQ_MODEL_NAME  # Adjust based on available model
os.environ["OPENAI_API_KEY"] = GROQ_API_KEY

from textwrap import dedent
from crewai import Agent
from langchain_community.llms import Ollama

class SQLAgents():
    def sql_specialist_agent(self, model):
        return Agent(
            role=SPECIALIST_AGENT_ROLE,
            goal=SPECIALIST_AGENT_GOAL,
            backstory=dedent(SPECIALIST_AGENT_BACKSTORY),
            allow_delegation=False,
            verbose=True,
            llm=Ollama(model=model)
        )
        
    def sql_specialist_agent_groq(self):
        return Agent(
            role=SPECIALIST_AGENT_ROLE,
            goal=SPECIALIST_AGENT_GOAL,
            backstory=dedent(SPECIALIST_AGENT_BACKSTORY),
            allow_delegation=False,
            verbose=True,
        )
        
    def sql_expert_agent(self, model):
        return Agent(
            role=EXPERT_AGENT_ROLE,
            goal=EXPERT_AGENT_GOAL,
            backstory=dedent(EXPERT_AGENT_BACKSTORY),
            allow_delegation=False,
            verbose=True,
            llm=Ollama(model=model)
        )
        
    def sql_expert_agent_groq(self):
        return Agent(
            role=EXPERT_AGENT_ROLE,
            goal=EXPERT_AGENT_GOAL,
            backstory=dedent(EXPERT_AGENT_BACKSTORY),
            allow_delegation=False,
            verbose=True,
        )

        