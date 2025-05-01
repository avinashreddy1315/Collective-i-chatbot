# main.py
import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from rag_vector_store import get_vector_store
from cache import get_cached, set_cached

load_dotenv()
HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL   = "mistralai/Mixtral-8x7B-Instruct-v0.1"

app = FastAPI()

# 1️⃣ Add this CORS configuration:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ['*'] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = get_vector_store()

class ChatRequest(BaseModel):
    message: str

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.post("/api/chat")
async def chat(req: ChatRequest):
    key = f"chat:{req.message}"
    cached = await get_cached(key)
    if cached:
        return {"response": cached}

    docs = db.similarity_search(req.message, k=3)
    if not docs:
        return {"response": "Sorry, I don't know the answer to that."}

    context = "\n\n".join(d.page_content for d in docs)
    prompt = (
        "Do not answer outside the provided context.\n"
        f"Context:\n{context}\n\n"
        f"Question: {req.message}\n"
        "Answer strictly in this format:\n"
        "Answer: "
    )
    payload = {
        "inputs": prompt,
        "parameters": {"temperature": 0.3, "max_new_tokens": 150}
    }
    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    resp = requests.post(
        f"https://api-inference.huggingface.co/models/{HF_MODEL}",
        headers=headers, json=payload
    )

    if resp.status_code == 200:
        try:
            gen = resp.json()[0]["generated_text"]
            answer = gen.split("Answer:")[-1].strip()
            await set_cached(key, answer)
        except (KeyError, IndexError, ValueError):
            answer = "❗️ LLM parse error."
    else:
        answer = f"❗️ LLM error: {resp.status_code} {resp.text}"

    return {"response": answer}
