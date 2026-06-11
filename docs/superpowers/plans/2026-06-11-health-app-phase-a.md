# Health Monitor App Phase A — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Phase A skeleton of a Keep-style health monitoring mobile-first web app: project scaffold, design tokens, bottom tab navigation, home dashboard, exercise course list, and profile center — all with mock data via MSW.

**Architecture:** React 18 SPA with Vite, TypeScript, Tailwind CSS v4, React Router v6 (bottom tabs), Zustand stores, MSW for API mocking. Feature-based folder structure under `src/features/`. Shared UI components in `src/components/ui/`. Mock data lives alongside handlers in `src/mocks/`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, React Router v6, Zustand, Recharts, Phosphor Icons, Framer Motion, MSW 2.x

---

## File Structure Map

```
健康监测app/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.ts                  # or postcss config for v4
├── public/
│   └── mockServiceWorker.js            # MSW service worker (auto-generated)
└── src/
    ├── app/
    │   ├── App.tsx                     # Router + BottomNav + providers
    │   └── main.tsx                    # Entry: ReactDOM + MSW init
    ├── components/
    │   ├── ui/
    │   │   ├── ProgressRing.tsx        # SVG ring (calorie progress)
    │   │   ├── StatBadge.tsx           # icon + value + label
    │   │   ├── MetricCard.tsx          # tappable info card
    │   │   ├── Skeleton.tsx            # loading placeholder
    │   │   ├── Badge.tsx               # small label/tag
    │   │   └── index.ts
    │   ├── layout/
    │   │   ├── BottomNav.tsx           # 5-tab bottom bar
    │   │   ├── PageHeader.tsx          # sticky top bar
    │   │   ├── CategoryPills.tsx       # horizontal scroll pills
    │   │   ├── AppShell.tsx            # layout wrapper
    │   │   └── index.ts
    │   └── shared/
    │       └── EmptyTab.tsx            # "Coming Soon" placeholder for disabled tabs
    ├── features/
    │   ├── dashboard/
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
    │   ├── exercise/
    │   │   ├── screens/
    │   │   │   ├── ExerciseScreen.tsx
    │   │   │   └── ExerciseDetailScreen.tsx
    │   │   ├── components/
    │   │   │   ├── CourseCard.tsx
    │   │   │   └── CustomPlanCard.tsx
    │   │   └── index.ts
    │   └── profile/
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
    ├── hooks/
    │   ├── useHealthData.ts
    │   ├── useExerciseData.ts
    │   └── useUserData.ts
    ├── stores/
    │   ├── userStore.ts
    │   ├── healthStore.ts
    │   └── exerciseStore.ts
    ├── mocks/
    │   ├── browser.ts                  # MSW browser setup
    │   ├── handlers/
    │   │   ├── index.ts
    │   │   ├── health.ts
    │   │   ├── exercise.ts
    │   │   └── user.ts
    │   └── data/
    │       ├── health.ts
    │       ├── courses.ts
    │       └── user.ts
    ├── styles/
    │   └── index.css                   # Tailwind v4 import + design tokens
    ├── types/
    │   └── index.ts                    # All TypeScript types
    └── utils/
        └── format.ts                   # Number/date formatting helpers
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "health-monitor-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "recharts": "^2.12.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@phosphor-icons/react": "^2.1.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "autoprefixer": "^10.4.0",
    "msw": "^2.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  },
  "msw": {
    "workerDirectory": ["public"]
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
cd "c:/Users/wyq18/Desktop/健康监测app"
npm install
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
    <meta name="theme-color" content="#6BCF7A" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="manifest" href="/manifest.json" />
    <title>健康监测</title>
  </head>
  <body class="bg-gray-50 text-gray-900 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/app/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
});
```

- [ ] **Step 5: Create tsconfig.json**

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

- [ ] **Step 6: Create tsconfig.app.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 7: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 8: Create tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6BCF7A',
          dark: '#4CAF50',
        },
        surface: '#FFFFFF',
        accent: {
          orange: '#FF9500',
          blue: '#007AFF',
          pink: '#FF7EB3',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 9: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 10: Generate MSW service worker**

```bash
npx msw init public/ --save
```

Expected: Creates `public/mockServiceWorker.js`

- [ ] **Step 11: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server running at http://localhost:3000, blank page (no React yet).

- [ ] **Step 12: Commit**

```bash
git add -A && git commit -m "feat: scaffold project with Vite + React + TypeScript + Tailwind + MSW"
```

---

### Task 2: Design Tokens & Global Styles

**Files:**
- Create: `src/styles/index.css`

- [ ] **Step 1: Create global CSS with Tailwind v4 directives**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #6BCF7A;
    --color-primary-dark: #4CAF50;
    --color-bg: #F5F5F5;
    --color-surface: #FFFFFF;
    --color-text-primary: #1A1A1A;
    --color-text-secondary: #8E8E93;
    --color-accent-orange: #FF9500;
    --color-accent-blue: #007AFF;
    --color-accent-pink: #FF7EB3;
    --safe-area-bottom: env(safe-area-inset-bottom, 0px);
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    @apply bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans;
    min-height: 100dvh;
  }

  /* Prevent iOS rubber-banding on tab bar area */
  #root {
    min-height: 100dvh;
  }
}

@layer components {
  .safe-bottom {
    padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 64px);
  }
}
```

- [ ] **Step 2: Verify**

Run: `npm run dev`
Expected: No CSS errors, page renders with correct background color.

- [ ] **Step 3: Commit**

```bash
git add src/styles/index.css && git commit -m "feat: add design tokens and global styles"
```

---

### Task 3: TypeScript Type Definitions

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Define all TypeScript types**

```typescript
// ========== User ==========

export interface UserProfile {
  id: string;
  nickname: string;
  avatarUrl: string;
  level: number;
  totalExerciseDays: number;
}

export interface BodyData {
  height: number;      // cm
  weight: number;      // kg
  targetWeight: number; // kg
  chest?: number;      // cm
  waist?: number;      // cm
  hip?: number;        // cm
}

// ========== Health / Dashboard ==========

export interface DailyStats {
  date: string;             // ISO date YYYY-MM-DD
  caloriesBurned: number;   // kcal
  calorieGoal: number;      // kcal
  steps: number;
  exerciseMinutes: number;
  intensity: 'low' | 'medium' | 'high';
}

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface WomenHealth {
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  nextPeriodDate: string;
  ovulationDate: string;
}

export interface PetStatus {
  name: string;
  type: 'dog' | 'cat';
  hunger: number;   // 0-100
  mood: 'happy' | 'neutral' | 'sad';
  level: number;
}

export interface DietSummary {
  caloriesConsumed: number;
  carbsPercent: number;
  proteinPercent: number;
  fatPercent: number;
}

// ========== Exercise ==========

export type ExerciseCategory = 'all' | 'fat-burn' | 'yoga' | 'gymnastics' | 'strength';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  coverUrl: string;
  durationMinutes: number;
  difficulty: Difficulty;
  caloriesBurn: number;
  rating: number;
  completions: number;
  category: ExerciseCategory;
  description?: string;
}

// ========== Achievements ==========

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockedAt?: string;
}

