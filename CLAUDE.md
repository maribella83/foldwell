# CLAUDE.md — Foldwell

## What this project is
A parent-first mobile app (iPhone first, Android later). Each child has a container: a Note Box for ages 4–8 and a Notebook for ages 9+. Parents write, photograph, or record notes for their children, and optionally run a gentle back-and-forth with tweens and teens. Children can reply with stickers and doodles. Everything collects into a keepsake that can be printed. Read `Notes-App-Build-Blueprint.md` for the full plan.

Company: CircleRootTech LLC. Founder: Maribel.

## About the developer (IMPORTANT)
Maribel has been shipping Expo apps since May 2026: she uses Expo Go, builds with EAS, and has published to App Store Connect and Google Play. She is still learning, so skip basics she already knows (Expo Go, QR codes, running the dev server, store submission) but explain anything new or less common in plain language. When working with her:
- Define unfamiliar terms the first time you use them.
- Explain what and why before showing code.
- Give full file replacements, not partial diffs or "change this line" instructions.
- Work in small steps and have her verify each one (run it, see it work) before moving on.
- Be direct and honest. If an approach is risky or a bad idea, say so.
- Never run commands that delete files, change git history, or install many packages without explaining first and asking.

## Current phase
**Building has started (decision made by Maribel, October 2026).** The paper test with real families runs in parallel and does not block building. See `Kickoff-Plan.md`.

Rules for building now:
- Build the cheap, reversible parts first: project setup, static screens with fake data, branding, and the website.
- Hold the expensive parts (audio, doodles, stickers logic, print ordering, backend) until Maribel says paper-test and prototype feedback is in. Ask before starting them.
- Do not over-invest in later phases. Features may change after the paper test.
- The app is named **Foldwell** (chosen October 2026 after a USPTO search and domain check; the earlier working name "Passing Notes" was taken). iOS bundle ID and Android package: `com.circleroottech.foldwell`. Domain: foldwellnotes.com. Social: @foldwellnotes on Instagram and TikTok. The name lives in `mobile/src/constants/app.ts` and `mobile/app.json`; screens read it from the constants file, never hardcode it.

Current step: Phase 1, Foundation (Blueprint Section 10).

## Tech stack
- Expo (React Native) with TypeScript
- Expo Router for navigation
- Expo SQLite for on-device storage
- expo-image-picker, expo-print, expo-sharing, expo-secure-store
- react-native-svg (box, notebook, stickers, doodle lines), react-native-gesture-handler (finger drawing), react-native-view-shot (turn a doodle into an image for printing)
- expo-audio (parent audio notes). react-native-reanimated for animation (later). Video (expo-camera, expo-video) is v2 only.
- Consider @shopify/react-native-skia only if react-native-svg is too slow for drawing; check Expo compatibility before adding.
- No backend server in v1

## Non-negotiable rules
1. **Parent is the only account holder.** Children never create accounts.
2. **Children do not type text, record voice or video, or take photos in the app.** Children may only tap stickers and draw doodles, inside the PIN-protected kid view.
3. **All data stays on the device in v1.** No cloud, no servers receiving child data.
4. **Store only:** child nickname and age band. Never store full names, birthdates, photos of children, schools, or locations.
5. **No ads, no third-party analytics or tracking SDKs, no data selling.** Do not add any package that collects usage data without Maribel's explicit approval.
6. **No streaks, points, badges, counts, read receipts, "seen" markers, or guilt messages.** No earned or unlockable stickers. Never sell anything to a child; nothing purchasable is reachable from the kid view.
7. **Do not read, analyze, or summarize a young person's writing or drawings** with AI or any automated tool.
8. **Consent gate:** anything written or drawn by a tween or teen is included in a printed book or shared only with that young person's explicit yes.
9. **Recordings:** only parents record. Cap each recording at about 2 minutes and check device storage before saving.
10. Always explain why the app asks for camera or microphone permission, in kind, plain wording.
11. All sticker, cover, and prompt art must be original or licensed. Never use characters, brands, or internet images. Sticker art may later be sold as physical stickers, so use only art Maribel owns or has rights to for resale (do not use stock elements without confirming the license allows it). Create sticker art as vector or high-resolution files.
12. Do not add features outside the current phase.

## Design direction
- **Ages 4–8, Note Box:** kraft-colored box with soft-colored envelopes. Tap to open. Big picture, large friendly text, large play button for the parent's voice. Reply with a feeling sticker, a doodle, or "Draw back" on paper. Targets at least 56 points, no wrong taps, no timers, no typing. Built for a child and parent looking at one screen. Hold-to-leave "Grown-ups" gate.
- **Ages 9+, Notebook (one idea, two looks):** black-and-white marbled composition-notebook cover with a label. Notes are sticky notes, folded notes, and Polaroid-style photos of handwritten notes.
  - **Look B, Soft Collage (default for about 9-13):** pastel sticky notes, tape, Polaroid photos, floating pill toolbar.
  - **Look A, Oat and Ink (default for about 14+):** oat paper, dot grid, thin ink borders, monospace labels, muted sage and clay, small icon toolbar.
  - Build the look as a **theme** (colors, fonts, paper style, toolbar style) so the young person can switch looks, and an optional dark mode can be added. Do not hardcode colors in screens; read them from the theme file. Privacy rules stay tied to the legal age bands (under 13 and 13+), not to the look.
  - Look B palette: #F2F5F1, #F7EBC4, #E7B9A6, #B9CFE0, #FFFFFF, ink #2C2C2A. Look A palette: #F4EFE6, #2C2C2A, #A8C3B1, #E8EFE9, #D4CCBB, #FFFDF8.
- **Stickers:** ages 4–8 get about 12 big feeling stickers (tap to choose, tap to stamp). Ages 9+ get a smaller, cooler set including word stickers ("same," "thank you," "me too," "not now," "can we talk later?"). Dragging, resizing, and rotating stickers is v2.
- **Doodles:** ages 4–8 get big finger drawing, 6–8 colors, 2 brush sizes, undo, and a confirm before clearing. Ages 9+ get a pen, highlighter, and more colors. Store a doodle as line points; export an image only for printing.
- Colors (starting point): paper #FBFAF6, kid background #FFF7EC, parent note #FAEEDA, folded note #E1F5EE, reply #FBEAF0, kraft #C9A06B, charcoal buttons #2C2C2A.
- What you see in the app should match what prints.
- Respect reduced-motion settings. Label every button for screen readers. Choose doodle colors that are distinguishable for color-blind users.
- Warm, calm, paper-like. Bilingual-ready (English/Spanish) content design.

## How to start a session
1. Read this file and the Blueprint.
2. Ask Maribel which phase and step she is on.
3. Confirm the plan in plain language, then proceed one step at a time.

## Out of scope early
Physical sticker products (digital stickers only for now), kid accounts, child text entry, child voice or photo, in-app parent-child chat, read receipts, streaks or points, earned or sold stickers, AI analysis of writing or drawings, cloud backup (until legal review), video, time capsule, dragging/resizing stickers, animations, print-on-demand ordering (until v2).
