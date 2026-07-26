/* ============================================================================
   eaglesimbeye scroll-motion engine — standalone framework-free port of the
   Claude-Design "DCLogic" Component from Home.dc.html.

   Requires, loaded globally BEFORE this file, in this order:
     1. Lenis        1.1.20   (window.Lenis)
     2. gsap         3.13.0   (window.gsap)
     3. ScrollTrigger 3.13.0  (window.ScrollTrigger)
     4. SplitText    3.13.0   (window.SplitText)

   Effects, selectors, timings, easings and numeric constants are copied
   verbatim from the source Component. DCLogic lifecycle removed; instance
   fields lifted to IIFE-scope vars/functions. Globals window.__eesLenis and
   window.__eesEngine are preserved.
   ========================================================================= */
(function () {
  'use strict';

  /* was this.props (DCLogic-injected) */
  var props = { wordmarkFont: "Rockybilly", accentColor: "#f2ea36", motionIntensity: 1 };

  /* instance fields → IIFE-scope vars */
  var raf, bootStart, tweens, triggers, stopEngine, stopLenis, clearIdle, onLoad;

  /* track only the ScrollTriggers this component creates */
  function keep(tween) {
    tweens.push(tween);
    var st = tween.scrollTrigger;
    if (st) triggers.push(st);
    return tween;
  }

  function boot(tries) {
    tries = tries || 0;
    const reduceEarly = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const g = window.gsap;
    if (!g || !window.ScrollTrigger) {
      if (tries === 0) bootStart = Date.now();
        // poll against the clock: a slow CDN must never permanently abandon the boot
        if (Date.now() - (bootStart || 0) < 20000) raf = requestAnimationFrame(() => boot(tries + 1));
      return;
    }
    g.registerPlugin(window.ScrollTrigger);

    /* ── one lerped scroll for the entire document: this is what makes it feel fluid ── */
    if (window.Lenis && !reduceEarly()) {
      if (window.__eesLenis) { window.__eesLenis.destroy(); }
      const lenis = new window.Lenis({
        duration: 1.15,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true, syncTouch: false, autoRaf: false
      });
      window.__eesLenis = lenis;
      lenis.on('scroll', window.ScrollTrigger.update);
      const lenisRaf = time => lenis.raf(time * 1000);
      g.ticker.add(lenisRaf);
      g.ticker.lagSmoothing(0);
      stopLenis = () => { g.ticker.remove(lenisRaf); lenis.destroy(); if (window.__eesLenis === lenis) window.__eesLenis = null; };
    }
    g.defaults({ ease: 'power2.out' });
    window.ScrollTrigger.config({ ignoreMobileResize: true });
    if (window.SplitText) g.registerPlugin(window.SplitText);

    const root = document;
    const q = s => Array.from(root.querySelectorAll(s));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    tweens = [];
    triggers = [];

    const accent = props.accentColor || '#f2ea36';

    /* the wordmark face is switchable: brush scripts differ enough in metrics that each
       carries its own size and tracking rather than sharing one set */
    const faces = {
      'Rockybilly': { stack: "'Rockybilly', cursive", hero: '22vw', nav: '34px', track: '0', lh: 0.82, upper: 'lowercase' },
      'Sedgwick Ave Display': { stack: "'Sedgwick Ave Display', cursive", hero: '19vw', nav: '28px', track: '0.01em', lh: 0.92, upper: 'uppercase' },
      'Permanent Marker': { stack: "'Permanent Marker', cursive", hero: '18vw', nav: '27px', track: '0.005em', lh: 0.95 },
      'Caveat Brush': { stack: "'Caveat Brush', cursive", hero: '22vw', nav: '32px', track: '0.02em', lh: 0.86 },
      'Rubik Spray Paint': { stack: "'Rubik Spray Paint', cursive", hero: '17vw', nav: '25px', track: '0.02em', lh: 1 }
    };
    const face = faces[props.wordmarkFont] || faces['Rockybilly'];
    if (props.wordmarkFont) {
      const m = root.querySelector('[data-mark]'), nm = root.querySelector('[data-nav-mark]');
      const common = { fontFamily: face.stack, letterSpacing: face.track, lineHeight: face.lh, textTransform: face.upper || 'uppercase' };
      if (m) g.set(m, Object.assign({ fontSize: face.hero }, common));
      if (nm) g.set(nm, Object.assign({ fontSize: face.nav }, common));
    }
    const intensity = props.motionIntensity ?? 1;
    const SCRUB = 1.2; // single smoothing constant: every scrubbed trigger derives from it

    /* ── word-split helper (SplitText if present, manual otherwise) ── */
    const words = (el, stable) => {
      if (window.SplitText && window.SplitText.create && !stable) {
        let out = [];
        window.SplitText.create(el, {
          type: 'words', wordsClass: 'w', autoSplit: true,
          onSplit: self => { out = self.words; return null; }
        });
        return out;
      }
      if (window.SplitText) return new window.SplitText(el, { type: 'words', wordsClass: 'w' }).words;
      // stable path: plain spans, class .w, never re-split
      const parts = el.textContent.split(/(\s+)/);
      el.textContent = '';
      const out = [];
      parts.forEach(p => {
        if (/^\s+$/.test(p)) { el.appendChild(document.createTextNode(p)); return; }
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = p;
        s.style.display = 'inline-block';
        el.appendChild(s);
        out.push(s);
      });
      return out;
    };

    /* ── HERO: video holds, the monogram travels vertically, the mosaic assembles ── */
    const hero = root.querySelector('[data-hero]');
    const mark = root.querySelector('[data-mark]');
    const navMark = root.querySelector('[data-nav-mark]');
    const stage2 = root.querySelector('[data-hero-stage2]');
    const scrim = root.querySelector('[data-hero-scrim]');
    const video = root.querySelector('[data-reel-video]');
    const tiles = q('[data-tile]');

    /* ── showreel: autoplay muted, but always pausable, and paused by default under reduced motion ── */
    const reelToggle = root.querySelector('[data-reel-toggle]');
    const reelLabel = root.querySelector('[data-reel-label]');
    const reelGlyph = root.querySelector('[data-reel-glyph]');
    const setReel = playing => {
      if (reelLabel) reelLabel.textContent = playing ? 'Pause reel' : 'Play reel';
      if (reelToggle) reelToggle.setAttribute('aria-label', playing ? 'Pause showreel' : 'Play showreel');
      if (reelGlyph) g.set(reelGlyph, playing
        ? { width: 7, borderLeftWidth: 2, borderRightWidth: 2, borderRadius: 0 }
        : { width: 0, borderLeftWidth: 8, borderRightWidth: 0, borderRadius: 0 });
    };
    if (video) {
      video.muted = true;
      // the element is the single source of truth: blocked autoplay can never mislabel the control
      video.addEventListener('play', () => setReel(true));
      video.addEventListener('pause', () => setReel(false));
      setReel(!video.paused);
      if (reduce) video.pause();
      else { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
      if (reelToggle) reelToggle.addEventListener('click', () => {
        if (video.paused) { const p = video.play(); if (p && p.catch) p.catch(() => {}); } else video.pause();
      });
    }

    const h1 = root.querySelector('[data-hero-copy] h1[data-split]');
    if (h1 && !reduce) {
      g.set(h1, { overflow: 'hidden', paddingBottom: '0.12em' });
      tweens.push(g.from(words(h1), {
        yPercent: 110, opacity: 0, duration: 1.5, ease: 'expo.out', stagger: 0.045, delay: 0.2,
        onComplete: () => g.set(h1, { overflow: 'visible' })
      }));
    }
    const heroBits = q('[data-hero-copy] [data-fade]');
    if (heroBits.length && !reduce) {
      tweens.push(g.from(heroBits, { y: 16, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.4 }));
    }

    if (hero && mark && !reduce) {
      /* ── SCATTER → SYSTEM ────────────────────────────────────────────────
         The frames arrive as a pile: rotated, overlapping, gathered off-grid.
         As you scroll they rotate to zero and snap onto the grid. Uncertainty
         becoming alignment, performed with the work itself. ─────────────── */
      const rnd = n => { const s = Math.sin(n * 12.9898) * 43758.5453; return s - Math.floor(s); };
      // each frame gathers toward the middle from its own side, so the pile reads as one heap
      const pull = { up: { yPercent: 34 }, down: { yPercent: -34 }, left: { xPercent: 42 }, right: { xPercent: -42 }, fade: {} };
      const pile = tiles.map((t, i) => {
        const from = t.getAttribute('data-from');
        const base = pull[from] || pull.up;
        return Object.assign({
          rotation: (rnd(i + 1) - 0.5) * 11,
          scale: 1.06 + rnd(i + 5) * 0.12,
          xPercent: (base.xPercent || 0) + (rnd(i + 9) - 0.5) * 16,
          yPercent: (base.yPercent || 0) + (rnd(i + 17) - 0.5) * 14,
          filter: 'blur(7px)',
          autoAlpha: 0, opacity: 0,
          zIndex: 1 + Math.round(rnd(i + 23) * 4)
        }, from === 'fade' ? { rotation: 0, scale: 1, xPercent: 0, yPercent: 0, scaleY: 0, filter: 'blur(0px)' } : null);
      });
      tiles.forEach((t, i) => g.set(t, pile[i]));

      /* the mark visits three stations and never fades: hero → beside the copy → the header slot,
         landing exactly on the fixed nav mark so the handover is invisible */
      const flight = () => {
        const from = mark.getBoundingClientRect();
        const to = navMark.getBoundingClientRect();
        const scaleOf = r => r.height / from.height;
        const midScale = 0.42;
        return {
          mid: {
            x: window.innerWidth * 0.02 - from.left,
            y: window.innerHeight * 0.5 - from.height * midScale * 0.5 - from.top,
            scale: midScale
          },
          end: { x: to.left - from.left, y: to.top - from.top, scale: scaleOf(to) }
        };
      };
      let f0 = flight();

      const tl = g.timeline({
        scrollTrigger: {
          trigger: hero, start: 'top top', end: '+=280%', scrub: SCRUB, pin: true, anticipatePin: 1,
          refreshPriority: 2, invalidateOnRefresh: true, onRefresh: () => { f0 = flight(); },
          onToggle: self => g.set([mark, stage2].concat(tiles), { willChange: self.isActive ? 'transform' : 'auto' }),
          // the header slot fills only once the flight is complete, and empties on the way back
          onLeave: () => { g.set(navMark, { autoAlpha: 1 }); g.set(mark, { autoAlpha: 0 }); },
          onEnterBack: () => { g.set(navMark, { autoAlpha: 0 }); g.set(mark, { autoAlpha: 1 }); }
        }
      });
      tl.to(mark, { x: () => f0.mid.x, y: () => f0.mid.y, scale: () => f0.mid.scale, ease: 'sine.inOut', duration: 0.36 }, 0)
        .to(mark, { x: () => f0.end.x, y: () => f0.end.y, scale: () => f0.end.scale, ease: 'sine.inOut', duration: 0.3 }, 0.68)

        .to(q('[data-hero-text]'), { autoAlpha: 0, y: -14, filter: 'blur(3px)', ease: 'sine.in', duration: 0.3 }, 0)
        .to(video, { scale: 1.16, ease: 'none', duration: 1 }, 0)
        .to(scrim, { opacity: 1, ease: 'sine.inOut', duration: 0.5 }, 0.08);
      tiles.forEach((t, i) => {
        const isPanel = t.getAttribute('data-from') === 'fade';
        if (isPanel) {
          // the centre panel is an aperture: it opens once the frames have landed
          tl.fromTo(t, { scaleY: 0 }, { scaleY: 1, autoAlpha: 1, ease: 'expo.inOut', duration: 0.34 }, 0.5);
          return;
        }
        const appear = 0.08 + rnd(i + 31) * 0.1;                 // the pile assembles, irregularly
        const resolve = 0.34 + (i % 3) * 0.035 + rnd(i + 41) * 0.06; // then order arrives
        tl.to(t, { autoAlpha: 1, ease: 'sine.out', duration: 0.2 }, appear);
        tl.to(t, {
          rotation: 0, scale: 1, xPercent: 0, yPercent: 0, filter: 'blur(0px)',
          ease: 'expo.inOut', duration: 0.46
        }, resolve);
      });
      g.set(stage2, { y: 10, filter: 'blur(5px)' });
      tl.to(stage2, { autoAlpha: 1, y: 0, filter: 'blur(0px)', ease: 'sine.out', duration: 0.36 }, 0.58);
      keep(tl);
    } else {
      g.set(navMark, { autoAlpha: 1 });
      g.set(tiles, { autoAlpha: 0 });
      if (stage2) g.set(stage2, { display: 'none' });
    }

    /* ── two-tone scrubbed section statements ── */
    q('[data-scrub]').forEach(el => {
      const w = words(el);
      g.set(el, { color: '#f7f7f5' });
      g.set(w, { opacity: 0.28, willChange: 'opacity' });
      if (reduce) { g.set(w, { opacity: 1 }); return; }
      keep(g.to(w, {
        opacity: 1, stagger: 0.12, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 84%', end: 'bottom 48%', scrub: SCRUB * 0.8 }
      }));
    });

    /* ── APPROACH: one sentence, wider than the screen, lit word by word as it passes ── */
    const ap = root.querySelector('[data-approach]');
    const sl = ap && ap.querySelector('[data-spotlight]');
    if (ap && sl) {
      const sw = words(sl, true);
      if (reduce) {
        g.set(sl, { whiteSpace: 'normal', fontSize: 'clamp(2rem, 5vw, 3.4rem)', paddingLeft: 'clamp(24px, 5vw, 80px)', paddingRight: 'clamp(24px, 5vw, 80px)' });
        g.set(sw, { opacity: 1 });
      } else {
        g.set(sw, { opacity: 0.13, willChange: 'opacity' });
        // geometry cached per refresh, never per frame — and re-cached when the split changes
        let metrics = [];
        const measure = () => {
          metrics = Array.from(sl.querySelectorAll('.w')).map(el => ({
            set: g.quickSetter(el, 'opacity'),
            mid: el.offsetLeft + el.offsetWidth / 2
          }));
          if (!metrics.length) metrics = sw.map(el => ({ set: g.quickSetter(el, 'opacity'), mid: el.offsetLeft + el.offsetWidth / 2 }));
        };
        measure();
        const light = () => {
          const x = g.getProperty(sl, 'x');
          const centre = window.innerWidth / 2;
          const reach = window.innerWidth * 0.46;
          metrics.forEach(m => {
            const d = Math.abs(x + m.mid - centre) / reach;
            m.set(Math.max(0.13, Math.min(1, 1.08 - d * d)));
          });
        };
        const tl = g.timeline({
          scrollTrigger: {
            trigger: ap, start: 'top top', end: '+=180%', pin: true, scrub: SCRUB,
            anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1, onUpdate: light,
            onRefresh: measure,
            onToggle: self => g.set(sl, { willChange: self.isActive ? 'transform' : 'auto' })
          }
        });
        // the travel runs first-word-centred → last-word-centred, so every word gets its moment
        const startX = () => { if (!metrics.length) measure(); return window.innerWidth / 2 - metrics[0].mid; };
        const endX = () => { if (!metrics.length) measure(); return window.innerWidth / 2 - metrics[metrics.length - 1].mid; };
        // the travel finishes at 0.86 and holds: the scrub's lag then has room to catch up,
        // so the final word actually reaches full brightness before the pin releases
        tl.fromTo(sl, { x: startX }, { x: endX, ease: 'none', duration: 0.86 });
        tl.to({}, { duration: 0.14 });
        keep(tl);
        light();
      }
    }

    /* ── SECTION HANDOFF: sections give way to each other rather than simply ending ── */
    const sec0 = el => el.parentNode;
    {
      const handoffs = q('section[data-screen-label]:not([data-hero]):not([data-approach]) > div');
      if (reduce) g.set(handoffs, { autoAlpha: 1 });
      else handoffs.forEach((inner, si) => {
        /* FLOAT: each section drifts at its own rate through the viewport, so nothing sits
           flat on the page — the depth comes from things moving at different speeds */
        keep(g.fromTo(inner,
          { yPercent: 2.2 + (si % 3) * 0.9 },
          { yPercent: -(2.2 + (si % 3) * 0.9), ease: 'none', immediateRender: false,
            scrollTrigger: { trigger: sec0(inner), start: 'top bottom', end: 'bottom top', scrub: SCRUB * 1.4 } }
        ));
        const sec = inner.parentNode;
        // rhythm, not repetition: rise distance, duration and easing all step per section,
        // and every third one arrives without translation at all
        const step = si % 3;
        const rise = [46, 72, 0][step];
        const dur = [0.95, 1.35, 0.7][step];
        const ease = ['expo.out', 'power3.out', 'sine.out'][step];
        keep(g.fromTo(inner,
          { y: rise, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease, duration: dur,
            scrollTrigger: { trigger: sec, start: step === 2 ? 'top 92%' : 'top 86%' } }
        ));
        // exit animates transform + brightness only: no property is shared with the entrance,
        // and immediateRender keeps it from touching the element before its scrub begins
        // an explicit brightness(1) start: 'none' has no numeric value to interpolate from
        // leaves gently: barely dimmed, so the page never reads as going dark between sections
        keep(g.fromTo(inner,
          { filter: 'brightness(1)' },
          { y: -26, scale: 0.995, filter: 'brightness(0.86)', ease: 'none', immediateRender: false,
            scrollTrigger: { trigger: sec, start: 'bottom 60%', end: 'bottom top', scrub: SCRUB } }
        ));
      });
    }

    /* ── generic fades ── */
    q('[data-fade]').forEach(el => {
      if (el.closest('[data-hero-copy]')) return;
      if (reduce) return;
      keep(g.from(el, {
        y: 22 * intensity, autoAlpha: 0, filter: 'blur(4px)', duration: 0.95, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      }));
    });

    /* ── crosshair cursor: the grid, followed. Snaps to the frame lines it passes ── */
    const cross = root.querySelector('[data-cross]');
    if (cross && !reduce && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const vLine = cross.querySelector('[data-cross-v]');
      const hLine = cross.querySelector('[data-cross-h]');
      const xTo = g.quickTo(vLine, 'x', { duration: 0.42, ease: 'power3' });
      const yTo = g.quickTo(hLine, 'y', { duration: 0.42, ease: 'power3' });
      const lines = () => {
        const frame = Math.min(1440, window.innerWidth);
        const inset = (window.innerWidth - frame) / 2;
        return [inset, inset + frame / 2, inset + frame, window.innerWidth / 2];
      };
      let snapTo = lines();
      window.addEventListener('resize', () => { snapTo = lines(); });
      const disc = cross.querySelector('[data-disc]');
      const dxTo = g.quickTo(disc, 'x', { duration: 0.28, ease: 'power3' });
      const dyTo = g.quickTo(disc, 'y', { duration: 0.28, ease: 'power3' });
      let shown = false;
      window.addEventListener('mousemove', e => {
        if (!shown) { shown = true; g.to(cross, { opacity: 1, duration: 0.5, ease: 'sine.out' }); }
        let x = e.clientX;
        for (const line of snapTo) if (Math.abs(x - line) < 26) { x = line; break; }
        xTo(x); yTo(e.clientY);
        dxTo(e.clientX); dyTo(e.clientY);   // the disc tracks the true pointer, the hairlines snap
      }, { passive: true });
      // the disc opens over anything you can act on
      q('a[href], button').forEach(el => {
        el.addEventListener('mouseenter', () => g.to(disc, { scale: 3.2, duration: 0.45, ease: 'expo.out' }));
        el.addEventListener('mouseleave', () => g.to(disc, { scale: 1, duration: 0.5, ease: 'expo.out' }));
      });
    }

    /* ── rows and case cards: title shift on hover, no cursor media ── */
    q('[data-row], [data-case]').forEach(row => {
      const title = row.querySelector('[data-row-title], [data-case-title]');
      const isRow = row.hasAttribute('data-row');
      row.addEventListener('mouseenter', () => {
        if (title) g.to(title, { color: accent, x: isRow ? 10 : 0, duration: 0.22, ease: 'power2.out' });
        const meta = row.querySelector('[data-row-meta]');
        if (meta) g.to(meta, { color: '#a8a8a4', duration: 0.22 });
        const inner = row.querySelector('[data-case-inner]');
        if (inner) g.to(inner, { scale: 1.04, duration: 0.6, ease: 'power2.out' });
      });
      row.addEventListener('mouseleave', () => {
        if (title) g.to(title, { color: '#f7f7f5', x: 0, duration: 0.18, ease: 'power2.out' });
        const meta = row.querySelector('[data-row-meta]');
        if (meta) g.to(meta, { color: '#8a8a92', duration: 0.18 });
        const inner = row.querySelector('[data-case-inner]');
        if (inner) g.to(inner, { scale: 1, duration: 0.45, ease: 'power2.out' });
      });
    });

    /* ── SCROLL ENGINE: a single smoothed velocity drives every speed-reactive property ── */
    if (!reduce) {
      const skewTargets = q('[data-scrub], [data-spotlight]');
      const rules = q('[data-rule]');
      const railBox = root.querySelector('[data-rails]');
      const setSkew = skewTargets.map(el => g.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' }));
      const setRule = rules.map(el => g.quickSetter(el, 'opacity'));
      const setRail = railBox ? g.quickSetter(railBox, 'opacity') : null;
      // a document-spanning trigger is the velocity source (getVelocity is per-instance)
      const velTracker = window.ScrollTrigger.create({ start: 0, end: 'max' });
      triggers.push(velTracker);
      let smooth = 0;
      const engine = () => {
        const raw = velTracker.getVelocity() / 2600;                    // one reading, one frame
        smooth += (Math.max(-1, Math.min(1, raw)) - smooth) * 0.09;     // lerped so nothing snaps
        const s = smooth * 2.6;                                          // ≤ 2.6deg, subliminal
        setSkew.forEach(fn => fn(s));
        const lift = Math.min(1, Math.abs(smooth) * 2.4);
        setRule.forEach(fn => fn(0.45 + lift * 0.55));
        if (setRail) setRail(0.55 + lift * 0.45);
      };
      // a hot-reload must never leave a previous engine attached to the shared ticker
      if (window.__eesEngine) g.ticker.remove(window.__eesEngine);
      window.__eesEngine = engine;
      g.ticker.add(engine);
      stopEngine = () => { g.ticker.remove(engine); if (window.__eesEngine === engine) window.__eesEngine = null; };
    }

    /* ── section rules draw themselves left to right ── */
    q('[data-rule]').forEach(el => {
      if (reduce) { g.set(el, { scaleX: 1 }); return; }
      keep(g.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 94%' }
      }));
    });

    /* ── client marks: no reveal — the row travels vertically, each mark at its own rate ── */
    const cells = q('[data-mark-cell]');
    if (cells.length && !reduce) {
      const row = cells[0].parentNode;
      cells.forEach((c, i) => {
        const span = 26 + (i % 3) * 14;
        keep(g.fromTo(c, { y: span }, {
          y: -span, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: SCRUB }
        }));
      });
    }

    /* ── footer gradient slow drift ── */
    const glow = root.querySelector('[data-footer-glow]');
    if (glow && !reduce) {
      tweens.push(g.to(glow, { scale: 1.12, xPercent: -3, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 }));
      keep(g.fromTo(glow, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: glow.closest('footer'), start: 'top bottom', end: 'bottom bottom', scrub: SCRUB }
      }));
    }

    /* ── scroll cue: present from the start, travels, and retires once you've scrolled ── */
    const cue = root.querySelector('[data-cue]');
    const cueDot = root.querySelector('[data-cue-dot]');
    if (cue && cueDot && !reduce) {
      const run = g.fromTo(cueDot, { x: -14 }, { x: 46, duration: 1.5, ease: 'power2.inOut', repeat: -1, repeatDelay: 0.35 });
      keep(run);
      let retired = false;
      const retire = () => {
        if (retired) return;
        retired = true;
        run.pause();
        g.to(cue, { autoAlpha: 0, duration: 0.5, ease: 'sine.out' });
      };
      window.addEventListener('scroll', retire, { once: true, passive: true });
      clearIdle = () => run.kill();
    }

    /* ── page navigator: reflects where you are, and takes you where you click ── */
    const corner = root.querySelector('[data-corner]');
    const pill = root.querySelector('[data-nav-pill]');
    if (corner) {
      const setCorner = () => g.set(corner, { display: window.innerWidth >= 760 ? 'flex' : 'none' });
      setCorner();
      window.addEventListener('resize', setCorner);
    }
    const navigator_ = root.querySelector('[data-navigator]');
    if (navigator_) {
      const btns = q('[data-goto]');
      const progress = root.querySelector('[data-nav-progress]');
      const pairs = btns.map((b, i) => ({ i, sec: root.querySelector('section[data-screen-label="' + b.getAttribute('data-goto') + '"]') })).filter(p => p.sec);

      const paint = i => btns.forEach((b, n) => {
        const on = n === i;
        g.to(b.querySelector('[data-goto-idx]'), { color: on ? accent : '#8a8a92', duration: 0.3 });
        g.to(b.querySelector('[data-goto-name]'), { color: on ? '#f7f7f5' : '#8a8a92', duration: 0.3 });
        if (progress && on) progress.textContent = String(n + 1).padStart(2, '0');
        if (progress && i < 0) progress.textContent = '';
      });
      paint(-1);

      btns.forEach((b, i) => b.addEventListener('click', () => {
        const t = root.querySelector('section[data-screen-label="' + b.getAttribute('data-goto') + '"]');
        if (!t) return;
        const y = t.getBoundingClientRect().top + window.scrollY;
        if (window.__eesLenis) window.__eesLenis.scrollTo(y, { duration: 1.4 });
        else window.scrollTo({ top: y, behavior: 'smooth' });
      }));

      pairs.forEach(({ i, sec }) => {
        keep(window.ScrollTrigger.create({
          trigger: sec, start: 'top 55%', end: 'bottom 45%',
          onToggle: self => { if (self.isActive) paint(i); }
        }));
      });

      // the navigator only appears once the hero has handed over
      g.set(navigator_, { autoAlpha: 0, y: -8 });
      keep(window.ScrollTrigger.create({
        trigger: hero || root, start: 'bottom 80%',
        onEnter: () => g.to(navigator_, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out' }),
        onLeaveBack: () => g.to(navigator_, { autoAlpha: 0, y: -8, duration: 0.4, ease: 'sine.in' })
      }));
    }

    /* positions are measured before the video and photography arrive — re-measure when they land */
    const refresh = () => window.ScrollTrigger.refresh();
    onLoad = refresh;
    window.addEventListener('load', refresh);
    if (video) video.addEventListener('loadedmetadata', refresh, { once: true });
    q('[data-mosaic] img').forEach(img => {
      if (!img.complete) img.addEventListener('load', refresh, { once: true });
    });
    // every trigger now exists: measure the whole document once, in page order
    window.ScrollTrigger.sort();
    refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { refresh(); });
  }

  /* ── self-boot: DOMContentLoaded → document.fonts.ready (fallback) → rAF → boot() ── */
  const start = () => { raf = requestAnimationFrame(() => boot()); };
  const mount = () => {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    else start();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
