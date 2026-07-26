<?php defined( "ABSPATH" ) || exit; ?>
<?php $a = $attributes; ?>
<section data-screen-label="Approach" data-approach="1" style="position: relative; height: 100svh; max-height: 100svh; display: flex; align-items: center; overflow: hidden; background: #08080a">
    <img data-approach-bg="1" src="<?php echo esc_url( $a['bgImage']['url'] ); ?>" alt="<?php echo esc_attr( $a['bgImage']['alt'] ); ?>" width="640" height="341" style="position: absolute; inset: -8% 0; width: 100%; height: 116%; object-fit: cover; object-position: center 45%">
    <div aria-hidden="true" style="position: absolute; inset: 0; background: rgba(8,8,10,0.58)"></div>
    <div aria-hidden="true" style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.22) 42%, rgba(8,8,10,0.72) 100%)"></div>
    <div aria-hidden="true" style="position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: rgba(247,247,245,0.055)"></div>
    <p data-fade="1" style="position: absolute; top: clamp(88px, 12vh, 132px); left: clamp(24px, 5vw, 80px); margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #a8a8a4"><span style="color: #8a8a92">02</span> / <?php echo esc_html( $a['eyebrow'] ); ?></p>
    <h2 data-spotlight="1" style="position: relative; margin: 0; white-space: nowrap; font-family: 'Poppins', 'Helvetica Neue', Helvetica, sans-serif; text-transform: uppercase; font-size: 11vw; line-height: 1; font-weight: 700; letter-spacing: -0.025em; color: #f7f7f5"><?php echo esc_html( $a['spotlight'] ); ?></h2>
  </section>

  <div data-rule="1" style="height: 1px; background: #2a2a30; transform: scaleX(0); transform-origin: left center"></div>

  <!-- ═══ FOCUS AREAS — numbered rows, hover media ═══ -->
  