// ========== Settings ==========

export interface AppSettings {
  calorieGoal: number;
  stepGoal: number;
  exerciseGoalMinutes: number;
  targetWeight: number;
  remindersEnabled: boolean;
  privacyMode: boolean;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts && git commit -m "feat: add TypeScript type definitions"
```

---

### Task 4: Utility Functions

**Files:**
- Create: `src/utils/format.ts`

- [ ] **Step 1: Create format utilities**

```typescript
export function formatNumber(n: number): string {
  if (n >= 10000) {
    const wan = n / 10000;
    return wan % 1 === 0 ? `${wan}万` : `${wan.toFixed(1)}万`;
  }
  if (n >= 1000) {
    return n.toLocaleString('zh-CN');
  }
  return String(n);
}

export function formatKcal(n: number): string {
  return `${Math.round(n)}千卡`;
}

export function formatSteps(n: number): string {
  return n.toLocaleString('zh-CN');
}

export function formatMinutes(n: number): string {
  return `${n}min`;
}

export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)}kg`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export function intensityLabel(intensity: 'low' | 'medium' | 'high'): string {
  const map = { low: '低', medium: '中等', high: '高' };
  return map[intensity];
}

export function difficultyLabel(d: 'beginner' | 'intermediate' | 'advanced'): string {
  const map = { beginner: '初级', intermediate: '中级', advanced: '高级' };
  return map[d];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/format.ts && git commit -m "feat: add formatting utility functions"
```

---

### Task 5: Shared UI Components

**Files:**
- Create: `src/components/ui/ProgressRing.tsx`
- Create: `src/components/ui/StatBadge.tsx`
- Create: `src/components/ui/MetricCard.tsx`
- Create: `src/components/ui/Skeleton.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/index.ts`

- [ ] **Step 1: Create ProgressRing (SVG ring progress)**

```typescript
// src/components/ui/ProgressRing.tsx
import { useMemo } from 'react';

interface ProgressRingProps {
  percent: number;   // 0-100
  size?: number;     // px, default 140
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
}

export function ProgressRing({
  percent,
  size = 140,
  strokeWidth = 10,
  color = 'var(--color-primary)',
  trackColor = '#E5E7EB',
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create StatBadge**

```typescript
// src/components/ui/StatBadge.tsx
import type { ReactNode } from 'react';

interface StatBadgeProps {
  icon: ReactNode;
  value: string;
  label: string;
  color?: string;
}

export function StatBadge({ icon, value, label, color }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5" style={color ? { color } : undefined}>
        <span className="text-lg">{icon}</span>
        <span className="text-lg font-bold tabular-nums">{value}</span>
      </div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}
```

- [ ] **Step 3: Create MetricCard**

```typescript
// src/components/ui/MetricCard.tsx
import type { ReactNode } from 'react';

interface MetricCardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({ children, onClick, className = '' }: MetricCardProps) {
  const Component = onClick ? 'button' : 'div';
  return (
    <Component
      onClick={onClick}
      className={`bg-surface rounded-card p-4 shadow-sm ${onClick ? 'active:scale-[0.98] transition-transform cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
```

- [ ] **Step 4: Create Skeleton**

```typescript
// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, rounded = '8px', className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${className}`}
      style={{ width, height, borderRadius: rounded }}
    />
  );
}
```

- [ ] **Step 5: Create Badge**

```typescript
// src/components/ui/Badge.tsx
interface BadgeProps {
  label: string;
  color?: string;
  className?: string;
}

