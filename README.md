# Interview Tracker

A web app for tracking your job interviews and preparing for future ones. Keep every application organized, log interview stages, and stay on top of your job search.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- A [Supabase](https://supabase.com/) project (free tier works)

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd interview-tracker
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase project URL and anon key
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server at localhost:3000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting without writing |

## CI

GitHub Actions runs lint and type-check on every push to `main` and on all pull requests. See `.github/workflows/ci.yml`.

## Project Structure

```
src/
  app/          # Next.js App Router pages and layouts
  lib/
    supabase/   # Supabase client helpers (browser + server)
```
