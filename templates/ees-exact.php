<?php
/**
 * EES Exact — bare shell. The design's chrome + sections all live in the block
 * content (hero block opens the wrapper + nav; footer block closes it), so the
 * page renders identically under this template OR Elementor Canvas.
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
<?php while ( have_posts() ) : the_post(); the_content(); endwhile; ?>
<?php wp_footer(); ?>
</body>
</html>
