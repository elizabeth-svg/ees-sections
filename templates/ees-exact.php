<?php
/**
 * EES Exact — bare shell for the verbatim design Home page.
 * Renders the design's fixed chrome (outer wrapper, skip link, nav with the
 * flying nav-mark + on-this-page navigator, crosshair cursor, 1440 rails) and
 * drops the editable section blocks (the_content) between them. No theme chrome.
 * The section order and the data-* hooks here are load-bearing for the motion.
 */

defined( 'ABSPATH' ) || exit;
?><!doctype html>
<html <?php language_attributes(); ?> lang="en-GB">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'ees-exact-body' ); ?>>

<?php /* ---- design chrome: wrapper open + skip link + nav ---- */ ?>
<div style="position: relative; width: 100%; background: #08080a">

  <a href="#main" style="position: absolute; left: -9999px; top: 0; z-index: 90; padding: 14px 22px; background: #f7f7f5; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #08080a" style-focus="left:0">Skip to content</a>

  <nav data-nav="1" style="position: fixed; top: 0; left: 0; right: 0; z-index: 60; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: start; column-gap: clamp(16px, 2vw, 32px); padding: clamp(14px, 2vh, 22px) clamp(16px, 3vw, 32px); pointer-events: none">

    <a href="https://eaglesimbeye.com/" data-nav-mark="1" aria-label="Elizabeth Eagle-Simbeye, home" style="display: block; opacity: 0; font-family: 'Rockybilly', 'Sedgwick Ave Display', cursive; font-size: 34px; line-height: 0.82; font-weight: 400; letter-spacing: 0; text-transform: lowercase; color: #f7f7f5; pointer-events: auto">ees</a>

    <div style="display: flex; justify-content: center; min-width: 0">
    <div data-nav-pill="1" style="display: flex; align-items: center; gap: clamp(16px, 2.2vw, 30px); padding: 11px clamp(16px, 1.8vw, 24px); border: 1px solid rgba(247,247,245,0.1); background: rgba(12,12,15,0.62); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); pointer-events: auto">
      <div style="display: flex; align-items: center; gap: clamp(11px, 1.5vw, 24px); flex-wrap: wrap">
        <a href="https://eaglesimbeye.com/work/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)">Work</a>
        <a href="https://eaglesimbeye.com/about/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)" style-hover="opacity:1">About</a>
        <a href="https://portfolio.eaglesimbeye.com/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)" style-hover="opacity:1">Portfolio</a>
        <a href="https://eaglesimbeye.com/design-thinking/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)" style-hover="opacity:1">Thoughts</a>
        <a href="https://eaglesimbeye.com/mentor/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)" style-hover="opacity:1">Mentoring</a>
        <a href="https://eaglesimbeye.com/contact/" style="font-size: 13.5px; letter-spacing: 0.004em; color: #f7f7f5; opacity: 0.7; transition: opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)" style-hover="opacity:1">Contact</a>
      </div>
    </div>
    </div>

    <div data-corner="1" style="display: flex; flex-direction: column; align-items: stretch; gap: 8px; width: clamp(168px, 14vw, 216px); pointer-events: auto">
      <a href="https://eaglesimbeye.com/contact/" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px; border: 1px solid rgba(247,247,245,0.1); background: rgba(12,12,15,0.62); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #f7f7f5" style-hover="background:rgba(247,247,245,0.1)">
        Get in touch
        <span aria-hidden="true" style="display: block; width: 5px; height: 5px; border-radius: 50%; background: #f2ea36"></span>
      </a>

      <div data-navigator="1" style="padding: 12px 6px 8px; border: 1px solid rgba(247,247,245,0.1); background: rgba(12,12,15,0.62); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); opacity: 0">
        <p style="display: flex; align-items: baseline; justify-content: space-between; margin: 0 0 8px; padding: 0 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8a92">
          On this page
          <span data-nav-progress="1" style="color: #a8a8a4"></span>
        </p>
        <div style="display: flex; flex-direction: column">
      <button type="button" data-goto="Experience" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">01</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Experience</span>
      </button>
      <button type="button" data-goto="Approach" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">02</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Approach</span>
      </button>
      <button type="button" data-goto="Focus areas" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">03</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Focus</span>
      </button>
      <button type="button" data-goto="Work" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">04</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Work</span>
      </button>
      <button type="button" data-goto="Clients" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">05</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Clients</span>
      </button>
      <button type="button" data-goto="Mindset" style="display: grid; grid-template-columns: 22px 1fr; align-items: baseline; gap: 10px; width: 100%; padding: 7px 12px; border: 0; background: none; transition: background 220ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; text-align: left; color: #8a8a92; cursor: pointer" style-hover="background:rgba(247,247,245,0.06)">
        <span data-goto-idx="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">06</span>
        <span data-goto-name="1" style="transition: color 220ms cubic-bezier(0.22, 1, 0.36, 1)">Mindset</span>
      </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- ═══ HERO: full-bleed showreel, the wordmark travels to the header, mosaic assembles ═══ -->
  
<?php
/* ---- editable section blocks (Hero → Footer) ---- */
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
?>
<div data-cross="1" aria-hidden="true" style="position: fixed; inset: 0; z-index: 95; pointer-events: none; opacity: 0">
    <span data-cross-v="1" style="position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: rgba(247,247,245,0.16)"></span>
    <span data-disc="1" style="position: absolute; top: 0; left: 0; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #f7f7f5; mix-blend-mode: difference"></span>
    <span data-cross-h="1" style="position: absolute; left: 0; right: 0; top: 0; height: 1px; background: rgba(247,247,245,0.16)"></span>
  </div>

  <div data-rails="1" aria-hidden="true" style="position: fixed; inset: 0; z-index: 2; display: flex; justify-content: center; pointer-events: none">
    <div style="width: 100%; max-width: 1440px; border-left: 1px solid rgba(247,247,245,0.055); border-right: 1px solid rgba(247,247,245,0.055)"></div>
  </div>

</div>

<?php wp_footer(); ?>
</body>
</html>
