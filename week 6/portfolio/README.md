# 🚀 Personal Portfolio Dashboard

A fully responsive React SPA built as a professional assessment project.

## ✅ Features Implemented

### Pages (React Router v6)
- **Home** — Hero with parallax, animated stats, featured projects, Download Resume CTA
- **About** — Bio, filterable skill bars, experience timeline, education cards
- **Projects** — 6 projects with category filters, dynamic rendering, modal detail view
- **Contact** — Controlled form with full validation, animated success state
- **Dashboard** — Animated stat cards with count-up, bar chart, tabs, theme toggle

### Core React Concepts
- ✅ Reusable components with props (Navbar, Footer, Field, StatCard…)
- ✅ Hooks: `useState`, `useEffect`, `useContext`, `useRef`
- ✅ Conditional rendering throughout
- ✅ `.map()` for lists (projects, skills, activity, nav links…)
- ✅ Event handling (form, search, burger menu, theme toggle…)
- ✅ Controlled forms with validation (Contact page)

### Advanced Features
- ✅ **React Suspense + Lazy Loading** — All pages lazy loaded, loading spinner
- ✅ **React Portals** — Search modal & project detail modal rendered at document root
- ✅ **Higher Order Components (HOC)** — `withAnimation` HOC for scroll-triggered reveal
- ✅ **CSS Animations** — fadeUp, floatingCard, countUp, bar grow, pulse, shimmer

### Additional Features (All implemented!)
- ✅ **Search functionality** — Global search modal (Cmd+K feel) with keyboard navigation
- ✅ **Animations** — Throughout: page reveals, hover effects, chart bars, count-up numbers
- ✅ **Download Resume button** — On Home (hero) and About pages, downloads as .txt file
- ✅ **Dark/Light theme** — Toggle in Navbar and Dashboard, persisted to localStorage

### Styling
- ✅ CSS Modules for all components
- ✅ CSS custom properties (variables) for full theming
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Distinctive typography: Bebas Neue display + DM Sans body + DM Mono code
- ✅ Smooth dark ↔ light transitions

---

## 🛠️ Setup & Run

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm start
```

The app will open at **http://localhost:3000**

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css       # Sticky nav with mobile menu
│   ├── Footer.jsx / .module.css       # Site footer
│   ├── SearchModal.jsx / .module.css  # Global search (React Portal)
│   ├── ProjectModal.jsx / .module.css # Project detail (React Portal)
│   └── withAnimation.jsx              # HOC for scroll animations
├── context/
│   ├── ThemeContext.jsx                # Dark/light theme provider
│   └── SearchContext.jsx              # Search state provider
├── pages/
│   ├── Home.jsx / .module.css         # Landing page
│   ├── About.jsx / .module.css        # About + skills + timeline
│   ├── Projects.jsx / .module.css     # Filtered project grid
│   ├── Contact.jsx / .module.css      # Contact form
│   └── Dashboard.jsx / .module.css   # Stats dashboard
├── styles/
│   └── global.css                     # CSS variables, reset, utilities
├── App.jsx                            # Router + layout
└── index.js                          # Entry point
```
