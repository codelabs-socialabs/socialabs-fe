# Legacy Word Cloud Design

## Goal

Restore sentiment page word cloud visual from commit `4e6f9bf` while retaining live API word-frequency data.

## Scope

- Keep `@isoterik/react-word-cloud` at existing version.
- Use `useWordCloud` to compute layouts and manually render SVG text.
- Preserve legacy 400x300 layout, Inter font, weight tiers, rectangular spiral, padding, fixed random seed, rotation mix, sentiment color palettes, hover dimming, and mention tooltip.
- Continue mapping `GET /sentiments/word-frequency` data into `Word[]`.
- Representative-post tab state must not be passed to word cloud or influence its layout.

## Data Flow

`useWordFrequency` returns positive and negative word-frequency items. Page maps each item to `{ text, value }`. Each cloud receives only its words and sentiment type. Representative-post tabs only select documents from `sentimentResult.documents`.

## Error Handling

- Empty word list shows existing empty-state copy.
- Failed word-frequency request hides word-cloud section as current behavior.

## Verification

- Source-contract regression check verifies word cloud receives `words` and `type`, not active representative tab state.
- `bun lint` passes.
- Page renders word clouds with API data; toggling Positive/Negative representative posts does not change cloud layout.
