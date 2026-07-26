<?php defined( "ABSPATH" ) || exit; ?>
<?php $a = $attributes; ?>
<section data-screen-label="Focus areas" style="padding: clamp(88px, 11vw, 176px) clamp(24px, 5vw, 80px) clamp(56px, 7vw, 104px)">
    <div style="opacity: 0; max-width: 1440px; margin: 0 auto">
      <div style="display: grid; grid-template-columns: minmax(0, 1fr); column-gap: 32px; margin-bottom: clamp(56px, 7vw, 96px)">
        <div>
          <p data-fade="1" style="margin: 0 0 28px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4"><span style="color: #8a8a92">03</span> / <?php echo esc_html( $a['eyebrow'] ); ?></p>
          <h2 data-scrub="1" style="margin: 0; font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; font-size: clamp(1.75rem, 2.9vw, 2.625rem); font-weight: 700; text-transform: uppercase; line-height: 1.05; letter-spacing: -0.02em; color: #8a8a92"><?php echo esc_html( $a['headline'] ); ?></h2>
        </div>
      </div>

      <div data-rows="1" style="display: flex; flex-direction: column">
<?php foreach ( $a['rows'] as $i => $row ) : ?>
        <a data-row="1" href="<?php echo esc_url( $row['url'] ); ?>" style="position: relative; display: grid; grid-template-columns: 44px minmax(0, 1fr) minmax(0, auto); align-items: center; gap: clamp(12px, 2vw, 24px); padding: clamp(24px, 3vw, 40px) 0; border-top: 1px solid #2a2a30; <?php echo ( $i === count( $a['rows'] ) - 1 ) ? 'border-bottom: 1px solid #2a2a30; ' : ''; ?>color: #f7f7f5">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; color: #8a8a92"><?php echo sprintf( '%02d', $i + 1 ); ?></span>
          <span data-row-title="1" style="font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; text-transform: uppercase; font-size: clamp(1.375rem, 2.4vw, 2.125rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em"><?php echo esc_html( $row['title'] ); ?></span>
          <span data-prose="1" data-row-meta="1" style="max-width: 34ch; font-size: 0.875rem; line-height: 1.6; color: #8a8a92; text-align: right"><?php echo wp_kses_post( $row['desc'] ); ?></span>
        </a>
<?php endforeach; ?>
      </div>
    </div>
  </section>

  <div data-rule="1" style="height: 1px; background: #2a2a30; transform: scaleX(0); transform-origin: left center"></div>

  <!-- ═══ WORK ═══ -->
  