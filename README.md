# Smart README Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 What is Smart README Generator?

**Smart README Generator** is an AI-powered tool to help developers create **professional, interactive, and visually appealing README.md files** for their GitHub repositories.  
It fetches GitHub user data and project repositories, then uses AI to suggest content for sections like **Bio, Skills, Projects, and Badges**, allowing users to generate a complete README with **minimal effort**.  

This project is **open-source**, supports **dynamic templates**, **dark/light themes**, and allows **real-time preview and AI suggestions**.  

The goal is to make contributing to GitHub easier, saving developers time while ensuring READMEs are **consistent, attractive, and informative**.  

---

## ⚡ Features

- Fetch GitHub profile and repositories automatically  
- Generate full README using AI (OpenAI GPT integration)  
- AI-assisted suggestions per section (Bio, Skills, Projects)  
- Multiple pre-defined and customizable templates  
- Live Markdown preview  
- Copy to clipboard and download as `.md`  
- Dark/Light theme support with auto-detection and toggle  
- Undo/Redo editing functionality  
- Loading and error states for smooth UX  
- Rate-limit handling for GitHub and AI APIs  
- Mobile-friendly, responsive UI  

---

## 🏗️ Tech Stack

**Frontend:**  
- Next.js (CSR-focused for dynamic interaction)  
- React.js  
- Tailwind CSS  
- react-markdown for live preview  

**Backend:**  
- Node.js / Express (MVP server for README generation)  
- GitHub API integration  
- AI integration (OpenAI GPT or similar)  
- Caching for API responses  

**DevOps & Quality:**  
- GitHub Actions (CI/CD)  
- Husky & lint-staged (pre-commit hooks)  
- ESLint & Prettier (code quality & formatting)  

---

### Folder Structure

The following folder structure is an **example** of how the Smart README Generator project can be organized.  
It separates the **frontend**, **backend**, **templates**, and **documentation** to make the project easy to navigate, maintain, and contribute to.  

- **backend/** – Contains the Node.js/Express server, API routes, services, and backend tests.  
- **frontend/** – Contains the Next.js frontend with Redux state management, reusable components, templates, and styles.  
- **templates/** – Stores Markdown README templates that users can select when generating a README.  
- **docs/** – Project documentation and additional guides.  
- **scripts/** – Utility scripts for build, deployment, or other automation tasks.  

> ⚠️ Note: This folder structure is an **example**. You can adjust it depending on your needs and scale of the project.

```plaintext
smart-readme-generator/
├─ backend/                    # Node.js/Express backend
│  ├─ src/
│  │  ├─ api/                  # Routes / controllers
│  │  │  ├─ github.ts
│  │  │  ├─ ai.ts
│  │  ├─ services/             # Business logic / integrations
│  │  │  ├─ githubService.ts
│  │  │  ├─ aiService.ts
│  │  ├─ utils/                # Helpers, logger, validators
│  │  │  ├─ logger.ts
│  │  │  ├─ validator.ts
│  │  ├─ config/               # Environment & config
│  │  │  ├─ env.ts
│  │  ├─ app.ts                # Express app setup
│  │  └─ server.ts             # Start server
│  ├─ tests/                   # Backend unit/integration tests
│  ├─ .env.example
│  └─ package.json
│
├─ frontend/                   # Next.js frontend (CSR)
│  ├─ app/
│  │  ├─ components/           # Reusable UI components
│  │  │  ├─ Button.tsx
│  │  │  ├─ Editor.tsx
│  │  │  ├─ TemplateCard.tsx
│  │  ├─ pages/                # Next.js pages
│  │  │  ├─ index.tsx
│  │  │  ├─ _app.tsx
│  │  ├─ hooks/                # Custom React hooks
│  │  │  ├─ useAI.ts
│  │  │  ├─ useGitHub.ts
│  │  ├─ services/             # API clients
│  │  │  ├─ githubClient.ts
│  │  │  ├─ aiClient.ts
│  │  ├─ store/                # Redux store & slices
│  │  │  ├─ index.ts           # Configure store
│  │  │  ├─ themeSlice.ts
│  │  │  ├─ editorSlice.ts
│  │  │  ├─ templateSlice.ts
│  │  ├─ styles/               # Global CSS
│  │  │  └─ globals.css
│  │  ├─ types/                # TypeScript types
│  │  └─ utils/                # Helpers
│  ├─ public/                  # Static assets (icons, images)
│  ├─ templates/               # README templates
│  │  ├─ template1.md
│  │  ├─ template2.md
│  │  └─ ...
│  ├─ tests/                   # Frontend unit/integration tests
│  ├─ package.json
│  └─ tailwind.config.js       # Tailwind config
├─ docs/                       # Project documentation
├─ scripts/                    # Build/deployment/util scripts
├─ .gitignore
├─ LICENSE
└─ README.md
```

---

## 🔧 Installation & Setup

### Frontend

```bash
git clone https://github.com/Open-Core-Lab/smart-readme-generator.git
cd smart-readme-generator/frontend
npm install
npm run dev
```

### Backend

```bash
cd smart-readme-generator/backend
npm install
cp .env.example .env
# Add GitHub API token and OpenAI API key
npm run dev
```

---

## 🌱 Contributors

<a href="https://github.com/Open-Core-Lab/smart-readme-generator/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Open-Core-Lab/smart-readme-generator" />
</a>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. © [Madhusha Prasad](https://github.com/MadhushaPrasad)
