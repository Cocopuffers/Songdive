# SongDive — Daily Seven (prototype)

A static, mobile-friendly playable prototype. No installation or API keys needed.

## Run locally
Open `index.html` in a browser.

## Publish using GitHub Pages
1. Create a new public GitHub repository (e.g. `songdive`).
2. Upload `index.html`, `style.css`, and `script.js` to the repository root and commit.
3. In repository Settings → Pages, select **Deploy from a branch**, branch `main`, folder `/ (root)` and Save.
4. Wait for the Pages deployment, then visit the URL shown in Settings → Pages.

## What is implemented
- Seven deterministic daily prompts from a small demo pool
- 20-second timer per round
- Autocomplete from 30 hand-curated sample tracks
- Four demo scoring tiers: 25, 40, 65, 90 points (maximum 630)
- Shareable final score via copy button

## Important limitations before real launch
- Scoring is **not** based on real player rarity yet: it uses deterministic alphabetical ranking within eligible demo songs solely to demonstrate four tiers.
- Song catalog is tiny, and not exhaustive. Metadata and prompt validations require broader verification.
- No backend, user accounts, leaderboard, payments, abuse prevention, or reliable cross-device daily submission limit.
- Songs, release dates, and eligibility should be audited before production use.
- Song lyrics and music playback require rights/licensing checks.
