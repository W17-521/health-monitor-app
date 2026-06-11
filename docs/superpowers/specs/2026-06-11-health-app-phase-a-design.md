# Health Monitor App — Phase A Design Spec

**Date**: 2026-06-11
**Status**: Approved
**Scope**: Project scaffold + Bottom Tab navigation + Home Dashboard + Exercise Module + Profile Center

---

## Overview

A Keep-style health monitoring mobile-first responsive web app (PWA). Phase A delivers the application skeleton, design system, bottom tab navigation, home dashboard, exercise module, and profile center. Diet recording, community square, search, device connection, electronic pet, and women's health are deferred to future phases.

---

## Technology Stack

| Layer | Choice | Rationale |
|:---|------|------|
| Framework | React 18 + Vite | Fast, lightweight SPA |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v4 | Mobile-first responsive, utility-first |
| Routing | React Router v6 | Bottom Tab navigation + sub-routes |
| State | Zustand | Lightweight, no boilerplate |
| Charts | Recharts | Weight trend, ring progress |
| Icons | Phosphor Icons | Consistent style, customizable stroke |
| Animation | Framer Motion | Tab transitions, number animations |
| Mock Data | MSW (Mock Service Worker) | Intercepts requests, returns mock data at browser level |
| HTTP | fetch (native) | No extra deps; MSW intercepts at network level |

---

## Project Structure

```
src/
├── app/                  # App entry
│   ├── App.tsx           # Routes + global providers
│   └── main.tsx          # ReactDOM entry + MSW init
├── components/           # Shared components
│   ├── ui/               # Base UI: Button, Card, ProgressRing, Badge, Skeleton...
│   ├── layout/           # Layout: BottomNav, PageHeader, CategoryTabs, Shell...
│   └── shared/           # Shared business components
├── features/             # Feature modules
│   ├── dashboard/        # Home dashboard
│   │   ├── screens/
│   │   │   └── HomeScreen.tsx
│   │   ├── components/
│   │   │   ├── CalorieRing.tsx
│   │   │   ├── StatsRow.tsx
│   │   │   ├── WeightCard.tsx
│   │   │   ├── WomenHealthCard.tsx
│   │   │   ├── PetCard.tsx
│   │   │   ├── CourseRecommend.tsx
│   │   │   └── DietSummary.tsx
│   │   └── index.ts
│   ├── exercise/         # Exercise module
│   │   ├── screens/
│   │   │   ├── ExerciseScreen.tsx
│   │   │   └── ExerciseDetailScreen.tsx
│   │   ├── components/
│   │   │   ├── CategoryTabs.tsx
│   │   │   ├── CourseCard.tsx
│   │   │   └── WorkoutPlayer.tsx  # stub for now
│   │   └── index.ts
│   └── profile/          # Profile center
│       ├── screens/
│       │   ├── ProfileScreen.tsx
│       │   ├── SettingsScreen.tsx
│       │   └── BodyDataScreen.tsx
│       ├── components/
│       │   ├── ProfileHeader.tsx
│       │   ├── BodyDataCard.tsx
│       │   ├── AchievementGrid.tsx
│       │   └── SettingsList.tsx
│       └── index.ts
├── hooks/                # Shared hooks
│   ├── useHealthData.ts
│   ├── useExerciseData.ts
│   └── useUserData.ts
├── stores/               # Zustand stores
│   ├── userStore.ts
│   ├── healthStore.ts
│   └── exerciseStore.ts
├── mocks/                # MSW handlers + data
│   ├── browser.ts
│   ├── handlers/
│   │   ├── health.ts
│   │   ├── exercise.ts
│   │   └── user.ts
│   └── data/
│       ├── health.json
│       ├── courses.json
│       └── user.json
├── styles/
│   └── index.css         # Tailwind imports + global tokens
├── types/
│   └── index.ts          # Shared TypeScript types
└── utils/
    └── format.ts         # Unit formatting, date helpers
```

---

## Routes

```
/                       → redirect to /home
/home                   → HomeScreen (default tab)
/exercise               → ExerciseScreen (course list)
/exercise/:id           → ExerciseDetailScreen (course detail / workout)
/profile                → ProfileScreen
/profile/settings       → SettingsScreen
/profile/body-data      → BodyDataScreen
```

---

## Bottom Tab Bar (Keep-style)

