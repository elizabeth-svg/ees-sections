<?php defined( "ABSPATH" ) || exit; ?>
<?php $a = $attributes; ?>
<footer data-screen-label="Footer" style="position: relative; overflow: hidden; background: #0b0b0e">
    <img data-footer-glow="1" src="https://eaglesimbeye.com/wp-content/uploads/2026/07/footer-480.png" alt="" width="480" height="279" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform-origin: 30% 60%">
    <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(8,8,10,0.62) 0%, rgba(8,8,10,0.42) 48%, rgba(8,8,10,0.66) 100%)"></div>

    <div style="position: relative; padding: clamp(80px, 10vw, 160px) clamp(24px, 5vw, 80px) 32px">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); column-gap: 32px; row-gap: 64px; max-width: 1440px; margin: 0 auto">
        <div>
          <h2 data-split="1" style="margin: 0 0 clamp(28px, 4vw, 44px); max-width: 18ch; font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; text-transform: uppercase; font-size: clamp(1.875rem, 3.4vw, 2.875rem); font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; color: #f7f7f5"><?php echo esc_html( $a['headline'] ); ?></h2>
          <a data-cta="1" href="<?php echo esc_url( $a['ctaUrl'] ); ?>" style="display: inline-flex; align-items: center; gap: 12px; padding: 13px 22px; border: 1px solid rgba(247,247,245,0.22); background: none; transition: background 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms cubic-bezier(0.22, 1, 0.36, 1), color 260ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #f7f7f5" style-hover="background:#f7f7f5;border-color:#f7f7f5;color:#08080a"><?php echo esc_html( $a['ctaText'] ); ?><span data-cta-dot="1" aria-hidden="true" style="display: block; width: 5px; height: 5px; border-radius: 50%; background: #f2ea36"></span></a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <p style="margin: 0 0 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4">Quick links</p>
<?php foreach ( $a['quickLinks'] as $link ): ?>
          <a data-prose="1" href="<?php echo esc_url( $link['url'] ); ?>" style="font-size: 0.875rem; color: <?php echo esc_attr( $link['color'] ); ?>"><?php echo esc_html( $link['label'] ); ?></a>
<?php endforeach; ?>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <p style="margin: 0 0 8px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4">Socials</p>
<?php foreach ( $a['socialLinks'] as $link ): ?>
          <a data-prose="1" href="<?php echo esc_url( $link['url'] ); ?>" style="font-size: 0.875rem; color: #f7f7f5"><?php echo esc_html( $link['label'] ); ?></a>
<?php endforeach; ?>
        </div>
      </div>

      <div style="display: flex; justify-content: center; margin-top: clamp(64px, 8vw, 120px)">
        <p style="margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4"><?php echo esc_html( $a['copyright'] ); ?></p>
      </div>
    </div>
  </footer>


  <div data-cross="1" aria-hidden="true" style="position: fixed; inset: 0; z-index: 95; pointer-events: none; opacity: 0">
    <span data-cross-v="1" style="position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: rgba(247,247,245,0.16)"></span>
    <span data-disc="1" style="position: absolute; top: 0; left: 0; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #f7f7f5; mix-blend-mode: difference"></span>
    <span data-cross-h="1" style="position: absolute; left: 0; right: 0; top: 0; height: 1px; background: rgba(247,247,245,0.16)"></span>
  </div>

  <div data-rails="1" aria-hidden="true" style="position: fixed; inset: 0; z-index: 2; display: flex; justify-content: center; pointer-events: none">
    <div style="width: 100%; max-width: 1440px; border-left: 1px solid rgba(247,247,245,0.055); border-right: 1px solid rgba(247,247,245,0.055)"></div>
  </div>

</div>
