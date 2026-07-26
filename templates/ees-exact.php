<?php
/**
 * EES Exact — bare full-bleed template for the verbatim design pages.
 * Renders ONLY the page content (which carries the design's own nav, rails,
 * cursor and footer). No theme chrome, no plugin chrome — nothing that would
 * collide with the design's own data-* hooks.
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
<?php
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
?>
<?php wp_footer(); ?>
</body>
</html>
