# Glitch Landing

unstable-text — Landing Site Spec

A single-page landing site for unstable-text, an npm library that adds ambient text-scramble/glitch effects to any website. The site's main job is to be the demo — the effect should run live on the page itself, not just be described.

This site IS the official site for the unstable-text npm package (published on npm, source on GitHub). If the build environment supports installing npm packages, install unstable-text directly (npm install unstable-text) and use its actual exported API (AmbientGlitch.Scheduler, AmbientGlitch.trigger, etc.) to power every glitch effect on this page — including the hero headline, the showcase blocks, and the text chunks — rather than reimplementing the effect from scratch. This site should be a real, working consumer of the published package, not just a visual mockup of it.

Visual direction

Palette: black background, white text/UI, red as the single accent color. No other colors except the neon glow treatment below.

Neon glow: reuse the same glow style as the library's neonColorChar effect — layered text-shadow (soft/medium/wide blur layers) in red and white, so glitching text and key UI accents look like they're genuinely lit up, not just colored.

Mood: dark space / control-room / terminal-at-night. Very dark, high-contrast, a few bright neon focal points rather than even lighting across the page.

Background: an abstract moving background — horizontal glowing white lines slowly drifting/scanning across a black field, like scan-lines or a signal readout. Subtle motion, not distracting; should read as ambient atmosphere behind the content, not the main visual event.

Text chunks: include a few standalone "chunks" of dense/odd text (paragraph-shaped blocks, almost like data readouts or corrupted logs) placed as design elements, not just body copy. These should be glitch-effect-eligible (marked so the library can target them, e.g. data-glitch attributes) — some may be manually glitched/edited by hand rather than left to the ambient scheduler.

Typography: monospace or a technical-feeling font for code/headline elements fits the vibe; keep body copy readable (don't overdo monospace everywhere).

Site structure (single page, sections in this order)

1. Hero

Large headline that is itself running the glitch effect live and continuously (ambient scheduler active on this element specifically).

One-line description of what the library does.

Install command displayed prominently: npm install unstable-text (with a copy-to-clipboard button).

Two buttons: "View on GitHub" and "View on npm".

2. Live effect showcase

A grid or row of 3–5 example blocks, each demonstrating a different effect/preset (e.g. corrupt-char, blip, slow decrypt, word-swap, neon color glitch).

Each block: the effect running live + a small label naming which effect it is + a "copy code" snippet showing the exact config used to produce it.

3. Odd text chunks (design/atmosphere section)

2–3 placed blocks of dense, glitchy-looking text used as visual texture rather than explanation — some ambient-glitching, some static/manually styled to look corrupted.

These can sit alongside or behind other sections rather than being a strictly separate full section — treat as flexible design elements.

4. Quick start / usage

Minimal code example: import, construct scheduler, call .start().

Second example: manual trigger API.

Keep this short — link to the full README on GitHub for complete docs rather than reproducing everything here.

5. Customization highlights

Short highlight list (not full docs) of the main things developers can configure: speed presets, effect weights, neon colors, data-glitch-* per-element overrides, reduced-motion support.

6. Footer

GitHub link, npm link, license, "built by Patrick Marcus / SilentRose Studio" credit line.

Interaction notes

The whole page should feel alive at rest — ambient glitches firing occasionally on the hero and showcase blocks even if the visitor doesn't do anything — since that's the actual product being sold.

Keep animations respectful of prefers-reduced-motion — same standard the library itself follows.

Site should be a single static page, no navigation menu needed (short scroll, all sections above).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/369bc2b5-1606-4851-ac88-b84547e14c33).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
