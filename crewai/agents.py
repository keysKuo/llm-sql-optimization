import os 
from configs import GROQ_API_BASE, GROQ_MODEL_NAME, GROQ_API_KEY

os.environ["OPENAI_API_BASE"] = GROQ_API_BASE
os.environ["OPENAI_MODEL_NAME"] = GROQ_MODEL_NAME  # Adjust based on available model
os.environ["OPENAI_API_KEY"] = GROQ_API_KEY

from textwrap import dedent
from crewai import Agent
from langchain_community.llms import Ollama

class SQLAgents():
    def sql_specialist_agent(self, model):
        return Agent(
            role='SQL Specialist',
            goal='Design optimical SQL queries for database',
            backstory=dedent("""
                    You are a SQL Specialist at a leading tech think tank.
                    Your expertise in designing SQL queries in MySQL language
                    and do your best to optimize performance of your SQL queries."""),
            allow_delegation=False,
            verbose=True,
            llm=Ollama(model=model)
        )
        
    def sql_specialist_agent_groq(self):
        return Agent(
            role='SQL Specialist',
            goal='Design optimical SQL queries for database',
            backstory=dedent("""
                    You are a SQL Specialist at a leading tech think tank.
                    Your expertise in designing SQL queries in MySQL language
                    and do your best to optimize performance of your SQL queries."""),
            allow_delegation=False,
            verbose=True,
        )
        
    def sql_expert_agent(self, model):
        return Agent(
            role='SQL Expert',
            goal='Analyze and evaluate SQL queries and databases',
            backstory=dedent("""
                    You are an SQL Expert at a leading tech think tank.
                    Your expertise in analyzing and evaluating how effect the SQL queries to the database
                    and do your best to ensure the highest syntax quality and query performance within the database context.
                    If there are issues with a query, you are responsible for identifying the problems in the query or database and suggesting solutions."""),
            allow_delegation=False,
            verbose=True,
            llm=Ollama(model=model)
        )
        
    def sql_expert_agent_groq(self):
        return Agent(
            role='SQL Expert',
            goal='Analyze and evaluate SQL queries and databases',
            backstory=dedent("""
                    You are an SQL Expert at a leading tech think tank.
                    Your expertise in analyzing and evaluating how effect the SQL queries to the database
                    and do your best to ensure the highest syntax quality and query performance within the database context.
                    If there are issues with a query, you are responsible for identifying the problems in the query or database and suggesting solutions."""),
            allow_delegation=False,
            verbose=True,
        )

        