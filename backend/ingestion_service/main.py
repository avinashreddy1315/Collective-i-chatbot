from pathlib import Path
import os
from fastapi import FastAPI, File, UploadFile, HTTPException
from dotenv import load_dotenv
from .rag_ingest import ingest_file, BASE_DIR, DATA_FOLDER
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()
# DATA_FOLDER is already set to backend/data by rag_ingest

# 1️⃣ Add this CORS configuration:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ['*'] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower()
    print(ext)
    if ext not in {".pdf", ".txt"}:
        raise HTTPException(400, "Only .pdf and .txt allowed")

    # Save into backend/data
    dest = DATA_FOLDER / file.filename
    with open(dest, "wb") as f:
        f.write(await file.read())

    chunks = ingest_file(str(dest))
    return {"status": "ingested", "file": file.filename, "chunks": chunks}