export function Badge({ label, color, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${className}`}
      style={color ? { backgroundColor: color + '20', color } : undefined}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 6: Create UI barrel export**

```typescript
// src/components/ui/index.ts
export { ProgressRing } from './ProgressRing';
export { StatBadge } from './StatBadge';
export { MetricCard } from './MetricCard';
export { Skeleton } from './Skeleton';
export { Badge } from './Badge';
```

- [ ] **Step 7: Verify** — Run `npm run dev`, no TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/ && git commit -m "feat: add shared UI components (ProgressRing, StatBadge, MetricCard, Skeleton, Badge)"
```

---

### Task 6: Layout Components

**Files:**
- Create: `src/components/layout/BottomNav.tsx`
- Create: `src/components/layout/PageHeader.tsx`
- Create: `src/components/layout/CategoryPills.tsx`
- Create: `src/components/layout/AppShell.tsx`
- Create: `src/components/layout/index.ts`

- [ ] **Step 1: Create BottomNav**

```typescript
// src/components/layout/BottomNav.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { House, Activity, ForkKnife, Users, User } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Tab {
  path: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  disabled?: boolean;
}

const TABS: Tab[] = [
  { path: '/home', label: '首页', icon: (a) => <House size={24} weight={a ? 'fill' : 'regular'} /> },
  { path: '/exercise', label: '运动', icon: (a) => <Activity size={24} weight={a ? 'fill' : 'regular'} /> },
  { path: '/diet', label: '饮食', icon: (a) => <ForkKnife size={24} weight={a ? 'fill' : 'regular'} />, disabled: true },
  { path: '/community', label: '广场', icon: (a) => <Users size={24} weight={a ? 'fill' : 'regular'} />, disabled: true },
  { path: '/profile', label: '我的', icon: (a) => <User size={24} weight={a ? 'fill' : 'regular'} /> },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTap = (tab: Tab) => {
    if (tab.disabled) {
      // Could show toast here; for now just don't navigate
      return;
    }
    navigate(tab.path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex justify-around items-end"
      style={{ paddingBottom: 'var(--safe-area-bottom)' }}
    >
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.path) && !tab.disabled;
        return (
          <button
            key={tab.path}
            onClick={() => handleTap(tab)}
            className={`relative flex flex-col items-center gap-0.5 py-2 px-3 min-w-0 ${
              tab.disabled ? 'opacity-35' : ''
            }`}
          >
            <div className={isActive ? 'text-primary' : 'text-gray-400'}>
              {tab.icon(isActive)}
            </div>
            <span
              className={`text-[10px] leading-none ${
                isActive ? 'text-primary font-semibold' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Create PageHeader**

```typescript
// src/components/layout/PageHeader.tsx
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  transparent?: boolean;
}

export function PageHeader({ title, leftAction, rightAction, transparent }: PageHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between h-12 px-4 ${
        transparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-lg border-b border-gray-100'
      }`}
    >
      <div className="flex-1 min-w-0 flex items-center">
        {leftAction}
      </div>
      {title && (
        <h1 className="flex-none text-base font-semibold truncate mx-2">{title}</h1>
      )}
      <div className="flex-1 min-w-0 flex items-center justify-end">
        {rightAction}
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create CategoryPills**

```typescript
// src/components/layout/CategoryPills.tsx
import { useRef, useEffect, useState } from 'react';

interface CategoryPillsProps {
  items: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
}

export function CategoryPills({ items, active, onChange }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeEl = scrollRef.current?.querySelector(`[data-key="${active}"]`) as HTMLElement;
    if (activeEl) {
      setIndicatorStyle({ left: activeEl.offsetLeft, width: activeEl.offsetWidth });
    }
  }, [active]);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide"
      >
        {items.map((item) => (
          <button
            key={item.key}
            data-key={item.key}
            onClick={() => onChange(item.key)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              active === item.key
                ? 'text-white bg-primary'
                : 'text-gray-600 bg-gray-100 active:bg-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create AppShell**

```typescript
// src/components/layout/AppShell.tsx
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppShell() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[var(--color-bg)]">
      <main className="flex-1 pb-20 safe-bottom">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
```

- [ ] **Step 5: Create barrel export**

```typescript
// src/components/layout/index.ts
export { AppShell } from './AppShell';
export { BottomNav } from './BottomNav';
export { PageHeader } from './PageHeader';
export { CategoryPills } from './CategoryPills';
```

- [ ] **Step 6: Verify** — Run `npm run dev`, no errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/ && git commit -m "feat: add layout components (BottomNav, PageHeader, CategoryPills, AppShell)"
```

---

### Task 7: Zustand Stores & Custom Hooks

**Files:**
- Create: `src/stores/userStore.ts`
- Create: `src/stores/healthStore.ts`
- Create: `src/stores/exerciseStore.ts`
- Create: `src/hooks/useHealthData.ts`
- Create: `src/hooks/useExerciseData.ts`
- Create: `src/hooks/useUserData.ts`

- [ ] **Step 1: Create userStore**

```typescript
// src/stores/userStore.ts
import { create } from 'zustand';
import type { UserProfile, BodyData } from '@/types';

interface UserState {
  profile: UserProfile | null;
  bodyData: BodyData | null;
  isLoading: boolean;
  fetchProfile: () => Promise<void>;
  fetchBodyData: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  bodyData: null,
  isLoading: false,

  fetchProfile: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/user/profile');
    const profile = await res.json();
    set({ profile, isLoading: false });
  },

  fetchBodyData: async () => {
    const res = await fetch('/api/user/body-data');
    const bodyData = await res.json();
    set({ bodyData });
  },
}));
```

- [ ] **Step 2: Create healthStore**

```typescript
// src/stores/healthStore.ts
import { create } from 'zustand';
import type { DailyStats, WeightRecord, WomenHealth, PetStatus, DietSummary } from '@/types';

interface HealthState {
  dailyStats: DailyStats | null;
  weightRecords: WeightRecord[];
  womenHealth: WomenHealth | null;
  petStatus: PetStatus | null;
  dietSummary: DietSummary | null;
  isLoading: boolean;
  fetchDailyStats: () => Promise<void>;
  fetchWeightRecords: () => Promise<void>;
  fetchWomenHealth: () => Promise<void>;
  fetchPetStatus: () => Promise<void>;
  fetchDietSummary: () => Promise<void>;
}

export const useHealthStore = create<HealthState>((set) => ({
  dailyStats: null,
  weightRecords: [],
  womenHealth: null,
  petStatus: null,
  dietSummary: null,
  isLoading: false,

  fetchDailyStats: async () => {
    set({ isLoading: true });
    const res = await fetch('/api/health/daily');
    const dailyStats = await res.json();
    set({ dailyStats, isLoading: false });
  },

  fetchWeightRecords: async () => {
    const res = await fetch('/api/health/weight');
    const weightRecords = await res.json();
    set({ weightRecords });
  },

  fetchWomenHealth: async () => {
    const res = await fetch('/api/health/women');
    const womenHealth = await res.json();
    set({ womenHealth });
  },

  fetchPetStatus: async () => {
    const res = await fetch('/api/health/pet');
    const petStatus = await res.json();
    set({ petStatus });
  },

  fetchDietSummary: async () => {
    const res = await fetch('/api/health/diet-summary');
    const dietSummary = await res.json();
    set({ dietSummary });
  },
}));
```

- [ ] **Step 3: Create exerciseStore**

```typescript
// src/stores/exerciseStore.ts
import { create } from 'zustand';
import type { Course, ExerciseCategory } from '@/types';

interface ExerciseState {
  courses: Course[];
  category: ExerciseCategory;
  isLoading: boolean;
  setCategory: (cat: ExerciseCategory) => void;
  fetchCourses: (category: ExerciseCategory) => Promise<void>;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  courses: [],
  category: 'all',
  isLoading: false,

  setCategory: (category) => {
    set({ category });
    // Trigger fetch after setting category (handled in hook)
  },

  fetchCourses: async (category) => {
    set({ isLoading: true });
    const url = category === 'all' ? '/api/exercise/courses' : `/api/exercise/courses?category=${category}`;
    const res = await fetch(url);
    const courses = await res.json();
    set({ courses, isLoading: false });
  },
}));
```

- [ ] **Step 4: Create custom hooks**

```typescript
// src/hooks/useHealthData.ts
import { useEffect } from 'react';
import { useHealthStore } from '@/stores/healthStore';

export function useHealthData() {
  const store = useHealthStore();

  useEffect(() => {
    store.fetchDailyStats();
    store.fetchWeightRecords();
    store.fetchWomenHealth();
    store.fetchPetStatus();
    store.fetchDietSummary();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
```

```typescript
// src/hooks/useExerciseData.ts
import { useEffect } from 'react';
import { useExerciseStore } from '@/stores/exerciseStore';

export function useExerciseData() {
  const store = useExerciseStore();

  useEffect(() => {
    store.fetchCourses(store.category);
  }, [store.category]); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
```

```typescript
// src/hooks/useUserData.ts
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';

export function useUserData() {
  const store = useUserStore();

  useEffect(() => {
    store.fetchProfile();
    store.fetchBodyData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return store;
}
```

- [ ] **Step 5: Verify** — Run `npm run dev`, no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/stores/ src/hooks/ && git commit -m "feat: add Zustand stores and custom data hooks"
```

---

### Task 8: MSW Mock Data & Handlers

**Files:**
- Create: `src/mocks/data/user.ts`
- Create: `src/mocks/data/health.ts`
- Create: `src/mocks/data/courses.ts`
- Create: `src/mocks/handlers/user.ts`
- Create: `src/mocks/handlers/health.ts`
- Create: `src/mocks/handlers/exercise.ts`
- Create: `src/mocks/handlers/index.ts`
- Create: `src/mocks/browser.ts`

- [ ] **Step 1: Create mock data — user.ts**

```typescript
// src/mocks/data/user.ts
import type { UserProfile, BodyData } from '@/types';

export const mockProfile: UserProfile = {
  id: 'u1',
  nickname: '小健',
  avatarUrl: '',
  level: 5,
  totalExerciseDays: 128,
};

export const mockBodyData: BodyData = {
  height: 165,
  weight: 65.3,
  targetWeight: 55,
  chest: 88,
  waist: 72,
  hip: 94,
};
```

- [ ] **Step 2: Create mock data — health.ts**

```typescript
// src/mocks/data/health.ts
import type { DailyStats, WeightRecord, WomenHealth, PetStatus, DietSummary } from '@/types';

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const mockDailyStats: DailyStats = {
  date: daysAgo(0),
  caloriesBurned: 850,
  calorieGoal: 1200,
  steps: 6842,
  exerciseMinutes: 45,
  intensity: 'medium',
};

export const mockWeightRecords: WeightRecord[] = Array.from({ length: 14 }, (_, i) => ({
  date: daysAgo(13 - i),
  weight: 66.5 - (13 - i) * 0.092,
}));

export const mockWomenHealth: WomenHealth = {
  cycleDay: 3,
  cycleLength: 28,
  periodLength: 5,
  nextPeriodDate: daysAgo(28 - 3).replace(daysAgo(0), daysAgo(28 - 3 + 3)),
  ovulationDate: daysAgo(-12),
};
// Fix: use computed dates properly
const today = new Date();
mockWomenHealth.nextPeriodDate = new Date(today.getTime() + (28 - 3) * 86400000).toISOString().split('T')[0];
mockWomenHealth.ovulationDate = new Date(today.getTime() + 12 * 86400000).toISOString().split('T')[0];

export const mockPetStatus: PetStatus = {
  name: '小柯基',
  type: 'dog',
  hunger: 80,
  mood: 'happy',
  level: 5,
};

export const mockDietSummary: DietSummary = {
  caloriesConsumed: 980,
  carbsPercent: 40,
  proteinPercent: 25,
  fatPercent: 35,
};
```

- [ ] **Step 3: Create mock data — courses.ts**

```typescript
// src/mocks/data/courses.ts
import type { Course } from '@/types';

export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: '全身拉伸操',
    coverUrl: '',
    durationMinutes: 12,
    difficulty: 'beginner',
    caloriesBurn: 60,
    rating: 4.8,
    completions: 23000,
    category: 'gymnastics',
  },
  {
    id: 'c2',
    title: '活力有氧体操',
    coverUrl: '',
    durationMinutes: 20,
    difficulty: 'intermediate',
    caloriesBurn: 150,
    rating: 4.9,
    completions: 18000,
    category: 'gymnastics',
  },
  {
    id: 'c3',
    title: '垫上普拉提',
    coverUrl: '',
    durationMinutes: 25,
    difficulty: 'intermediate',
    caloriesBurn: 120,
    rating: 4.7,
    completions: 9600,
    category: 'yoga',
  },
  {
    id: 'c4',
    title: '爆汗燃脂操',
    coverUrl: '',
    durationMinutes: 20,
    difficulty: 'intermediate',
    caloriesBurn: 200,
    rating: 4.9,
    completions: 32000,
    category: 'fat-burn',
  },
  {
    id: 'c5',
    title: '晨间唤醒体操',
    coverUrl: '',
    durationMinutes: 10,
    difficulty: 'beginner',
    caloriesBurn: 85,
    rating: 4.6,
    completions: 15000,
    category: 'gymnastics',
  },
  {
    id: 'c6',
    title: '力量核心训练',
    coverUrl: '',
    durationMinutes: 30,
    difficulty: 'advanced',
    caloriesBurn: 280,
    rating: 4.8,
    completions: 8700,
    category: 'strength',
  },
  {
    id: 'c7',
    title: '流瑜伽 · 柔韧提升',
    coverUrl: '',
    durationMinutes: 35,
    difficulty: 'intermediate',
    caloriesBurn: 180,
    rating: 4.9,
    completions: 12000,
    category: 'yoga',
  },
  {
    id: 'c8',
    title: 'HIIT 高效燃脂',
    coverUrl: '',
    durationMinutes: 15,
    difficulty: 'advanced',
    caloriesBurn: 220,
    rating: 4.7,
    completions: 28000,
    category: 'fat-burn',
  },
];
```

- [ ] **Step 4: Create MSW handlers — user.ts**

```typescript
// src/mocks/handlers/user.ts
import { http, HttpResponse } from 'msw';
import { mockProfile, mockBodyData } from '../data/user';

