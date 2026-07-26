<?php
/**
 * EES Canvas — blank, full-width page template with the design chrome:
 * fixed glass-pill header, on-this-page navigator, rail frame and cursor crosshair.
 * Renders only the page content (the EES section blocks) — no theme header/footer/title.
 */

defined( 'ABSPATH' ) || exit;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<script>document.documentElement.classList.add('ees-js');</script>
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'ees-canvas-body' ); ?>>

<a class="ees-skip" href="#ees-main">Skip to content</a>

<nav data-ees-header class="ees-nav" aria-label="Primary">
	<a class="ees-nav__mark" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Elizabeth Eagle-Simbeye, home">ees</a>
	<div class="ees-nav__center">
		<div class="ees-nav__pill">
			<a href="<?php echo esc_url( home_url( '/work/' ) ); ?>">Work</a>
			<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">About</a>
			<a href="https://portfolio.eaglesimbeye.com/">Portfolio</a>
			<a href="<?php echo esc_url( home_url( '/design-thinking/' ) ); ?>">Thoughts</a>
			<a href="<?php echo esc_url( home_url( '/mentor/' ) ); ?>">Mentoring</a>
			<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Contact</a>
		</div>
	</div>
	<div class="ees-nav__corner">
		<a class="ees-nav__touch" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Get in touch<span class="ees-dot" aria-hidden="true"></span></a>
		<div class="ees-nav2" data-ees-navigator>
			<p class="ees-nav2__head">On this page</p>
		</div>
	</div>
</nav>

<div class="ees-rails" data-ees-rails aria-hidden="true"><span></span></div>

<div class="ees-cross" data-ees-cross aria-hidden="true">
	<span class="ees-cross__v"></span>
	<span class="ees-cross__h"></span>
	<span class="ees-cross__disc"></span>
</div>

<main id="ees-main">
<?php
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
?>
</main>

<?php wp_footer(); ?>
</body>
</html>
