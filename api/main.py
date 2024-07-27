from fastapi import FastAPI, Form, HTTPException, File, UploadFile
from services.resolvers import Resolvers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
resolver = Resolvers()

origins = [
    "http://localhost:5173"
]

# Thêm middleware CORS vào ứng dụng FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Cho phép các nguồn này
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, v.v.)
    allow_headers=["*"],  # Cho phép tất cả các headers
)

@app.get('/')
async def root() -> dict:
    return {"data": 'FastAPI'}

@app.post('/ask-chat')
async def ask_chat(question: str = Form(...), schema: str = Form(...), model: str = Form(...), is_explain: bool = Form(...)) -> dict:    
    return await resolver.ask_chat(question, schema, model, is_explain)

@app.post('/init-chat')
async def initialize_chat(file: UploadFile = File(...)) -> dict:
    return await resolver.initialize_chat(file)
    
