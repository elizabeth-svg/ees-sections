<?php
/**
 * EES Canvas — a blank, full-width page template.
 *
 * Renders only the page content (the EES section blocks) with no theme
 * header, footer, page title or width container. Selected per-page via
 * Page → Template → "EES Canvas (full width)".
 */

defined( 'ABSPATH' ) || exit;
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'ees-canvas-body' ); ?>>
<?php
while ( have_posts() ) :
	the_post();
	the_content();
endwhile;
wp_footer();
?>
</body>
</html>
