🚀 Multimodal GPT-OSS Vision System
🌍 Extensible to ISRO Earth Observation (EO) Data

An AI-powered multimodal system that augments OpenAI GPT-OSS with vision understanding to analyze satellite imagery, perform visual reasoning, and generate human-readable scientific reports.
Built to support image captioning, visual Q&A, change detection, and EO data analysis.

🔴 Live Demo

👉 Deployment URL
🌐 https://studio-979o.onrender.com

👉 GitHub Repository
📦 https://github.com/SaiPriya0606/studio

🧭 Application Flow

1️⃣ User opens the web application
2️⃣ Navigates to Dashboard Modules
3️⃣ Uploads / analyzes visual or EO-based inputs
4️⃣ AI performs:

Vision understanding

Multimodal reasoning

Report synthesis
5️⃣ System generates structured natural-language outputs

🌐 Routes
Route	Description
/	Landing page
/dashboard	Main AI dashboard
/dashboard/eo-analysis	EO data analysis
/dashboard/change-detection	Temporal image comparison
/dashboard/captioning	Image captioning
/dashboard/vqa	Visual Question Answering
/dashboard/reports	Scientific report generation
✨ Key Features
🖼️ Multimodal Vision

Image captioning

Visual Question Answering (VQA)

Vision + language alignment

🌍 ISRO EO Data Use-Cases

Land-cover interpretation

Environmental monitoring

Change detection across time-series imagery

🧠 AI Reasoning

Multimodal instruction following

Natural language explanations grounded in visuals

Scientific & executive-level report synthesis

📄 Report Generator

ISO-style structured reports

Human-readable summaries

EO evidence-based reasoning

🧪 How Reviewers Can Test

1️⃣ Open the deployed link
2️⃣ Go to Dashboard → Any Module
3️⃣ Try:

Captioning an image

Asking questions about visual inputs

Generating a report
4️⃣ Observe:

Response accuracy

Multimodal reasoning

UI performance

⚠️ No local setup required for evaluation

🛠️ Tech Stack
Frontend

Next.js 15 (App Router)

React 19

Tailwind CSS

Radix UI

AI & Multimodal

Genkit

Google Gemini (Vision + Text)

Vision–Language Alignment Pipeline

Backend & Tooling

Node.js

TypeScript

Deployment

Render (Production)

GitHub (Source Control)

⚙️ Environment Variables
GEMINI_API_KEY=your_google_gemini_api_key

🔍 How to Check Environment Variables

Render → Service → Environment → Environment Variables

Firebase Studio AI → Project Settings → Secrets

Local → .env file or echo $GEMINI_API_KEY

✅ Only Gemini API Key is used

🧩 Project Structure (High-Level)
studio/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   └── page.tsx
│   ├── components/
│   ├── ai/
│   └── hooks/
├── public/
├── package.json
├── next.config.js
└── README.md

🚀 Local Setup (Optional)
git clone https://github.com/SaiPriya0606/studio.git
cd studio
npm install
export GEMINI_API_KEY=your_api_key
npm run dev


Open 👉 http://localhost:3000

🔐 Reviewer Transparency

Firebase Studio AI is used only as a development environment

No Firebase-specific runtime dependency

Final evaluation depends on:

GitHub repository

Render deployment

API key usage is standard & visible

👨‍💻 Author

G. Sai Priya

🔗 GitHub: https://github.com/SaiPriya0606

🌐 Deployment: https://studio-979o.onrender.com

⭐ If you liked this project, don’t forget to star the repo!

📄 License

This project is licensed under the MIT License
