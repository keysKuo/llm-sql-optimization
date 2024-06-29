


# About this project:

The project is built on the idea of optimizing SQL query statements. Its goal is to enhance query optimization by leveraging large language models (LLMs). The primary model applied in the project is Llama3, integrated with several techniques to support visual query analysis. Through various extensions, the project aims to directly execute SQL statements and visualize them using different types of charts.

<h3 align="center">
    <img width="700" style="border-radius:5px;" alt="screenshot" src="frontend/public/llama-local.png">
</h3>

# Built with:
    Flask
    Groq Cloud
    Langchain Communitity
    Llama3 8b (local)
    Llama3 70b (groq)

# Installation:

```bash
# Clone dự án từ GitHub
git clone https://github.com/keysKuo/CrewAI-Test.git

# Đi vào thư mục của dự án
cd CrewAI-Test/

# Cài đặt các package từ tệp requirements.txt
pip install -r requirements.txt

# Đi vào thư mục frontend
cd frontend/

# Cài đặt các package frontend
npm install
```

# Run app:

```bash
# Khởi động backend từ thư mục gốc
python api/index.py 
# http://localhost:5000

# Khởi động frontend từ thư mục frontend
cd frontend/
npm run dev 
# http://localhost:5173
```
