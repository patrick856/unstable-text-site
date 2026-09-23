import { createFileRoute } from "@tanstack/react-router";
import { Check, Clipboard, ExternalLink, Github, Package, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { AmbientGlitch, type EffectName } from "unstable-text";

import { Button } from "@/components/ui/button";

const NPM_URL = "https://www.npmjs.com/package/unstable-text";
const GITHUB_URL = "https://github.com/patrick856/unstable-text";
const RED = "#ff0055";

const demos: Array<{ label: string; effect: EffectName; text: string; config: string }> = [
  { label: "CORRUPT_CHAR", effect: "corruptChar", text: "SIGNAL INTEGRITY: 71.4%", config: "trigger(el, 'corruptChar', { duration: 1800 })" },
  { label: "BLIP_CHAR", effect: "blipChar", text: "PACKET GHOST DETECTED", config: "trigger(el, 'blipChar', { duration: 2800 })" },
  { label: "SLOW_DECRYPT", effect: "fullScramble", text: "UNSEAL THE TRANSMISSION", config: "trigger(el, 'fullScramble', { speedMultiplier: 1.7 })" },
  { label: "WORD_SWAP", effect: "swapWords", text: "WORDS REFUSE STABLE ORDER", config: "trigger(el, 'swapWords', { duration: 2200 })" },
  { label: "JITTER_PULSE", effect: "jitterChar", text: "SIGNAL PHASE UNLOCKED", config: "trigger(el, 'jitterChar', { duration: 2400 })" },
];

const quickStart = `import { AmbientGlitch } from 'unstable-text';

const scheduler = new AmbientGlitch.Scheduler({
  container: document.querySelector('#signal'),
  speedMultiplier: 'FAST'
});
scheduler.start();`;

const manualStart = `AmbientGlitch.trigger(element, 'neonColorChar', {
  neonColor: '#ff0055',
  glowIntensity: 'intense'
});`;

function CopyButton({ value, label = "Copy code" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement("textarea");
      input.value = value;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }, [value]);
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className="!h-8 !w-8 !p-0 shrink-0 rounded-sm border border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal)] shadow-[0_0_10px_var(--signal-soft)]"
    >
      {copied ? <Check /> : <Clipboard />}
    </Button>
  );
}

function useAmbient(ref: RefObject<HTMLElement | null>, effects: Partial<Record<EffectName, number>>, interval: [number, number]) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const scheduler = new AmbientGlitch.Scheduler({
      container,
      minInterval: interval[0],
      maxInterval: interval[1],
      nodeCooldown: 1700,
      maxConcurrent: 1,
      speedMultiplier: "FAST",
      neonColor: RED,
      glowIntensity: "intense",
      neonGlitchChance: 0.45,
      effects,
    });
    scheduler.start();
    return () => scheduler.destroy();
  }, [effects, interval, ref]);
}

