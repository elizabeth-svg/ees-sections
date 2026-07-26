<?php
/**
 * Plugin Name:       EES Sections
 * Description:        Editable design-system section blocks for eaglesimbeye.com, plus a full-width canvas page template. Each section is a native, editable WordPress block with the site's design baked in.
 * Version:           0.4.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Elizabeth Eagle-Simbeye
 * Text Domain:       ees-sections
 */

defined( 'ABSPATH' ) || exit;

define( 'EES_SECTIONS_VER', '0.4.0' );

/**
 * Register the shared stylesheet and every block found in /blocks.
 */
add_action( 'init', function () {

	wp_register_style(
		'ees-sections-style',
		plugins_url( 'assets/design.css', __FILE__ ),
		array(),
		EES_SECTIONS_VER
	);

	$deps = array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' );

	foreach ( glob( __DIR__ . '/blocks/*', GLOB_ONLYDIR ) as $dir ) {
		$name = basename( $dir );

		if ( file_exists( "$dir/edit.js" ) ) {
			wp_register_script(
				"ees-$name-editor",
				plugins_url( "blocks/$name/edit.js", __FILE__ ),
				$deps,
				EES_SECTIONS_VER,
				true
			);
		}

		register_block_type( $dir );
	}
} );

/**
 * Belt-and-suspenders: make sure the design stylesheet loads on the front end
 * for any page/post that uses an EES block (covers custom templates too).
 */
add_action( 'wp_enqueue_scripts', function () {
	if ( is_singular() ) {
		$post = get_post();
		if ( $post && false !== strpos( (string) $post->post_content, 'wp:ees/' ) ) {
			wp_enqueue_style( 'ees-sections-style' );
		}
	}
} );

/**
 * Register the "EES Canvas" full-width page template (no theme chrome).
 */
add_filter( 'theme_page_templates', function ( $templates ) {
	$templates['ees-canvas'] = __( 'EES Canvas (full width)', 'ees-sections' );
	return $templates;
} );

add_filter( 'template_include', function ( $template ) {
	if ( is_page() ) {
		$slug = get_page_template_slug( get_queried_object_id() );
		if ( 'ees-canvas' === $slug ) {
			$custom = plugin_dir_path( __FILE__ ) . 'templates/ees-canvas.php';
			if ( file_exists( $custom ) ) {
				return $custom;
			}
		}
	}
	return $template;
} );
