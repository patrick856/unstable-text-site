# Build the unstable-text official landing site

## What will be built
- Replace the placeholder with one polished, single-page live demo for the npm package.
- Install and use the published `unstable-text` package for the headline, examples, atmospheric text, and manual triggers.
- Follow the requested black, white, and red control-room visual direction with drifting scan lines and layered neon glow.
- Add the install command with copy feedback, GitHub/npm links, five live effect examples with copyable configurations, quick-start code, customization highlights, and the creator/license footer.
- Respect reduced-motion preferences and make the layout work cleanly on mobile and desktop.

## Technical details
- Create a client-side glitch controller around the package's actual `AmbientGlitch.Scheduler` and `AmbientGlitch.trigger` APIs.
- Keep all palette, glow, typography, spacing, and motion values in the shared design system.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify the live page, copy interactions, package-powered effects, reduced-motion behavior, and responsive layout in the browser.
