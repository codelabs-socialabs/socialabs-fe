# Legacy Word Cloud Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore previous sentiment word-cloud rendering while retaining API word-frequency input and independent representative-post tabs.

**Architecture:** Keep word-frequency fetch and page-level word mapping unchanged. Replace direct package component with local SVG renderer driven by `useWordCloud`; renderer input remains `words` and `type` only. `activeTab` remains exclusive to representative documents.

**Tech Stack:** React 19, TypeScript, `@isoterik/react-word-cloud`, Tailwind CSS.

## Global Constraints

- Do not add dependencies.
- Use live `useWordFrequency` data.
- Preserve legacy 400x300 layout, palette, tooltip, hover behavior, layout settings.
- Do not pass representative-post tab state to word cloud.

---

### Task 1: Restore Legacy Renderer

**Files:**
- Modify: `src/components/pages/project/project-sentiment-page.tsx:12-14, 181-188, 433-450`
- Test: inline source-contract command

**Interfaces:**
- Consumes: `Word[]` built from `useWordFrequency` response.
- Produces: `CustomWordCloud({ words: Word[]; type: 'positive' | 'negative' })`.

- [ ] **Step 1: Write failing source-contract check**

Run:

```powershell
bun --eval "import { readFileSync } from 'node:fs'; const s = readFileSync('src/components/pages/project/project-sentiment-page.tsx', 'utf8'); if (!s.includes('const { computedWords } = useWordCloud')) throw new Error('legacy word-cloud renderer missing'); if (s.includes('activeTab={activeTab}') || s.includes('activeTab,') && s.includes('CustomWordCloud')) throw new Error('representative tab leaked into word cloud');"
```

Expected: FAIL with `legacy word-cloud renderer missing`.

- [ ] **Step 2: Restore imports and legacy renderer**

Replace direct `WordCloud` import with `defaultFontSize` and `useWordCloud`. Restore `CustomWordCloud` from commit `4e6f9bf`: stateful hover tooltip, fixed 400x300 SVG, five-color palette per sentiment, `resolveFontWeight`, `resolveRotate`, `resolveRandom`, and `useWordCloud` settings `spiral: 'rectangular'`, `padding: 5`, `timeInterval: 1`.

Use API-backed page data:

```tsx
<CustomWordCloud words={positiveWords} type="positive" />
<CustomWordCloud words={negativeWords} type="negative" />
```

- [ ] **Step 3: Run source-contract check**

Run command from Step 1.

Expected: exit 0.

- [ ] **Step 4: Run lint**

Run: `bun lint`

Expected: exit 0.

- [ ] **Step 5: Commit**

```powershell
git add src/components/pages/project/project-sentiment-page.tsx docs/superpowers/specs/2026-08-10-legacy-word-cloud-design.md docs/superpowers/plans/2026-08-10-legacy-word-cloud.md
```
