import os
from dotenv import load_dotenv
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()
PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "../chromadb")
MODEL_NAME = os.getenv("EMB_MODEL", "all-MiniLM-L6-v2")

def get_vector_store():
    embeddings = SentenceTransformerEmbeddings(model_name=MODEL_NAME)
    return Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)
