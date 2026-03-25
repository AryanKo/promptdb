# PromptDB 🧠

<div align="center">
  <p><strong>A modern, minimalist prompt library built for speed, security, and open contribution.</strong></p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<br />

PromptDB is a specialized tool for curating, discovering, and submitting high-quality system instructions, AI personas, and creative prompts. Built on a serverless architecture with a stunning dark "tech-vibe" UI, it offers zero-latency fuzzy search and an automated GitHub-native submission pipeline.

---

## ✨ Features

- **Blazing Fast Fuzzy Search:** Powered by [Fuse.js](https://fusejs.io/), instantly filter the library by keyword, tag, or description logic.
- **Beautiful Dark Tech-Vibe UI:** Designed strictly with the 60-30-10 color rule utilizing a sleek `slate` and neon `cyan` palette.
- **Serverless GitHub Integration:** Secures GitHub API interactions via Edge functions to proxy submissions directly to repository pull requests.
- **Automated Approval Pipeline:** Includes a custom GitHub actions workflow to validate submissions and automatically open PRs—bringing fully automated curation into the loop without exposing secrets.
- **Built for Massive Prompts:** UI gracefully handles giant 100+ line security or engineering instructions using custom webkit scrollbars and max-height clamps.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS v3
- **Icons:** Lucide React
- **Search:** Fuse.js
- **Backend:** Node.js Serverless runtime (`/api` compatible with Vercel/Netlify)
- **Database:** Static JSON (`src/data/prompts.json`)
- **CI/CD:** GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18+ recommended) and `npm` installed.

### 1. Clone & Install

```bash
git clone https://github.com/your-username/PromptDB.git
cd PromptDB
npm install
```

### 2. Configure Environment Variables

Create a `.env` file at the root of your project:

```bash
# Provide a GitHub PAT (Personal Access Token) with `repo` scopes.
GITHUB_TOKEN=ghp_your_personal_access_token_here
# The path to this repository
GITHUB_REPO=your-github-username/PromptDB
```

> **Note:** `.env` is explicitly included in `.gitignore` to prevent secret leakage.

### 3. Run Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`. 

*(Note: To test the `/api/submitPrompt` function locally, you should use the Vercel CLI (`vercel dev`) as standard Vite does not proxy edge/serverless folder structures natively).*

---

## 📂 Project Structure

```text
PromptDB/
├── .github/workflows/
│   └── auto-approve-prompt.yml     # GitHub Action for automated PR creation
├── api/
│   └── submitPrompt.js             # Serverless function for GitHub API commit
├── src/
│   ├── components/
│   │   ├── PromptCard.jsx          # UI: Prompt display & clipboard copying
│   │   ├── SearchBar.jsx           # UI: User input handler
│   │   └── SubmissionForm.jsx      # UI: Client submission handling
│   ├── data/
│   │   └── prompts.json            # STATIC DB: Approved prompt collection
│   ├── utils/
│   │   └── search.js               # LOGIC: Fuse.js initialization
│   ├── App.jsx                     # Core application orchestrator
│   ├── index.css                   # Tailwind base & custom scrollbar overrides
│   └── main.jsx                    # React mounting entrypoint
├── .env                            # Secret environment keys (git-ignored)
├── tailwind.config.js              # Theme and styling configuration
└── package.json                    
```

---

## 🔮 Future Additions

While PromptDB is fully functional, here are planned iterations down the roadmap:

- [ ] **Tag Filtering Sidebar:** Clickable categorization pills to instantly load prompts by their tags rather than manually typing them.
- [ ] **Analytics Tracking:** Vercel Web Analytics integration to see which prompts are copied to the clipboard the most.
- [ ] **Dynamic Ranking:** Adjusting Fuse.js algorithmic weights conditionally so highly-viewed prompts automatically bubble to the top.
- [ ] **Theme Switching:** Adding a light-mode layout while preserving the strict 60-30-10 spacing hierarchy.
- [ ] **User Accounts:** Moving away from a fully static JSON system toward Supabase/Firebase if authenticated/private organizational prompts are needed.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To add a prompt directly without using the UI:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingPrompt`)
3. Add the JSON object to `src/data/prompts.json`
4. Commit your changes (`git commit -m 'Add some Amazing Prompt'`)
5. Push to the Branch (`git push origin feature/AmazingPrompt`)
6. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