export const userHandlers = [
  http.get('/api/user/profile', () => {
    return HttpResponse.json(mockProfile);
  }),
  http.get('/api/user/body-data', () => {
    return HttpResponse.json(mockBodyData);
  }),
];
```

- [ ] **Step 5: Create MSW handlers — health.ts**

```typescript
// src/mocks/handlers/health.ts
import { http, HttpResponse } from 'msw';
import { mockDailyStats, mockWeightRecords, mockWomenHealth, mockPetStatus, mockDietSummary } from '../data/health';

export const healthHandlers = [
  http.get('/api/health/daily', () => {
    return HttpResponse.json(mockDailyStats);
  }),
  http.get('/api/health/weight', () => {
    return HttpResponse.json(mockWeightRecords);
  }),
  http.get('/api/health/women', () => {
    return HttpResponse.json(mockWomenHealth);
  }),
  http.get('/api/health/pet', () => {
    return HttpResponse.json(mockPetStatus);
  }),
  http.get('/api/health/diet-summary', () => {
    return HttpResponse.json(mockDietSummary);
  }),
];
```

- [ ] **Step 6: Create MSW handlers — exercise.ts**

```typescript
// src/mocks/handlers/exercise.ts
import { http, HttpResponse } from 'msw';
import { mockCourses } from '../data/courses';
import type { ExerciseCategory } from '@/types';

export const exerciseHandlers = [
  http.get('/api/exercise/courses', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') as ExerciseCategory | null;
    if (!category || category === 'all') {
      return HttpResponse.json(mockCourses);
    }
    const filtered = mockCourses.filter((c) => c.category === category);
    return HttpResponse.json(filtered);
  }),
];
```

- [ ] **Step 7: Create handlers index + browser setup**

```typescript
// src/mocks/handlers/index.ts
import { userHandlers } from './user';
import { healthHandlers } from './health';
import { exerciseHandlers } from './exercise';

export const handlers = [...userHandlers, ...healthHandlers, ...exerciseHandlers];
```

```typescript
// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
```

- [ ] **Step 8: Verify** — Run `npm run dev`, confirm no TS errors.

- [ ] **Step 9: Commit**

```bash
git add src/mocks/ && git commit -m "feat: add MSW mock data and API handlers"
```

---

### Task 9: App Entry & Router

**Files:**
- Create: `src/app/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/components/shared/EmptyTab.tsx`

- [ ] **Step 1: Create EmptyTab placeholder**

```typescript
// src/components/shared/EmptyTab.tsx
import { SmileySad } from '@phosphor-icons/react';

interface EmptyTabProps {
  title: string;
}

export function EmptyTab({ title }: EmptyTabProps) {
  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center gap-4 text-gray-400">
      <SmileySad size={48} />
      <p className="text-sm">{title}功能即将上线</p>
    </div>
  );
}
```

- [ ] **Step 2: Create main.tsx**

```typescript
// src/app/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@/styles/index.css';

