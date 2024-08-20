# 2022/2023 ML and Generative AI Full-Stack App

## Overview

This repository contains a full-stack machine learning and generative AI application with an attractive UI. It was created as a sandbox environment during our transition from GPT-3 text-davinci-001 to OpenAI's milestone release of text-davinci-002. This dev-only repository served as a platform for prototyping, collaboration, proof of concept development, and ultimately as a source for components used in other production projects. This repo was retired around the beginning of GPT-4 since its emergence demonstrated a clear market shift, prompting us to develop a new internal sandbox (not published).

## Key Features

- Leverages traditional machine learning for its battle-hardened strengths in Named Entity Recognition (NER) and Natural Language Processing (NLP)
- Effective use of legacy generative AI models (GPT-3 series text-davinci-001 and text-davinci-002) for non-chatbot applications without complex abstractions like Langchain
- Attractive and mature UI
- Integrates compliance-respecting and cost-effective AI tools

## Tech Stack

### Frontend
- React
- Emotion CSS-in-JS
- Tiptap (Prosemirror)
- Lexical Rich Text Editor (styled with vanilla CSS)
- MantineUI framework

### Backend
- Redis (for caching)
- Supabase Authentication
- PostgreSQL (traditional and pgvector for vector database)

### AI and ML Components
- OpenAI GPT-3 series (text-davinci-002)
- Local ML models using spaCy
- Hugging Face models:
  - stanfordAIMI
  - OBI/deid_roberta_12b2
  - flair
- Traditional ML techniques:
  - Named Entity Recognition (NER)
  - Natural Language Processing (NLP)
  - Semantic evaluation
- BERT and regular expressions for privacy-respecting, cost-effective AI

### Supporting Services
- Python services containerized (e.g., Presidio and other ML systems)

## Purpose

This project demonstrates advanced AI application workflows that combine traditional ML and generative AI. It showcases a mature and beautiful implementation without the complex abstractions often found in modern generative AI apps. The integration of battle-hardened, non-LLM AI tools like BERT, along with traditional regular expressions, proved to be privacy-respecting, cost-reducing, and highly effective components in a generative AI workflow.

## Development Notes

- This project was never intended for production use
- Storybook and Jest usage is minimal

## Archival Status

This repository is being published and archived as a personal milestone, demonstrating the state of advanced AI application development in 2022/2023.

## Disclaimer

This project is not maintained and is provided as-is for reference purposes only.