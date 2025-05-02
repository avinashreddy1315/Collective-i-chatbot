# Collective[i] Chatbot

A full-stack chatbot application built with a FastAPI backend and a React frontend, leveraging ChromaDB for retrieval-augmented responses and integrated with an LLM for refined answer generation.

This Collective[i] Chatbot is a white-label assistant that operates using a RAG (Retrieval-Augmented Generation) pipeline. It uses FastAPI as the backend framework and integrates LangChain, ChromaDB, Sentence-Transformers, and Redis to manage retrieval, vector embeddings, and caching. A large language model (LLM) is incorporated to improve the coherence and naturalness of responses, leveraging retrieved context from user-uploaded files (PDFs or TXT).

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)

---

## Project Overview

Collective[i] Chatbot demonstrates a modern implementation of Retrieval-Augmented Generation (RAG). It uses:

- **Vector-based search (ChromaDB)** to retrieve relevant content from uploaded files (PDFs or text files).
- **LLM-enhanced answer generation**, where the large language model refines and rewrites the RAG output to make it more natural and contextual.
- **LangChain**, to orchestrate the retrieval and generation flow.
- **FastAPI**, to expose APIs and handle file uploads.

## Features

- **RAG (Retrieval-Augmented Generation):** Retrieves relevant chunks from document storage.
- **LLM Refinement:** The retrieved text is processed by an LLM for fluent and concise answer generation.
- **Document Upload:** Supports PDF and TXT files for ingestion.
- **FastAPI Backend:** API server that manages file uploads and inference.
- **React Frontend:** Chat UI built with React, allowing multi chat session conversations.
- **Caching with Redis:** Improves performance with session and response storage.

## Tech Stack

- **Backend:**
  - Python
  - FastAPI
  - Uvicorn
  - LangChain
  - Redis
  - Requests
  - Python-Multipart
  - Python-Dotenv

- **Vector Store:**
  - ChromaDB (uses SQLite under the hood)
  - Sentence-Transformers

- **Frontend:**
  - React
  - React Router
  - Context API
  - Tailwind CSS

- **Tools:**
  - Git
  - virtualenv
  - PyPDF
  - LangChain-Community




## Installation

### Backend

The backend consists of two parts: a **Chat Service** for handling user queries and a **Document Ingestion Service** for processing PDF/TXT files into the vector store.

#### 1. Clone the repository:
```bash
git clone <repository-url>

```

---
#### 2. Create & activate a Python venv
```bash

cd Collective-i-chatbot/backend
python3 -m venv .venv
# macOS/Linux
source .venv/bin/activate
# Windows (PowerShell)
.\.venv\Scripts\Activate.ps1


```


---


#### 3. Setup for `ingestion_service`

Open a new terminal:

```bash
cd backend

# Create & activate virtual environment
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# OR 
.venv\Scripts\activate    # on Windows:

# Install your project dependencies
pip install -r ingestion_service/requirements.txt


# Finally, run the API on port 8001
uvicorn ingestion_service.main:app --reload --port 8001
```

---

#### 2. Setup for `chat_service`

```bash
cd chat_service
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# OR
.venv\Scripts\activate      # Windows

# this will install pip into your venv if it’s missing
python -m ensurepip --upgrade

# then upgrade to the latest pip
python -m pip install --upgrade pip

python -m pip install -r requirements.txt

#Install Uvicorn (if it isn’t already):
python -m pip install "uvicorn[standard]"


uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---



Now your backend is fully operational with both microservices running independently.



### Frontend

1. Open a new terminal, navigate to the `frontend` folder:
   ```bash
   cd collective_i_chatbot/frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

---

## Usage

1. With both backend and frontend running, open your browser to `http://localhost:3000`.
2. Enter your name to begin the chat session.
3. Ask questions—responses will integrate context retrieved from the vector store.

---

## Project Structure

```
collective_i_chatbot/
├backend/
├── chat_service/
│   ├── __init__.py
│   ├── cache.py
│   ├── main.py
│   ├── rag_vector_store.py
│   ├── requirements.txt
│
├── chromadb/
│
├── data/
│   ├── USA.txt
│   ├── billing_and_refunds.txt
│   ├── collectivei_context.txt
│   ├── password_and_account.txt
│   ├── product_features.txt
│   └── technical_support.txt
│
├── ingestion_service/
│   ├── __init__.py
│   ├── main.py
│   ├── rag_ingest.py
│   ├── requirements.txt
│
└── README.md    # Python dependencies
├── frontend/
│   ├src                       
├─- assets/          
├─-components             
│   ├─ ChatList.jsx        
│   ├─ ChatWindow.jsx      
│   ├─ MessagesRender.jsx  
│   ├─ NewChatDialog.jsx   
│   └─ SideChatBar.jsx     
├─-context                
│   ├─ ChatMapContext.jsx  
│   └─ userContext.jsx     
├─- data                   
│   └─ sessions.js         
├─- hooks                  
│   └─ useChatMap.js       
├─- pages                  
│   ├─ Dashboard.jsx       
│   └─ Welcome.jsx         
├─- App.css                
├─- App.jsx                
├─- index.css              
└─- main.jsx               

└── README.md                 # Project documentation
```

---

## Environment Variables

# I will provide the .env file both ingestion_service and chat_service seperatly. please create an .env file in chat_service and paste the provided  enviroment variable same repeat it to the ingestion_service.

