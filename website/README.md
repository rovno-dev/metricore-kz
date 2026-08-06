cat > README.md <<'EOF'
# Unidoka UI E-commerce app template

A modern, AI-optimized e-commerce application template built with [Next.js](https://nextjs.org/), [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and the [Unidoka UI](https://www.figma.com/community/file/1622312904371459207) design system.

This template is designed to be a **production-ready foundation** for your next e-commerce project. It comes with a complete UI component library, theming, layout primitives, and a structured codebase that follows best practices for performance, accessibility, and developer experience.

## AI-Optimized Development

This repository is **specifically crafted for AI-assisted development**. It includes:

- A global `CODING_FOR_AI.md` file that provides strict guidelines for AI agents (like Cursor, Copilot, or custom LLMs) to ensure **surgical, efficient, and context-aware** code changes.
- Clear separation of concerns, reusable components, and a consistent styling system - making it easy for AI to understand and extend.
- Minimal boilerplate, maximal reuse: the codebase follows the **Ladder of Laziness** - only write what's necessary, use existing solutions first.

Whether you're using an AI pair programmer or building with a team, this template helps you move fast without sacrificing quality.

## Features

- ** Next.js 16 (Turbopack)** - Blazing fast development and production builds.
- ** Unidoka UI Design System** - A Figma‑first component library with a cohesive, modern aesthetic.
- ** shadcn/ui Components** - Accessible, customizable, and beautifully styled primitives.
- ** Mobile-First Responsive** - Works seamlessly on all screen sizes.
- ** Data Visualization** - Recharts integration for charts and dashboards.
- ** Developer Experience** - TypeScript, ESLint, and a clean folder structure.
- ** Deployment Ready** - Dockerfile and standalone output for easy hosting.

## Tech Stack

| Category      | Tools                                                                  |
| ------------- | ---------------------------------------------------------------------- |
| Framework     | [Next.js 16](https://nextjs.org/) (Turbopack)                          |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables            |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)              |
| Design System | [Unidoka UI](https://www.figma.com/community/file/1622312904371459207) |
| Icons         | Unidoka Icons (Material Symbols based)                                 |
| Fonts         | Noto Sans & Oswald                                                     |
| Charts        | [Recharts](https://recharts.org/)                                      |
| Date Handling | [date-fns](https://date-fns.org/)                                      |
| Forms         | [Base UI](https://base-ui.com/) Combobox, Input OTP, etc.              |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/niyazgim/unidoka-ui-ui-template
cd unidoka-ui-ui-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000 to see the app.

### Project Structure
```text
app/
  (HomePage)/          # Homepage components and layout
  (Subdomains)/        # Subdomain routing (e.g., fake-api)
  globals.css          # Global styles and theme variables
  layout.tsx           # Root layout with theme provider
components/
  icons/               # SVG icon components
  layout/              # Layout components (header, footer, etc.)
  ui/                  # shadcn/unidoka-ui UI components
hooks/                 # Custom React hooks
lib/                   # Utility functions
providers/             # Context providers (theme, etc.)
public/                # Static assets
utils/                 # Constants, types, and interfaces
```

### Customization

* Theme Colors: Edit CSS variables in app/globals.css and app/unidoka-ui-base.css.

* Typography: Adjust font sizes, weights, and families via CSS custom properties.

* Components: All UI components are located in components/ui/ and are fully customizable using Tailwind classes or by modifying the source.

* Layout: The header, footer, and page structure are in components/layout/.

Built with ❤️ by Niyaz Gimadiev