


# SQL Learning Support System with Large Language Models
---

**The SQL Learning Support System with Large Language Models is designed to improve how individuals learn and work with SQL. By using advanced language models like Llama3, Gemma2, Mistral,... this system provides smart and helpful support for understanding, writing, and optimizing SQL queries. It offers an interactive platform where learners can ask questions, get clear explanations and visualizations, receive real-time help with their SQL tasks. Whether you're a beginner learning the basics or an experienced user looking to enhance your skills, this system can be a significant supporter to your SQL learning.**


<div align="center">
  <img width="1200" src="./frontend/public/demo.gif" alt="Demo" />
</div>


# Built with:
* [![React][React.js]][React-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![Flask][Flask]][Flask-url]

# Requiments:
* Ollama >= 0.147
* Groq Cloud
* Langchain community
* Models:
  * Gamma2 - 9b
  * Mistral - 7b
  * Llama3 - 8b
  * Llama3 - 70b
  * Phi3 - mini
  * Phi3 - medium

# Installation:

```bash
# Clone dự án từ GitHub
git clone https://github.com/keysKuo/Llama3-sql-optimization.git

# Đi vào thư mục của dự án
cd Llama3-sql-optimization/

# Cài đặt các package từ tệp requirements.txt
pip install -r requirements.txt

# Đi vào thư mục frontend
cd frontend/

# Cài đặt các package frontend
npm install
```

# Environment:
Setup ``.env`` according to ``.env.example`` 

```sh
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME_SETUP=sys # Initial database
DB_NAME_USE=<databasename> # Using database

GROQ_API_BASE=https://api.groq.com/openai/v1
GROQ_MODEL_NAME=llama3-70b-8192
GROQ_API_KEY=groqapikey # Groq cloud API Key
```

# Run app:

```bash
# Run Backend from root directory
python crewai/index.py 
# Default http://localhost:5000

# Run Frontend from frontend directory
cd frontend/
npm run dev 
# Default http://localhost:5173
```


[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Flask]: https://img.shields.io/badge/Flask-1D5C87?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
