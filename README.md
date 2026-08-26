# ⚡ Grafana & Friends — Mumbai Chapter

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-1.4+-fbf0df?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-orange.svg?style=for-the-badge)](LICENSE)

**The official open-source website for the Grafana & Friends Mumbai Community Chapter.**

[🌐 Live Website](https://www.grafanafriendsmumbai.in/) • [📅 Meetup Group](https://www.meetup.com/grafana-and-friends-mumbai/) • [💬 Slack Channel](https://grafana.slack.com/archives/C01FMSQ6A8L) • [🎤 Call for Speakers (CFP)](https://grafana.qualtrics.com/jfe/form/SV_4OQ9dzUAbSHfrAG)

</div>

---

## 📖 About Grafana & Friends Mumbai

**Grafana & Friends Mumbai** is a community-driven local chapter powered by **Grafana Labs** for developers, DevOps practitioners, SREs, and observability enthusiasts in and around Mumbai.

We gather regularly to:
- 🚀 Explore the latest advancements in observability, metrics, logs, traces, and profiling.
- 🛠️ Share practical knowledge on Grafana, Prometheus, Loki, Tempo, Mimir, Pyroscope, OpenTelemetry, and k6.
- 🤝 Network with industry leaders, open-source contributors, and fellow community members.
- 💡 Showcase innovative real-world use cases, dashboards, and custom monitoring stacks.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI Primitives](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **[Bun](https://bun.sh/)** installed on your system (v1.2 or higher recommended):

```bash
curl -fsSL https://bun.sh/install | bash
```

Verify the installation:
```bash
bun --version
```

### Installation

1. **Fork and Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/website.git
   cd website
   ```

2. **Install Dependencies**:
   ```bash
   bun install
   ```

3. **Start the Local Development Server**:
   ```bash
   bun run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:9002](http://localhost:9002) in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the Next.js development server on port `9002` |
| `bun run dev:turbo` | Starts the development server with Turbopack |
| `bun run build` | Builds the production-ready optimized static bundle |
| `bun run start` | Starts the production server locally |
| `bun run typecheck` | Runs TypeScript type checking (`tsc --noEmit`) |
| `bun run lint` | Runs Next.js ESLint checks |

---

## 📂 Project Structure

```
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── app/                # Next.js App Router routes & pages
│   │   ├── badge/          # Attendee badge generator page
│   │   ├── join/           # Community onboarding page
│   │   ├── register/       # Event registration landing page
│   │   ├── layout.tsx      # Root application layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles & Tailwind layers
│   ├── components/
│   │   ├── layout/         # Header, Footer, and navigation components
│   │   ├── sections/       # Hero, About, Speakers, Schedule, Sponsors, FAQ
│   │   ├── ui/             # Reusable UI primitives (buttons, dialogs, etc.)
│   │   └── icons/          # Custom SVG logos & icon components
│   └── lib/                # Utilities, helpers, and image metadata
├── .idx/                   # Project IDX / Cloud workspace configuration
├── bun.lock                # Bun lockfile
└── package.json            # Project dependencies and scripts
```

---

## 🤝 Contributing

We warmly welcome contributions from the community! Whether you want to fix a typo, improve documentation, add speaker information, or propose new features, check out our [Contributing Guidelines](CONTRIBUTING.md) to get started.

Please also review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure an inclusive and welcoming environment for everyone.

---

## 🌐 Community Links

- 🌐 **Official Website**: [https://www.grafanafriendsmumbai.in/](https://www.grafanafriendsmumbai.in/)
- 📅 **Meetup**: [meetup.com/grafana-and-friends-mumbai](https://www.meetup.com/grafana-and-friends-mumbai/)
- 💼 **LinkedIn**: [Grafana User Group Mumbai](https://www.linkedin.com/in/grafana-user-group-mumbai-50149b386/)
- 🐦 **X / Twitter**: [@grafanamumbai](https://twitter.com/grafanamumbai)
- 📸 **Instagram**: [@grafanamumbai](https://www.instagram.com/grafanamumbai)
- 💬 **Slack**: [#grafana-mumbai on Grafana Slack](https://grafana.slack.com/archives/C01FMSQ6A8L)
- 📧 **Email**: [grafanamumbai@gmail.com](mailto:grafanamumbai@gmail.com)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
