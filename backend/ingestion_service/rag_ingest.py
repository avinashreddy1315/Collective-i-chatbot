from pathlib import Path
import os

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.schema import Document

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_distances

# BASE_DIR → always resolve to backend/
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FOLDER = BASE_DIR / "data"
PERSIST_DIR = BASE_DIR / "chromadb"
EMB_MODEL   = os.getenv("EMB_MODEL", "all-MiniLM-L6-v2")

# tune this: if two adjacent paras have cosine‐distance > THRESHOLD, we start a new chunk
THRESHOLD = 0.5  

def ingest_file(file_path: str) -> int:
    DATA_FOLDER.mkdir(parents=True, exist_ok=True)

    # 1. Load pages or text
    ext = Path(file_path).suffix.lower()
    loader = PyPDFLoader(file_path) if ext == ".pdf" else TextLoader(file_path)
    raws = loader.load()
    
    # 2. Combine into one text blob
    combined = "\n\n".join(doc.page_content for doc in raws)

    # 3. Paragraph‐level split
    paras = [p.strip() for p in combined.split("\n\n") if p.strip()]

    # 4. Compute embeddings for each paragraph
    hf_model = SentenceTransformer(EMB_MODEL)
    para_embs = hf_model.encode(paras, convert_to_numpy=True)

    # 5. Detect semantic boundaries
    boundaries = [0]
    for i in range(len(para_embs) - 1):
        dist = cosine_distances([para_embs[i]], [para_embs[i+1]])[0][0]
        if dist > THRESHOLD:
            boundaries.append(i+1)
    boundaries.append(len(paras))

    # 6. Build chunks between boundaries
    docs = []
    for start, end in zip(boundaries, boundaries[1:]):
        chunk_text = "\n\n".join(paras[start:end])
        docs.append(Document(page_content=chunk_text))

    # 7. Embed & persist
    embeddings = SentenceTransformerEmbeddings(model_name=EMB_MODEL)
    db = Chroma(persist_directory=str(PERSIST_DIR), embedding_function=embeddings)
    db.add_documents(docs)

    return len(docs)

def ingest_all() -> None:
    total = 0
    for path in DATA_FOLDER.iterdir():
        if path.suffix.lower() in {".txt", ".pdf"}:
            count = ingest_file(str(path))
            print(f"Ingested {count} chunks from {path.name}")
            total += count
    print(f"✅ Total chunks ingested: {total}")

if __name__ == "__main__":
    ingest_all()
