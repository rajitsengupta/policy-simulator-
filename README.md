# GEM-India Dashboard
### India Green Economy Model · Climate Policy Analysis Dashboard
**WRI India & KnowlEdge Srl · v2.0**

Live prototype: **https://gem-india-dashboard.vercel.app**

---

## Overview

An interactive policy simulation dashboard built on the GEM-India system-dynamics model. Users can explore how India's climate and development policies play out across jobs, energy, forests and GDP from 2025 to 2070 — across three scenarios (BAU, MNR, Net Zero 2070).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| State management | Zustand |
| Routing | React Router v7 |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/       # FeaturedGraph, SmallGraph, ScenarioPanel, GraphSection, CompareMode
│   ├── layout/          # TopNav, SubNav
│   ├── shared/          # Toast, GlossaryTerm, OnboardingOverlay, LoginModal, DataTable
│   └── sliders/         # PolicyLevers, SliderGroup, SliderItem, ToggleItem
├── data/
│   ├── graphs.js        # ← All graph metadata (id, name, unit, category)
│   ├── gemData.js       # ← Real & synthetic model data + SYNTHETIC_GRAPHS set
│   ├── sliders.js       # ← All 46 policy lever definitions
│   ├── scenarios.js     # ← BAU / MNR / NZ scenario colours and labels
│   ├── glossary.js      # ← Glossary term definitions
│   └── sensitivity.js   # ← Sensitivity / impact labels per lever
├── pages/
│   ├── LandingPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProjectionsPage.jsx
│   ├── ScenariosPage.jsx
│   └── MethodologyPage.jsx
├── store/
│   └── sliderStore.js   # Zustand store — slider values, active scenario, reset
└── utils/
    ├── modelProxy.js    # ← Chart data builder (real + synthetic baselines)
    └── shareScenario.js # URL serialisation for scenario sharing
```

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
```

---

## How to Wire in Real Model Data

All dummy data lives in two files. Replace them with real GEM-India model outputs:

### 1. `src/data/gemData.js`

Add real scenario arrays to `REAL_DATA` for each graph ID:

```js
export const REAL_DATA = {
  gdp_growth: {
    BAU: [7.9, 7.9, 6.7, 5.5, 4.6, 3.9, 3.1, 2.4, 1.7, 1.2],  // 2025–2070 (10 values)
    MNR: [9.5, 9.5, 8.7, 7.5, 6.5, 5.8, 4.7, 3.7, 2.7, 1.8],
    NZ:  [9.7, 9.7, 8.7, 7.4, 6.4, 5.7, 4.6, 3.6, 2.6, 1.7],
  },
  co2_sectoral: { BAU: [...], MNR: [...], NZ: [...] },
  // ... one entry per graph id
}
```

**Years are fixed:** `[2025, 2030, 2035, 2040, 2045, 2050, 2055, 2060, 2065, 2070]` — 10 values per array.

### 2. Remove graph IDs from `SYNTHETIC_GRAPHS`

Once a graph has real data in `REAL_DATA`, remove its ID from the `SYNTHETIC_GRAPHS` set at the bottom of `gemData.js`. The model proxy will automatically use real data for it.

### 3. `src/utils/modelProxy.js`

`SLIDER_IMPACT` maps graph IDs to the slider keys that affect them. Add entries here to make sliders dynamically adjust real-data graphs:

```js
const SLIDER_IMPACT = {
  co2_sectoral: ['coal_electrified', 'carbon_price_mnr', 'switch_ccs'],
  // ...
}
```

---

## Graph Categories & IDs

71 graphs across 6 categories. Full list in `src/data/graphs.js`.

| Category | Count |
|---|---|
| Economic | 33 |
| Energy | 17 |
| Environmental | 14 |
| Public Finance | 8 |
| Social | 7 |
| Natural Resources | 14 |

---

## Policy Levers

46 levers across 8 groups defined in `src/data/sliders.js`. Each lever has:
- `id`, `name`, `description`
- `min`, `max`, `defaultValue`, `step`
- `unit`, `isToggle`

---

## Scenarios

| Key | Label | Description |
|---|---|---|
| `BAU` | Business as Usual | No new policies beyond what exists today |
| `MNR` | Managing Natural Resources | Sustainable farming, agroforestry, moderate carbon pricing |
| `NZ` | Net Zero 2070 | Deep decarbonisation — hydrogen, CCS, full renewable transition |

---

## Deployment

```bash
npx vercel --prod
```

Deploys to: **https://gem-india-dashboard.vercel.app**

---

## References

Golechha, Raman, Srivastava, Bassi, Pallaske, Cholayil & Dayal (2021).
*A green economy model for India.* WRI India Technical Note.
doi.org/10.46830/writn.21.00033.v2