```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│   首页   │   运动   │   饮食   │   广场   │   我的   │
│  (active)│          │ (gray)   │ (gray)   │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

- Diet (饮食) and Community (广场) tabs show as "Coming Soon" toasts on tap in Phase A.

---

## Screen Designs

### 1. HomeScreen (Dashboard)

Vertical scroll layout, card stacking pattern:

```
Header: [Notification Bell]   "Health Monitor"   [Messages Icon]
──────────────────────────────────────────────────────

┌─ Today's Overview ──────────────────────────────────┐
│                                                      │
│        ● Ring Progress: 850/1200 kcal · 70%        │
│                                                      │
│  ┌─────────┬─────────┬──────────┐                   │
│  │  Steps  │ Duration│ Intensity│                   │
│  │  6,842  │  45min  │  Medium ▲│                   │
│  └─────────┴─────────┴──────────┘                   │
└──────────────────────────────────────────────────────┘

┌── Weight ──────┐ ┌── Women's Health ────────────┐
│  65.3kg ▼      │ │  Period Day 3               │
│  [Mini chart]  │ │  Ovulation in 12 days        │
└────────────────┘ └──────────────────────────────┘

┌── Electronic Pet ────────────────────────────────────┐
│  🐶 Corgi  😊 Happy  Hunger ██████░░ 80%           │
│  "Walked enough today? Feed me →"                   │
└──────────────────────────────────────────────────────┘

┌── Today's Courses ───────────────────────────────────┐
│  ┌──────────┐ ┌──────────┐  ← horizontal scroll     │
│  │ Morning   │ │ Fat Burn │                          │
│  │ Wake-up   │ │ 20min    │                          │
│  │ 10min     │ │ 200kcal  │                          │
│  │ 85kcal    │ │ ★4.9     │                          │
│  └──────────┘ └──────────┘                          │
└──────────────────────────────────────────────────────┘

┌── Diet Summary ──────────────────────────────────────┐
│  Today: 980 kcal consumed                            │
│  Carbs 40% · Protein 25% · Fat 35%                   │
│  [Mini bar chart]                                    │
└──────────────────────────────────────────────────────┘
```

### 2. ExerciseScreen (Course List)

```
Header: "< Back"   "Follow-along"     "🔍 Search"
──────────────────────────────────────────────────────

Category: [All] [Fat Burn] [Yoga] [Gymnastics] [Strength]
──────────────────────────────────────────────────────

┌─ Course Card ────────────────────────────────────────┐
│ [Cover Image]   Full Body Stretch                    │
│                 12min · Beginner · 60kcal            │
│                 ★4.8  23k completed                  │
├──────────────────────────────────────────────────────┤
│ [Cover Image]   Active Aerobic Gymnastics            │
│                 20min · Intermediate · 150kcal       │
│                 ★4.9  18k completed                  │
├──────────────────────────────────────────────────────┤
│ [Cover Image]   Mat Pilates                          │
│                 25min · Intermediate · 120kcal       │
│                 ★4.7  9.6k completed                 │
└──────────────────────────────────────────────────────┘

┌── Custom Plan ────────────────────────────────────────┐
│  "Generate a gymnastics combo based on your fitness"  │
│  [Generate Plan]                                      │
└──────────────────────────────────────────────────────┘
```

### 3. ProfileScreen (My Profile)

```
──────────────────────────────────────────────────────
         [Avatar]
         Nickname    Lv.5
         128 days of exercise
──────────────────────────────────────────────────────

┌── Body Data ─────────────────────────────────────────┐
│  Height 165cm · Weight 65.3kg · Target 55kg          │
│  [View details →]                                    │
└──────────────────────────────────────────────────────┘

┌── Achievements ──────────────────────────────────────┐
│  🏅 7-day streak   🔥 100 days   💪 First 10k steps  │
└──────────────────────────────────────────────────────┘

