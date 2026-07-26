<?php defined( "ABSPATH" ) || exit; ?>
<?php $a = $attributes; ?>
<section data-screen-label="Mindset" style="padding: clamp(88px, 11vw, 176px) clamp(24px, 5vw, 80px)">
    <div style="opacity: 0; max-width: 1440px; margin: 0 auto">
      <p data-fade="1" style="margin: 0 0 32px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4"><?php echo wp_kses_post( $a['eyebrow'] ); ?></p>
      <div style="display: grid; grid-template-columns: minmax(0, 1fr); column-gap: 32px; row-gap: clamp(48px, 6vw, 80px)">
        <h2 data-scrub="1" style="margin: 0; max-width: 24ch; font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; text-transform: uppercase; font-size: clamp(1.75rem, 2.9vw, 2.625rem); font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; color: #8a8a92"><?php echo esc_html( $a['headline'] ); ?></h2>

        <div style="display: flex; flex-direction: column">
<?php foreach ( $a['rows'] as $i => $row ) : ?>
          <a data-row="1" href="<?php echo esc_url( $row['url'] ); ?>" style="display: grid; grid-template-columns: minmax(0, 15ch) minmax(0, 1.6fr) minmax(0, 34ch); align-items: baseline; gap: clamp(12px, 2vw, 24px); padding: clamp(20px, 2.4vw, 32px) 0; border-top: 1px solid #2a2a30; <?php echo ( $i === count( $a['rows'] ) - 1 ) ? 'border-bottom: 1px solid #2a2a30; ' : ''; ?>color: #f7f7f5">
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8a92"><?php echo esc_html( $row['category'] ); ?></span>
            <span data-row-title="1" style="font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; text-transform: uppercase; font-size: clamp(1.375rem, 2.4vw, 2.125rem); font-weight: 700; line-height: 1.2; letter-spacing: -0.015em; text-wrap: balance"><?php echo esc_html( $row['title'] ); ?></span>
            <span data-prose="1" data-row-meta="1" style="font-size: 0.875rem; line-height: 1.6; color: #8a8a92; text-wrap: pretty"><?php echo wp_kses_post( $row['standfirst'] ); ?></span>
          </a>
<?php endforeach; ?>
          <a data-cta="1" data-fade="1" href="https://eaglesimbeye.com/design-thinking/" style="align-self: start; margin-top: clamp(28px, 3vw, 40px); display: inline-flex; align-items: center; gap: 12px; padding: 13px 22px; border: 1px solid rgba(247,247,245,0.22); background: none; transition: background 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms cubic-bezier(0.22, 1, 0.36, 1), color 260ms cubic-bezier(0.22, 1, 0.36, 1); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #f7f7f5" style-hover="background:#f7f7f5;border-color:#f7f7f5;color:#08080a">All thoughts<span data-cta-dot="1" aria-hidden="true" style="display: block; width: 5px; height: 5px; border-radius: 50%; background: #f2ea36"></span></a>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ FOOTER ═══ -->
  