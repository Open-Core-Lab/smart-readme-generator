# 🤝 Contributing to Smart README Generator

First of all, thank you for considering contributing to the **Smart README Generator**! 🎉  
We welcome contributions from developers of all skill levels to help make README creation easier for everyone.

---

## 📌 Getting Started

### 1. Fork the Repository

Click the **Fork** button on the top right of this repository to create a copy under your own GitHub account.

### 2. Clone Your Fork

```bash
git clone [https://github.com/](https://github.com/)<your-username>/smart-readme-generator.git
cd smart-readme-generator
```

### 3. Setup the Project

#### **Backend Setup (Node.js/Express)**

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   *Open `.env` and add your **GitHub API Token** and **OpenAI API Key**.*
4. Start the development server:

   ```bash
   npm run dev
   ```

#### **Frontend Setup (Next.js/React)**

1. Open a new terminal and navigate to the frontend:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   *The app should now be running at `http://localhost:3000`.*

---

## 🌿 Branching Strategy

To keep the main codebase stable, please create a new branch for every feature or fix:

```bash
git checkout -b feature/your-feature-name
```

### **Branch Naming Convention**

* **`feature/...`** → New features (e.g., `feature/dark-mode-toggle`)
* **`fix/...`** → Bug fixes (e.g., `fix/api-rate-limit`)
* **`docs/...`** → Documentation updates
* **`refactor/...`** → Code improvements or folder restructuring

---

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) to keep our project history clean.

**Examples:**

* `feat: add OpenAI GPT-4 integration for bio generation`
* `fix: resolve responsive issues on mobile editor`
* `docs: update setup instructions in contributing guide`
* `refactor: optimize Redux state for template selection`

---

## 🚀 Pull Request Process

1. **Push your branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request (PR):** Go to the original repository and click "Compare & pull request."
3. **Pre-submission Checklist:**
   * [ ] Code builds successfully in both `frontend/` and `backend/`.
   * [ ] No linting errors (`npm run lint`).
   * [ ] Your changes are clearly described in the PR description.
4. **Review:** Maintainers will review your code. Please stay active for feedback!

---

## 🧹 Code Style & Quality

* **UI/UX:** We use **Tailwind CSS** for styling. Ensure your components are responsive and support both Dark and Light themes.
* **State Management:** Use **Redux Toolkit** (slices) for global state like themes or editor content.
* **Code Quality:** Ensure code is formatted using **Prettier** and passes **ESLint** checks.
* **Accessibility:** Since we focus on professional READMEs, ensure the UI is accessible (WCAG compliant where possible).

---

## 💡 Contribution Ideas

Looking for ways to help? Check out these areas:

* **Templates:** Add new `.md` templates to `frontend/templates/`.
* **AI Logic:** Improve the prompt engineering in `backend/services/aiService.ts`.
* **Features:** Add an "Undo/Redo" functionality to the live editor.
* **Testing:** Write unit tests for the GitHub API integration.

---

## 📢 Code of Conduct

Please be respectful and inclusive. We aim to maintain a welcoming environment for all contributors.

## 🙌 Thank You

Your efforts help developers build better profiles. Let's build something great! 🚀