┌── Settings ──────────────────────────────────────────┐
│  Target Settings  >                                  │
│  Privacy          >                                  │
│  Reminders        >                                  │
│  Connect Device   >                                  │
│  About            >                                  │
└──────────────────────────────────────────────────────┘
```

---

## Data Flow

```
                    ┌──────────────┐
                    │   Zustand    │
                    │   Stores     │
                    │              │
                    │ userStore    │ ← user info, body data
                    │ healthStore  │ ← daily burn, steps, weight
                    │ exerciseStore│ ← course list, records
                    └───┬──────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   HomeScreen     ExerciseScreen   ProfileScreen
        │               │               │
        └───────────────┼───────────────┘
                        │
              ┌─────────▼─────────┐
              │  MSW Handlers     │
              │  /api/health/*    │
              │  /api/exercise/*  │
              │  /api/user/*      │
              └───────────────────┘
```

MSW intercepts all API requests at the browser level and returns mock data. When real APIs are ready, replace MSW handlers with real endpoints — no frontend code changes needed.

---

## Design Tokens (Keep-inspired)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#6BCF7A` (Keep Green) | Primary buttons, active tabs, ring progress |
| `--color-primary-dark` | `#4CAF50` | Pressed states |
| `--color-bg` | `#F5F5F5` | Page background |
| `--color-surface` | `#FFFFFF` | Card backgrounds |
| `--color-text-primary` | `#1A1A1A` | Headlines |
| `--color-text-secondary` | `#8E8E93` | Secondary text, labels |
| `--color-accent-orange` | `#FF9500` | Calorie/burn highlights |
| `--color-accent-blue` | `#007AFF` | Steps/distance |
| `--color-accent-pink` | `#FF7EB3` | Women's health |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Display | System sans (SF Pro / Roboto) | Bold 700 |
| Headline | System sans | Semibold 600 |
| Body | System sans | Regular 400 |
| Caption | System sans | Regular 400, smaller |
| Data/Metrics | System sans + tabular-nums | Bold/Mono |

- Use system font stack for zero-load-time and native feel:
  `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Border Radius

- Cards: `16px`
- Buttons: `12px` (full-pill for primary CTAs: `9999px`)
- Inputs: `12px`
- Progress bars: `8px`

### Spacing Scale

- Page padding: `16px` (mobile), adaptive for tablet
- Card padding: `16px`
- Section gap: `16px`
- Card gap: `12px`

---

## Key Components (Phase A)

### UI Components

| Component | Props | Description |
|-----------|-------|-------------|
| `ProgressRing` | `percent`, `size`, `strokeWidth`, `color` | SVG ring progress (calories) |
| `StatBadge` | `icon`, `value`, `label` | Single stat display |
| `MetricCard` | `title`, `children`, `onClick?` | Tappable info card |
| `CourseCard` | `course: Course`, `onPress` | Horizontal course card |
| `BottomNav` | — | 5-tab bottom navigation bar |
| `PageHeader` | `title`, `leftAction?`, `rightAction?` | Sticky top header |
| `CategoryPills` | `items`, `active`, `onChange` | Horizontal scrollable pills |
| `Skeleton` | `width`, `height`, `rounded?` | Loading placeholder |

### Feature Components

| Component | Screen | Description |
|-----------|--------|-------------|
| `CalorieRing` | Home | Ring + center text showing kcal progress |
| `StatsRow` | Home | 3 metrics row (steps, duration, intensity) |
| `WeightCard` | Home | Current weight + mini trend chart |
| `WomenHealthCard` | Home | Period/ovulation status |
| `PetCard` | Home | Pet status quick view |
| `CourseRecommend` | Home | Horizontal scroll course cards |
| `DietSummary` | Home | Macro pie/bar chart |
| `CourseCard` | Exercise | Course list item |
| `CategoryTabs` | Exercise | Category filter tabs |
| `ProfileHeader` | Profile | Avatar + name + level |
| `BodyDataCard` | Profile | Height/weight/target stats |
| `AchievementGrid` | Profile | Badge/achievement grid |
| `SettingsList` | Profile | Settings menu items |

---

## Out of Scope (Phase A)

- Diet recording (food search, meal logging, calorie budget)
- Community square (feed, posts, comments, follows)
- Global search (courses, food, users, topics)
- Device connection (Bluetooth watch/scale sync)
- Electronic pet (full interaction, feeding, shop)
- Women's health (calendar, symptom tracking, reminders)
- Full workout player (video/audio guidance, real-time timer)
- Backend / real API

---

## Testing Strategy

- Component tests via React Testing Library for critical UI components
- Store tests for Zustand state logic
- Visual testing via screenshot comparison in CI (future)
- Responsive testing at: 375px (iPhone SE), 390px (iPhone 14), 414px (iPhone 14 Pro Max), 768px+ (tablet)

---

## Build & Deployment

- `npm run dev` — Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally
- Future: deploy to Vercel / Netlify for portfolio sharing
