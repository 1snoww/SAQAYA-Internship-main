# SAQAYA Shop 🛒

_A modern Vue 3 e-commerce demo showcasing the Composition API, Pinia, and token-based theming._

---

## Table of Contents

1. [Project Snapshot](#project-snapshot)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture Diagram](#architecture-diagram)
5. [Folder Structure](#folder-structure)
6. [Getting Started](#getting-started)
7. [Available Scripts](#available-scripts)
8. [Design Decisions](#design-decisions)
9. [Contributing](#contributing)
10. [Troubleshooting / FAQ](#troubleshooting--faq)
11. [Roadmap](#roadmap)
12. [License](#license)

---

## Project Snapshot

SAQAYA Shop is a deliberately lightweight storefront that illustrates **Vue 3 Composition API** patterns paired with **Pinia** for state, **Vue Router 4** for navigation, and a **CSS-variable theme** that flips between light and dark with a single class on `<html>`.  
Users can browse, filter, dive into details with suggested items, add products to a cart (sidebar or full page), and walk through a mock checkout. Each UX step maps to a clear layer—routing in pages, mutations in stores, cross-cutting logic in composables, and stateless UI widgets.

---

## Features

- Category filter, live search, price sorting
- Paginated grid (8 items / page)
- Product details + same-category suggestions
- Slide-out cart sidebar **and** full cart page with quantity controls
- One-click dark / light theme toggle
- Toast notifications via `useNotification` composable
- Responsive CSS Grid layout

---

## Tech Stack

| Layer         | Choice                      | Why                                                            |
| ------------- | --------------------------- | -------------------------------------------------------------- |
| Framework     | **Vue 3 — Composition API** | Reactive primitives + `<script setup>` keep components concise |
| State         | **Pinia**                   | Less boilerplate than Vuex, great TS inference                 |
| Router        | **Vue Router 4**            | Dynamic params & guards with minimal config                    |
| Build         | **Vite** + **TypeScript**   | HMR in ms, `vue-tsc` type-checking                             |
| Tests         | **Vitest** + Vue Test Utils | Component tests run in ≈ 3 s                                   |
| Styling       | Native CSS variables        | Token-driven theme, zero flash                                 |
| Notifications | **vue3-toastify** (wrapped) | Decoupled via composable                                       |

---

## Architecture Diagram

```mermaid
graph TD
  A[Route] --> B[Page]
  B --> C[Components]
  C --> D[Pinia Stores]
  D --> E[Static Seed -> (future) REST API]

Folder Structure

src/
│  main.ts            # Bootstrap Pinia, Router, Toast
│  style.css          # Design tokens + dark override
├─ components/        # Header, ProductCard, CartSidebar…
├─ pages/             # ProductsPage, ProductDetails, CartPage…
├─ stores/            # cart, product, filter, pagination
├─ composables/       # useNotification (+ future useDarkMode)
├─ router/            # index.ts
└─ data/              # productsData.ts (static seed)
```

Getting Started

# clone & enter

git clone https://github.com/your-org/saqaya-shop.git
cd saqaya-shop

# install

pnpm install # or npm install / yarn

# dev server

pnpm dev # http://localhost:5173

Available Scripts

| Action     | Command          | Result                               |
| ---------- | ---------------- | ------------------------------------ |
| Dev server | `pnpm dev`       | Hot-reload on **localhost:5173**     |
| Unit tests | `pnpm test:unit` | Vitest watch mode                    |
| Build      | `pnpm build`     | Optimised `/dist`                    |
| Preview    | `pnpm preview`   | Serves `/dist` on **localhost:4173** |
| Lint       | `pnpm lint`      | ESLint (optional)                    |

Design Decisions
Composition API + Pinia chosen over Options API + Vuex for smaller bundles and clearer types.

CSS variables instead of a utility framework keep styles minimal and theming transparent.

vue3-toastify wrapped by a composable so swapping libraries later touches one file, not every component.

Contributing
Fork → branch feat/short-desc → PR to main.

Commit style: feat(scope): clear title.

Ensure pnpm test:unit is green before pushing.

pnpm lint --fix to satisfy ESLint.

Document new dependencies in docs/DECISIONS.md.

Troubleshooting / FAQ
Issue Fix
TypeScript “Set can only be iterated …” Set "target":"ES2015" in tsconfig or wrap in Array.from(new Set()).
Vitest warns about <router-link> Stub during mount: global: { stubs: { RouterLink: true } }.
Theme flashes on load Ensure <html> gets dark class before first paint (handled in Header).