function DemoCard({ demo, index }: { demo: (typeof demos)[number]; index: number }) {
  const target = useRef<HTMLParagraphElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = box.current;
    if (!container) return;
    const scheduler = new AmbientGlitch.Scheduler({
      container,
      minInterval: 1300 + index * 180,
      maxInterval: 2600 + index * 220,
      nodeCooldown: 1200,
      maxConcurrent: 1,
      neonColor: RED,
      glowIntensity: "intense",
      effects: { [demo.effect]: 1 },
    });
    scheduler.start();
    return () => scheduler.destroy();
  }, [demo.effect, index]);

  const run = () => {
    if (!target.current) return;
    const shared = { neonColor: RED, glowIntensity: "intense" as const };
    const options = demo.effect === "fullScramble"
      ? { ...shared, speedMultiplier: "SLOW" as const }
      : {
          ...shared,
          duration: demo.effect === "corruptChar"
            ? 1800
            : demo.effect === "blipChar"
              ? 2800
              : demo.effect === "swapWords"
                ? 2200
                : 2400,
          speedMultiplier: "FAST" as const,
        };
    void AmbientGlitch.trigger(target.current, demo.effect, options);
  };

  return (
    <article className="demo-card" ref={box}>
      <div className="demo-meta"><span>0{index + 1}</span><span>{demo.label}</span></div>
      <button className="demo-stage" onClick={run} aria-label={`Replay ${demo.label} effect`} title="Replay effect">
        <span ref={target} data-glitch-effects={demo.effect}>{demo.text}</span>
        <Play aria-hidden="true" />
      </button>
      <div className="code-strip"><code>{demo.config}</code><CopyButton value={demo.config} /></div>
    </article>
  );
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const breakRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const numberNode = numberRef.current;
    const breakNode = breakRef.current;
    if (!numberNode || !breakNode) return;

    const numberScheduler = new AmbientGlitch.Scheduler({
      container: numberNode,
      minInterval: 900,
      maxInterval: 2200,
      nodeCooldown: 700,
      maxConcurrent: 1,
      speedMultiplier: "FAST",
      neonColor: RED,
      effects: { fullScramble: 1 },
    });
    const breakScheduler = new AmbientGlitch.Scheduler({
      container: breakNode,
      minInterval: 1300,
      maxInterval: 2800,
      nodeCooldown: 900,
      maxConcurrent: 1,
      speedMultiplier: "FAST",
      neonColor: RED,
      effects: { corruptChar: 1 },
    });
    numberScheduler.start();
    breakScheduler.start();
    return () => {
      numberScheduler.destroy();
      breakScheduler.destroy();
    };
  }, []);

  return (
    <p className="section-marker">
      <span ref={numberRef} data-glitch-effects="fullScramble">{number}</span>
      <span ref={breakRef} className="section-break" data-glitch-effects="corruptChar" aria-hidden="true">�</span>
      <span>{label}</span>
    </p>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "unstable-text — Ambient text-scramble effects for the web" },
      { name: "description", content: "A lightweight npm library for zero-reflow ambient text-scramble, glitch, decrypt, and neon effects." },
      { property: "og:title", content: "unstable-text — Ambient text-scramble effects" },
      { property: "og:description", content: "A lightweight npm library for zero-reflow ambient glitch effects. See every effect running live." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const hero = useRef<HTMLDivElement>(null);
  const chunk = useRef<HTMLDivElement>(null);
  useAmbient(hero, { microChars: 2, corruptChar: 1, neonColorChar: 3 }, [650, 1500]);
  useAmbient(chunk, { microWords: 2, blipChar: 2, shiftHoldChar: 1 }, [1800, 3800]);

  return (
    <main className="site-shell">
      <div className="scan-field" aria-hidden="true" />
      <header className="hero-section" ref={hero}>
        <div className="system-bar"><span className="status-dot" /> <span>SIGNAL ONLINE</span><span className="system-index">UT / 0.1.0</span></div>
        <div className="hero-copy">
          <p className="eyebrow">ZERO-REFLOW AMBIENT TEXT ENGINE</p>
          <h1 data-glitch-effects="microChars,corruptChar,neonColorChar">unstable-text</h1>
          <p className="lede">Text that refuses to sit still. Add ambient scramble, decrypt, corruption, and neon signal noise to any interface.</p>
        </div>
        <div className="hero-actions">
          <div className="install-command"><span className="prompt">$</span><code>npm install unstable-text</code><CopyButton value="npm install unstable-text" label="Copy install command" /></div>
          <div className="link-row">
            <Button asChild variant="signal" size="lg"><a href={GITHUB_URL} target="_blank" rel="noreferrer"><Github /> View on GitHub</a></Button>
            <Button asChild variant="outlineSignal" size="lg"><a href={NPM_URL} target="_blank" rel="noreferrer"><Package /> View on npm</a></Button>
          </div>
        </div>
        <div className="hero-readout" aria-hidden="true"><span>AMBIENT MODE</span><span>09 EFFECTS</span><span>0PX SHIFT</span></div>
      </header>

      <section className="section showcase-section" aria-labelledby="showcase-title">
        <div className="section-heading"><SectionMarker number="01" label="LIVE SIGNALS" /><h2 id="showcase-title">Every sample is running now.</h2><span>Click any signal to fire it again.</span></div>
        <div className="demo-grid">{demos.map((demo, index) => <DemoCard key={demo.effect} demo={demo} index={index} />)}</div>
      </section>

      <section className="atmosphere" aria-label="Ambient signal logs" ref={chunk}>
        <div className="data-chunk chunk-a" data-glitch-effects="microWords,blipChar">// RX.04 NODE:NULL  SIGNAL/TRACE<br/>▓▒░ channel drift detected at 03:17:44<br/>RECONSTRUCTING WORD BOUNDARIES<br/>latency: 004ms / integrity: uncertain</div>
        <div className="signal-mark" aria-hidden="true">UN/<span>STABLE</span></div>
        <div className="data-chunk chunk-b" data-glitch-effects="shiftHoldChar,corruptChar">MEMORY SECTOR 0x7F<br/>DO NOT NORMALIZE THE MESSAGE<br/>[██████░░░] CARRIER LOCK<br/>the text remembers another shape</div>
      </section>

      <section className="section usage-section" aria-labelledby="usage-title">
        <div className="section-heading"><SectionMarker number="02" label="QUICK START" /><h2 id="usage-title">A few lines. Then let it drift.</h2><a href={`${GITHUB_URL}#readme`} target="_blank" rel="noreferrer">Full README <ExternalLink /></a></div>
        <div className="code-grid">
          <div className="code-panel"><div className="panel-top"><span>ambient.js</span><CopyButton value={quickStart} /></div><pre><code>{quickStart}</code></pre></div>
          <div className="code-panel"><div className="panel-top"><span>manual-trigger.js</span><CopyButton value={manualStart} /></div><pre><code>{manualStart}</code></pre></div>
        </div>
      </section>

      <section className="section customize-section" aria-labelledby="customize-title">
        <div className="section-heading"><SectionMarker number="03" label="TUNE THE NOISE" /><h2 id="customize-title">Controlled instability.</h2></div>
        <div className="feature-list">
          {[['SPEED', 'Five presets from VERY_FAST to VERY_SLOW.'], ['WEIGHTS', 'Shape the mix by weighting individual effects.'], ['NEON', 'Preset or custom colors with adjustable glow intensity.'], ['OVERRIDES', 'Use data-glitch-* attributes on individual elements.'], ['MOTION', 'Reduced-motion preferences are respected automatically.']].map(([title, copy], index) => (
            <div className="feature-row" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand" data-glitch-effects="neonColorChar">unstable-text<span aria-hidden="true">_</span></div>
        <div className="footer-links"><a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a><a href={NPM_URL} target="_blank" rel="noreferrer">npm</a><span>MIT License</span></div>
        <p>Built by Patrick Marcus</p>
      </footer>
    </main>
  );
}
