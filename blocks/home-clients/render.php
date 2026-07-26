<?php defined( "ABSPATH" ) || exit; ?>
<?php $a = $attributes; ?>
<section data-screen-label="Clients" style="padding: clamp(120px, 15vw, 240px) clamp(24px, 5vw, 80px)">
    <div style="opacity: 0; max-width: 1440px; margin: 0 auto">
      <p data-fade="1" style="margin: 0 0 clamp(40px, 5vw, 72px); font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #8a8a92"><span style="color: #8a8a92">05</span> / <?php echo esc_html( $a['eyebrow'] ); ?></p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(45%, 150px), 1fr)); align-items: center; gap: clamp(24px, 3.4vw, 56px) clamp(20px, 3vw, 48px); max-width: 1100px; margin: 0 auto">
<?php foreach ( $a['logos'] as $logo ): ?>
        <div data-mark-cell="1" style="display: flex; align-items: center; justify-content: center">
          <img src="<?php echo esc_url( $logo['url'] ); ?>" alt="<?php echo esc_attr( $logo['alt'] ); ?>" width="250" height="125" loading="lazy" style="width: 100%; height: clamp(62px, 7vw, 92px); object-fit: contain; opacity: 0.72">
        </div>
<?php endforeach; ?>
      </div>
    </div>
  </section>

  <div data-rule="1" style="height: 1px; background: #2a2a30; transform: scaleX(0); transform-origin: left center"></div>

  <!-- ═══ MINDSET ═══ -->
  