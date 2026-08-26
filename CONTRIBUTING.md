# 🤝 Contributing to Grafana & Friends Mumbai Website

Thank you for your interest in contributing to the **Grafana & Friends Mumbai Community Chapter**! Open-source contributions from developers, designers, and community members help make this platform vibrant and useful for everyone.

Please take a moment to review this guide before submitting issues or pull requests.

---

## 📜 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [How Can I Contribute?](#-how-can-i-contribute)
3. [Development Workflow](#-development-workflow)
   - [1. Fork & Clone](#1-fork--clone)
   - [2. Install Dependencies (Bun)](#2-install-dependencies-bun)
   - [3. Create a Feature Branch](#3-create-a-feature-branch)
   - [4. Local Development](#4-local-development)
   - [5. Validation Checks](#5-validation-checks)
   - [6. Commit with Sign-off](#6-commit-with-sign-off)
   - [7. Push & Create a Pull Request](#7-push--create-a-pull-request)
4. [Coding & Style Guidelines](#-coding--style-guidelines)
5. [Commit Message Conventions](#-commit-message-conventions)
6. [Getting Help](#-getting-help)

---

## 🌟 Code of Conduct

All contributors and community members are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful, inclusive, and collaborative in all interactions.

---

## 💡 How Can I Contribute?

You can contribute in many ways:
- 🐛 **Report Bugs**: If you find an issue, broken link, or rendering bug, [open an issue](https://github.com/grafanamumbai/website/issues).
- 💡 **Suggest Enhancements**: Propose UI improvements, animations, or features.
- 🎤 **Update Content**: Add upcoming meetup dates, speakers, session titles, or sponsor information.
- 📝 **Improve Documentation**: Help clarify guides and setup steps.
- 🎨 **Design & Polish**: Improve accessibility, responsive design, and mobile UX.

---

## 🚀 Development Workflow

### 1. Fork & Clone

1. Fork the repository to your own GitHub account by clicking **Fork** on [grafanamumbai/website](https://github.com/grafanamumbai/website).
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-github-username>/website.git
   cd website
   ```
3. Set the upstream remote:
   ```bash
   git remote add upstream https://github.com/grafanamumbai/website.git
   git fetch upstream
   ```

### 2. Install Dependencies (Bun)

> [!IMPORTANT]
> This project uses **[Bun](https://bun.sh/)** as its default package manager and runtime. Please do not use `npm` or `yarn` as it will generate conflicting lockfiles.

Install dependencies using Bun:
```bash
bun install
```

### 3. Create a Feature Branch

Always create a new branch from `upstream/main`:
```bash
git checkout main
git pull upstream main
git checkout -b feat/your-feature-name
# or for bug fixes:
git checkout -b fix/your-fix-name
```

### 4. Local Development

Start the development server:
```bash
bun run dev
```
Open [http://localhost:9002](http://localhost:9002) in your browser to see your changes live.

### 5. Validation Checks

Before submitting your changes, ensure there are no TypeScript or build errors:

```bash
# 1. Type check
bun run typecheck

# 2. Production build verification
bun run build
```

### 6. Commit with Sign-off

> [!TIP]
> All commits must include a sign-off (`-s`) to comply with the Developer Certificate of Origin (DCO) and pass branch protection checks.

```bash
git add .
git commit -s -m "feat: add speaker spotlight card component"
```

If you have GPG or SSH signing configured, sign cryptographically as well:
```bash
git commit -s -S -m "feat: add speaker spotlight card component"
```

### 7. Push & Create a Pull Request

1. Push your branch to your fork:
   ```bash
   git push -u origin feat/your-feature-name
   ```
2. Open a Pull Request:
   - Visit [https://github.com/grafanamumbai/website/pulls](https://github.com/grafanamumbai/website/pulls).
   - Click **"New Pull Request"** and select your branch.
   - Fill out the provided PR template describing what you changed and why.

---

## 🎨 Coding & Style Guidelines

- **TypeScript**: Ensure strict typing without using `any` wherever possible.
- **Tailwind CSS**: Use utility classes with consistent spacing and color tokens defined in `globals.css`.
- **Components**: Follow the [shadcn/ui](https://ui.shadcn.com/) component conventions under `src/components/ui/`.
- **Images & Assets**: Store static images in `public/` and use Next.js `<Image />` component with descriptive `alt` text.
- **Responsiveness**: Test layouts on both mobile (375px+) and desktop (1280px+) screen sizes.

---

## 📌 Commit Message Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat:` | A new feature or page | `feat: add agenda schedule timeline section` |
| `fix:` | A bug fix | `fix: correct registration modal button alignment` |
| `docs:` | Documentation changes | `docs: update setup instructions in README` |
| `style:` | Formatting or styling adjustments | `style: improve card shadow and hover transition` |
| `refactor:`| Code restructuring without feature change | `refactor: extract speaker data to separate config` |
| `chore:` | Maintenance tasks & dependency updates | `chore: update tailwind and radix dependencies` |

---

## 💬 Getting Help

Have questions or need assistance?
- Join the **[#grafana-mumbai](https://grafana.slack.com/archives/C01FMSQ6A8L)** channel on Grafana Slack.
- Reach out to community organizers at [grafanamumbai@gmail.com](mailto:grafanamumbai@gmail.com).

Thank you for helping build a stronger Observability Community in Mumbai! 🧡