async function bootstrap() {
  // Start MSW in development only
  if (import.meta.env.DEV) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

bootstrap();
```

- [ ] **Step 3: Create App.tsx with router**

```typescript
// src/app/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { EmptyTab } from '@/components/shared/EmptyTab';
import { HomeScreen } from '@/features/dashboard';
import { ExerciseScreen, ExerciseDetailScreen } from '@/features/exercise';
import { ProfileScreen, SettingsScreen, BodyDataScreen } from '@/features/profile';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/exercise" element={<ExerciseScreen />} />
          <Route path="/exercise/:id" element={<ExerciseDetailScreen />} />
          <Route path="/diet" element={<EmptyTab title="饮食" />} />
          <Route path="/community" element={<EmptyTab title="广场" />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/profile/settings" element={<SettingsScreen />} />
          <Route path="/profile/body-data" element={<BodyDataScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Verify** — Run `npm run dev`, browser should show app shell with bottom nav and EmptyTab for diet/community. Home, exercise, profile will show blank (no screens yet).

- [ ] **Step 5: Commit**

```bash
git add src/app/ src/components/shared/ && git commit -m "feat: add app entry, router, and app shell with bottom navigation"
```

---

### Task 10: HomeScreen Dashboard

**Files:**
- Create: `src/features/dashboard/screens/HomeScreen.tsx`
- Create: `src/features/dashboard/components/CalorieRing.tsx`
- Create: `src/features/dashboard/components/StatsRow.tsx`
- Create: `src/features/dashboard/components/WeightCard.tsx`
- Create: `src/features/dashboard/components/WomenHealthCard.tsx`
- Create: `src/features/dashboard/components/PetCard.tsx`
- Create: `src/features/dashboard/components/CourseRecommend.tsx`
- Create: `src/features/dashboard/components/DietSummary.tsx`
- Create: `src/features/dashboard/index.ts`

- [ ] **Step 1: Create CalorieRing component**

```typescript
// src/features/dashboard/components/CalorieRing.tsx
import { ProgressRing } from '@/components/ui';
import { formatKcal } from '@/utils/format';
import type { DailyStats } from '@/types';

interface CalorieRingProps {
  stats: DailyStats;
}

export function CalorieRing({ stats }: CalorieRingProps) {
  const percent = Math.round((stats.caloriesBurned / stats.calorieGoal) * 100);

  return (
    <div className="flex flex-col items-center py-4">
      <ProgressRing percent={percent} size={150} color="#FF9500">
        <span className="text-2xl font-extrabold tabular-nums text-gray-900">
          {Math.round(stats.caloriesBurned)}
        </span>
        <span className="text-xs text-gray-500 mt-0.5">
          / {stats.calorieGoal} 千卡
        </span>
      </ProgressRing>
      <span className="mt-2 text-sm font-medium text-accent-orange">{percent}%</span>
    </div>
  );
}
```

- [ ] **Step 2: Create StatsRow component**

```typescript
// src/features/dashboard/components/StatsRow.tsx
import { Footprints, Clock, Lightning } from '@phosphor-icons/react';
import { StatBadge } from '@/components/ui';
import { formatSteps, formatMinutes, intensityLabel } from '@/utils/format';
import type { DailyStats } from '@/types';

interface StatsRowProps {
  stats: DailyStats;
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="flex justify-around py-3">
      <StatBadge
        icon={<Footprints weight="fill" />}
        value={formatSteps(stats.steps)}
        label="步数"
        color="var(--color-accent-blue)"
      />
      <StatBadge
        icon={<Clock weight="fill" />}
        value={formatMinutes(stats.exerciseMinutes)}
        label="时长"
        color="var(--color-primary)"
      />
      <StatBadge
        icon={<Lightning weight="fill" />}
        value={intensityLabel(stats.intensity)}
        label="强度"
        color="var(--color-accent-orange)"
      />
    </div>
  );
}
```

- [ ] **Step 3: Create WeightCard**

```typescript
// src/features/dashboard/components/WeightCard.tsx
import { useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { MetricCard } from '@/components/ui';
import { formatWeight } from '@/utils/format';
import type { WeightRecord } from '@/types';
import { useNavigate } from 'react-router-dom';

interface WeightCardProps {
  current: number;
  records: WeightRecord[];
}

export function WeightCard({ current, records }: WeightCardProps) {
  const navigate = useNavigate();
  const chartData = useMemo(() => records.map((r) => ({ date: r.date, w: r.weight })), [records]);

  return (
    <MetricCard onClick={() => navigate('/profile/body-data')} className="flex-1">
      <p className="text-xs text-gray-500 mb-1">体重</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold tabular-nums">{formatWeight(current)}</span>
        <span className="text-xs text-primary text-[10px]">▼ 0.3</span>
      </div>
      <div className="h-10 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="w"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </MetricCard>
  );
}
```

- [ ] **Step 4: Create WomenHealthCard**

```typescript
// src/features/dashboard/components/WomenHealthCard.tsx
import { MetricCard } from '@/components/ui';
import type { WomenHealth } from '@/types';

interface WomenHealthCardProps {
  data: WomenHealth;
}

export function WomenHealthCard({ data }: WomenHealthCardProps) {
  return (
    <MetricCard className="flex-1 bg-[#FFF0F5]">
      <p className="text-xs text-pink-600 mb-1">女性健康</p>
      <p className="text-lg font-bold text-pink-700">经期第 {data.cycleDay} 天</p>
      <p className="text-xs text-pink-500 mt-1">
        预计 {data.ovulationDate.split('-').slice(1).join('月')}日 排卵期
      </p>
    </MetricCard>
  );
}
```

- [ ] **Step 5: Create PetCard**

```typescript
// src/features/dashboard/components/PetCard.tsx
import { MetricCard } from '@/components/ui';
import type { PetStatus } from '@/types';

interface PetCardProps {
  pet: PetStatus;
}

const MOOD_EMOJI: Record<PetStatus['mood'], string> = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
};

const TYPE_EMOJI: Record<PetStatus['type'], string> = {
  dog: '🐶',
  cat: '🐱',
};

export function PetCard({ pet }: PetCardProps) {
  const hungerPercent = pet.hunger;

  return (
    <MetricCard>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{TYPE_EMOJI[pet.type]}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{pet.name}</span>
            <span className="text-xs text-gray-400">Lv.{pet.level}</span>
            <span>{MOOD_EMOJI[pet.mood]}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-500 w-10">饥饿</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${hungerPercent}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 tabular-nums">{hungerPercent}%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">今天动够了吗？喂我 →</p>
        </div>
      </div>
    </MetricCard>
  );
}
```

- [ ] **Step 6: Create CourseRecommend**

```typescript
// src/features/dashboard/components/CourseRecommend.tsx
import { useNavigate } from 'react-router-dom';
import { Clock, Fire } from '@phosphor-icons/react';
import { formatMinutes, formatKcal, formatNumber } from '@/utils/format';
import type { Course } from '@/types';

interface CourseRecommendProps {
  courses: Course[];
}

export function CourseRecommend({ courses }: CourseRecommendProps) {
  const navigate = useNavigate();
  const top3 = courses.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold">今日课程推荐</h3>
        <button
          onClick={() => navigate('/exercise')}
          className="text-xs text-primary font-medium"
        >
          更多 →
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {top3.map((course) => (
          <button
            key={course.id}
            onClick={() => navigate(`/exercise/${course.id}`)}
            className="shrink-0 w-36 bg-white rounded-card shadow-sm overflow-hidden active:scale-[0.98] transition-transform"
          >
            <div className="h-20 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-2xl">🏃</span>
            </div>
            <div className="p-3 text-left">
              <p className="text-xs font-semibold truncate">{course.title}</p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
                <span className="flex items-center gap-0.5">
                  <Clock size={10} /> {formatMinutes(course.durationMinutes)}
                </span>
                <span className="flex items-center gap-0.5">
                  <Fire size={10} /> {formatKcal(course.caloriesBurn)}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create DietSummary**

```typescript
// src/features/dashboard/components/DietSummary.tsx
import { MetricCard } from '@/components/ui';
import { formatKcal, formatPercent } from '@/utils/format';
import type { DietSummary } from '@/types';

interface DietSummaryProps {
  data: DietSummary;
}

export function DietSummary({ data }: DietSummaryProps) {
  return (
    <MetricCard>
      <p className="text-xs text-gray-500 mb-2">饮食摘要</p>
      <p className="text-sm font-semibold">
        今日已摄入 <span className="text-accent-orange">{formatKcal(data.caloriesConsumed)}</span>
      </p>
      <div className="flex gap-2 mt-3">
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${data.carbsPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">碳水{formatPercent(data.carbsPercent)}</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${data.proteinPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">蛋白{formatPercent(data.proteinPercent)}</p>
        </div>
        <div className="flex-1 text-center">
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${data.fatPercent}%` }} />
          </div>
          <p className="text-[10px] text-gray-500 mt-1">脂肪{formatPercent(data.fatPercent)}</p>
        </div>
      </div>
    </MetricCard>
  );
}
```

- [ ] **Step 8: Assemble HomeScreen**

```typescript
// src/features/dashboard/screens/HomeScreen.tsx
import { Bell, ChatDots } from '@phosphor-icons/react';
import { PageHeader } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useHealthData } from '@/hooks/useHealthData';
import { useExerciseData } from '@/hooks/useExerciseData';
import { CalorieRing } from '../components/CalorieRing';
import { StatsRow } from '../components/StatsRow';
import { WeightCard } from '../components/WeightCard';
import { WomenHealthCard } from '../components/WomenHealthCard';
import { PetCard } from '../components/PetCard';
import { CourseRecommend } from '../components/CourseRecommend';
import { DietSummary } from '../components/DietSummary';

export function HomeScreen() {
  const { dailyStats, weightRecords, womenHealth, petStatus, dietSummary, isLoading } = useHealthData();
  const { courses } = useExerciseData();

  if (isLoading || !dailyStats) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton height={200} />
        <Skeleton height={80} />
        <div className="flex gap-3">
          <Skeleton height={100} width="48%" />
          <Skeleton height={100} width="48%" />
        </div>
        <Skeleton height={120} />
        <Skeleton height={100} />
      </div>
    );
  }

  const latestWeight = weightRecords.length > 0 ? weightRecords[weightRecords.length - 1].weight : 65.3;

  return (
    <div>
      <PageHeader
        title="健康监测"
        leftAction={<Bell size={22} className="text-gray-700" />}
        rightAction={<ChatDots size={22} className="text-gray-700" />}
      />

      <div className="px-4 space-y-3 pb-4">
        {/* Today's Overview */}
        <div className="bg-white rounded-card shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">今日目标</p>
          <CalorieRing stats={dailyStats} />
          <StatsRow stats={dailyStats} />
        </div>

        {/* Weight + Women Health row */}
        <div className="flex gap-3">
          <WeightCard current={latestWeight} records={weightRecords} />
          {womenHealth && <WomenHealthCard data={womenHealth} />}
        </div>

        {/* Pet Card */}
        {petStatus && <PetCard pet={petStatus} />}

        {/* Course Recommendations */}
        {courses.length > 0 && <CourseRecommend courses={courses} />}

        {/* Diet Summary */}
        {dietSummary && <DietSummary data={dietSummary} />}
      </div>
    </div>
  );
}
```

- [ ] **Step 9: Create dashboard barrel export**

```typescript
// src/features/dashboard/index.ts
export { HomeScreen } from './screens/HomeScreen';
```

- [ ] **Step 10: Verify** — Run `npm run dev`, visit http://localhost:3000/home. Home dashboard should render with all cards and real mock data.

- [ ] **Step 11: Commit**

```bash
git add src/features/dashboard/ && git commit -m "feat: implement home dashboard screen with all cards and mock data"
```

---

### Task 11: ExerciseScreen

**Files:**
- Create: `src/features/exercise/screens/ExerciseScreen.tsx`
- Create: `src/features/exercise/screens/ExerciseDetailScreen.tsx`
- Create: `src/features/exercise/components/CourseCard.tsx`
- Create: `src/features/exercise/components/CustomPlanCard.tsx`
- Create: `src/features/exercise/index.ts`

- [ ] **Step 1: Create CourseCard**

```typescript
// src/features/exercise/components/CourseCard.tsx
import { useNavigate } from 'react-router-dom';
import { Clock, Fire, Star } from '@phosphor-icons/react';
import { formatMinutes, formatKcal, formatNumber, difficultyLabel } from '@/utils/format';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/exercise/${course.id}`)}
      className="flex gap-3 bg-white rounded-card p-3 shadow-sm active:scale-[0.99] transition-transform w-full text-left"
    >
      <div className="shrink-0 w-24 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
        <span className="text-3xl">🏃</span>
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <p className="text-sm font-semibold truncate">{course.title}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="flex items-center gap-0.5"><Clock size={12} />{formatMinutes(course.durationMinutes)}</span>
          <span>·</span>
          <span>{difficultyLabel(course.difficulty)}</span>
          <span>·</span>
          <span className="flex items-center gap-0.5"><Fire size={12} />{formatKcal(course.caloriesBurn)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Star size={12} weight="fill" className="text-yellow-400" />
          <span>{course.rating}</span>
          <span>{formatNumber(course.completions)}人练过</span>
        </div>
      </div>
    </button>
  );
}
```

- [ ] **Step 2: Create CustomPlanCard**

```typescript
// src/features/exercise/components/CustomPlanCard.tsx
export function CustomPlanCard() {
  return (
    <div className="bg-white rounded-card p-4 shadow-sm text-center">
      <p className="text-sm text-gray-600 mb-3">根据你的体能水平，生成专属体操组合</p>
      <button
        className="px-6 py-2 bg-primary text-white rounded-btn text-sm font-medium active:scale-[0.98] transition-transform"
        onClick={() => {/* TODO: Future feature */}}
      >
        生成训练计划
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create ExerciseScreen**

```typescript
// src/features/exercise/screens/ExerciseScreen.tsx
import { MagnifyingGlass } from '@phosphor-icons/react';
import { PageHeader, CategoryPills } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useExerciseData } from '@/hooks/useExerciseData';
import { CourseCard } from '../components/CourseCard';
import { CustomPlanCard } from '../components/CustomPlanCard';
import type { ExerciseCategory } from '@/types';

const CATEGORIES: { key: ExerciseCategory; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'fat-burn', label: '燃脂' },
  { key: 'yoga', label: '瑜伽' },
  { key: 'gymnastics', label: '体操' },
  { key: 'strength', label: '力量' },
];

export function ExerciseScreen() {
  const { courses, category, setCategory, fetchCourses, isLoading } = useExerciseData();

  const handleCategoryChange = (key: string) => {
    setCategory(key as ExerciseCategory);
    fetchCourses(key as ExerciseCategory);
  };

  return (
    <div>
      <PageHeader
        title="跟练体操"
        rightAction={<MagnifyingGlass size={22} className="text-gray-700" />}
        leftAction={
          <button onClick={() => window.history.back()} className="text-gray-700">
            <span className="text-sm">←</span>
          </button>
        }
      />

      <CategoryPills items={CATEGORIES} active={category} onChange={handleCategoryChange} />

      <div className="px-4 space-y-3 pb-4">
        {isLoading ? (
          <>
            <Skeleton height={100} />
            <Skeleton height={100} />
            <Skeleton height={100} />
          </>
        ) : (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        )}

        <CustomPlanCard />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create ExerciseDetailScreen (stub)**

```typescript
// src/features/exercise/screens/ExerciseDetailScreen.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { useExerciseData } from '@/hooks/useExerciseData';
import { Clock, Fire, Star, Lightning } from '@phosphor-icons/react';
import { formatMinutes, formatKcal, formatNumber, difficultyLabel } from '@/utils/format';
import { useMemo } from 'react';

export function ExerciseDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses } = useExerciseData();
  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);

  if (!course) {
    return (
      <div className="p-8 text-center text-gray-400">课程未找到</div>
    );
  }

  return (
    <div>
      <PageHeader
        title={course.title}
        leftAction={
          <button onClick={() => navigate(-1)} className="text-gray-700 text-sm">← 返回</button>
        }
      />

      <div className="px-4 space-y-4 pb-8">
        {/* Hero area */}
        <div className="bg-gradient-to-br from-primary/30 to-primary/10 rounded-card h-48 flex items-center justify-center">
          <span className="text-6xl">🏃‍♀️</span>
        </div>

        {/* Course info */}
        <div className="bg-white rounded-card p-4 shadow-sm">
          <h2 className="text-lg font-bold">{course.title}</h2>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Clock size={16} />{formatMinutes(course.durationMinutes)}</span>
            <span className="flex items-center gap-1"><Fire size={16} />{formatKcal(course.caloriesBurn)}</span>
            <span className="flex items-center gap-1"><Lightning size={16} />{difficultyLabel(course.difficulty)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
            <Star size={16} weight="fill" className="text-yellow-400" />
            <span>{course.rating}</span>
            <span>· {formatNumber(course.completions)}人练过</span>
          </div>
        </div>

        {/* Start button */}
        <button className="w-full py-3.5 bg-primary text-white rounded-btn text-base font-semibold active:scale-[0.98] transition-transform shadow-lg shadow-primary/30">
          开始训练
        </button>

        <p className="text-xs text-center text-gray-400">
          训练中界面将在后续版本中提供
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create exercise barrel export**

```typescript
// src/features/exercise/index.ts
export { ExerciseScreen } from './screens/ExerciseScreen';
export { ExerciseDetailScreen } from './screens/ExerciseDetailScreen';
```

- [ ] **Step 6: Verify** — Run `npm run dev`, go to /exercise. Browse courses, switch categories, tap a course to see detail.

- [ ] **Step 7: Commit**

```bash
git add src/features/exercise/ && git commit -m "feat: implement exercise screen with course list, category filter, and detail page"
```

---

### Task 12: ProfileScreen

**Files:**
- Create: `src/features/profile/screens/ProfileScreen.tsx`
- Create: `src/features/profile/screens/SettingsScreen.tsx`
- Create: `src/features/profile/screens/BodyDataScreen.tsx`
- Create: `src/features/profile/components/ProfileHeader.tsx`
- Create: `src/features/profile/components/BodyDataCard.tsx`
- Create: `src/features/profile/components/AchievementGrid.tsx`
- Create: `src/features/profile/components/SettingsList.tsx`
- Create: `src/features/profile/index.ts`

- [ ] **Step 1: Create ProfileHeader**

```typescript
// src/features/profile/components/ProfileHeader.tsx
import { UserCircle } from '@phosphor-icons/react';
import type { UserProfile } from '@/types';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt={profile.nickname} className="w-full h-full rounded-full object-cover" />
        ) : (
          <UserCircle size={48} className="text-gray-400" />
        )}
      </div>
      <h2 className="text-lg font-bold">{profile.nickname}</h2>
      <div className="flex items-center gap-1 mt-1">
        <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
          Lv.{profile.level}
        </span>
        <span className="text-xs text-gray-500">
          累计运动 {profile.totalExerciseDays} 天
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create BodyDataCard**

```typescript
// src/features/profile/components/BodyDataCard.tsx
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '@/components/ui';
import { formatWeight } from '@/utils/format';
import type { BodyData } from '@/types';

interface BodyDataCardProps {
  data: BodyData;
}

export function BodyDataCard({ data }: BodyDataCardProps) {
  const navigate = useNavigate();

  return (
    <MetricCard onClick={() => navigate('/profile/body-data')}>
      <p className="text-xs text-gray-500 mb-2">身体数据</p>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-lg font-bold">{data.height}<span className="text-xs text-gray-500 font-normal">cm</span></p>
          <p className="text-[10px] text-gray-400">身高</p>
        </div>
        <div>
          <p className="text-lg font-bold">{formatWeight(data.weight)}</p>
          <p className="text-[10px] text-gray-400">体重</p>
        </div>
        <div>
          <p className="text-lg font-bold">{formatWeight(data.targetWeight)}</p>
          <p className="text-[10px] text-gray-400">目标</p>
        </div>
      </div>
      <p className="text-xs text-primary text-center mt-2">查看详情 →</p>
    </MetricCard>
  );
}
```

- [ ] **Step 3: Create AchievementGrid**

```typescript
// src/features/profile/components/AchievementGrid.tsx
import { MetricCard } from '@/components/ui';
import type { Achievement } from '@/types';

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: '🏅', title: '连续7天', description: '连续运动7天', unlockedAt: '2026-05-20' },
  { id: 'a2', icon: '🔥', title: '100天', description: '累计运动100天', unlockedAt: '2026-04-10' },
  { id: 'a3', icon: '💪', title: '万步达人', description: '首次单日1万步', unlockedAt: '2026-03-15' },
  { id: 'a4', icon: '⭐', title: '早起打卡', description: '连续30天7点前运动', unlockedAt: '2026-06-01' },
];

export function AchievementGrid() {
  return (
    <MetricCard>
      <p className="text-xs text-gray-500 mb-3">成就徽章</p>
      <div className="grid grid-cols-4 gap-3">
        {MOCK_ACHIEVEMENTS.map((a) => (
          <div key={a.id} className="flex flex-col items-center text-center gap-1">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-xl">
              {a.icon}
            </div>
            <p className="text-[10px] leading-tight font-medium text-gray-700">{a.title}</p>
          </div>
        ))}
      </div>
    </MetricCard>
  );
}
```

- [ ] **Step 4: Create SettingsList**

```typescript
// src/features/profile/components/SettingsList.tsx
import { useNavigate } from 'react-router-dom';
import { CaretRight } from '@phosphor-icons/react';
import { MetricCard } from '@/components/ui';

const MENU_ITEMS = [
  { label: '目标设定', path: '/profile/settings' },
  { label: '隐私设置', path: '/profile/settings' },
  { label: '提醒通知', path: '/profile/settings' },
  { label: '连接设备', path: '/profile/settings' },
  { label: '关于我们', path: '/profile/settings' },
];

export function SettingsList() {
  const navigate = useNavigate();

  return (
    <MetricCard>
      <p className="text-xs text-gray-500 mb-2">设置</p>
      <div className="divide-y divide-gray-50">
        {MENU_ITEMS.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-between w-full py-3 text-sm text-gray-700 active:bg-gray-50 -mx-4 px-4"
          >
            <span>{item.label}</span>
            <CaretRight size={16} className="text-gray-300" />
          </button>
        ))}
      </div>
    </MetricCard>
  );
}
```

- [ ] **Step 5: Create ProfileScreen**

```typescript
// src/features/profile/screens/ProfileScreen.tsx
import { PageHeader } from '@/components/layout';
import { Skeleton } from '@/components/ui';
import { useUserData } from '@/hooks/useUserData';
import { ProfileHeader } from '../components/ProfileHeader';
import { BodyDataCard } from '../components/BodyDataCard';
import { AchievementGrid } from '../components/AchievementGrid';
import { SettingsList } from '../components/SettingsList';

export function ProfileScreen() {
  const { profile, bodyData, isLoading } = useUserData();

  if (isLoading || !profile) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton height={160} />
        <Skeleton height={100} />
        <Skeleton height={120} />
        <Skeleton height={200} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="我的" />

      <ProfileHeader profile={profile} />

      <div className="px-4 space-y-3 pb-4">
        {bodyData && <BodyDataCard data={bodyData} />}
        <AchievementGrid />
        <SettingsList />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create SettingsScreen (stub)**

```typescript
// src/features/profile/screens/SettingsScreen.tsx
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';

export function SettingsScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="设置"
        leftAction={
          <button onClick={() => navigate(-1)} className="text-sm text-gray-700">← 返回</button>
        }
      />
      <div className="px-4 py-12 text-center text-gray-400 text-sm">
        设置功能将在后续版本中完善
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create BodyDataScreen (stub)**

```typescript
// src/features/profile/screens/BodyDataScreen.tsx
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout';
import { MetricCard } from '@/components/ui';
import { useUserData } from '@/hooks/useUserData';
import { formatWeight } from '@/utils/format';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { useMemo } from 'react';
import { useHealthData } from '@/hooks/useHealthData';

export function BodyDataScreen() {
  const navigate = useNavigate();
  const { bodyData } = useUserData();
  const { weightRecords } = useHealthData();

  const chartData = useMemo(
    () => weightRecords.map((r) => ({ date: r.date.slice(5), weight: r.weight })),
    [weightRecords],
  );

  return (
    <div>
      <PageHeader
        title="身体数据"
        leftAction={
          <button onClick={() => navigate(-1)} className="text-sm text-gray-700">← 返回</button>
        }
      />

      <div className="px-4 space-y-4 pb-8">
        {bodyData && (
          <MetricCard>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{bodyData.height}<span className="text-sm text-gray-500 font-normal">cm</span></p>
                <p className="text-xs text-gray-400 mt-1">身高</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatWeight(bodyData.weight)}</p>
                <p className="text-xs text-gray-400 mt-1">当前体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatWeight(bodyData.targetWeight)}</p>
                <p className="text-xs text-gray-400 mt-1">目标体重</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-orange">
                  {formatWeight(Math.abs(bodyData.weight - bodyData.targetWeight))}
                </p>
                <p className="text-xs text-gray-400 mt-1">还需减重</p>
              </div>
            </div>
          </MetricCard>
        )}

        <MetricCard>
          <p className="text-xs text-gray-500 mb-3">体重趋势 (近14天)</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'var(--color-primary)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </MetricCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Create profile barrel export**

```typescript
// src/features/profile/index.ts
export { ProfileScreen } from './screens/ProfileScreen';
export { SettingsScreen } from './screens/SettingsScreen';
export { BodyDataScreen } from './screens/BodyDataScreen';
```

- [ ] **Step 9: Verify** — Run `npm run dev`, go to /profile. Should see avatar/name/level, body data card, achievements, and settings list. Tap body data → trend chart. Tap any settings item → stub settings page.

- [ ] **Step 10: Commit**

```bash
git add src/features/profile/ && git commit -m "feat: implement profile screen with user info, body data, achievements, and settings"
```

---

### Task 13: Final Integration & Polish

**Files:**
- Modify: `src/app/App.tsx` (verify all imports resolve)
- Create: `public/manifest.json`

- [ ] **Step 1: Create PWA manifest**

```json
{
  "name": "健康监测",
  "short_name": "健康监测",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F5F5F5",
  "theme_color": "#6BCF7A",
  "icons": []
}
```

- [ ] **Step 2: Run full build to verify zero errors**

```bash
npm run build
```

Expected: TypeScript compilation passes, Vite build succeeds, `dist/` contains all bundles.

- [ ] **Step 3: Test all routes in dev**

- `/home` — dashboard with all cards populated with mock data
- `/exercise` — course list, category switching, tap course → detail
- `/profile` — user info, body data, achievements, settings
- `/diet` — EmptyTab with "饮食功能即将上线"
- `/community` — EmptyTab with "广场功能即将上线"
- `/profile/settings` — stub settings page
- `/profile/body-data` — weight trend chart

- [ ] **Step 4: Verify mobile responsiveness**

Open Chrome DevTools → toggle device toolbar → test at 375px, 390px, 414px widths. Ensure:
- No horizontal overflow
- Cards stack properly
- Bottom nav is fixed and visible
- Touch targets ≥ 44px

- [ ] **Step 5: Commit**

```bash
git add public/manifest.json && git commit -m "feat: add PWA manifest and final integration polish"
```

---

## Summary

| Task | Content | Files Created |
|:-----|:--------|:--------------|
| 1 | Project Scaffold | 8 config files |
| 2 | Design Tokens | 1 CSS file |
| 3 | TypeScript Types | 1 types file |
| 4 | Utility Functions | 1 utils file |
| 5 | UI Components | 6 files (ProgressRing, StatBadge, MetricCard, Skeleton, Badge, barrel) |
| 6 | Layout Components | 5 files (BottomNav, PageHeader, CategoryPills, AppShell, barrel) |
| 7 | Stores & Hooks | 6 files (3 stores, 3 hooks) |
| 8 | MSW Mock Data | 8 files (3 data, 4 handlers, 1 browser) |
| 9 | App Entry & Router | 3 files (main.tsx, App.tsx, EmptyTab) |
| 10 | HomeScreen Dashboard | 8 files (1 screen, 7 components, barrel) |
| 11 | ExerciseScreen | 5 files (2 screens, 2 components, barrel) |
| 12 | ProfileScreen | 8 files (3 screens, 4 components, barrel) |
| 13 | Final Polish | 1 file (manifest) |

**Total: ~60 files** across the project.
