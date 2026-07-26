<?php
/**
 * Plugin Name:       EES Sections
 * Description:        Editable design-system section blocks for eaglesimbeye.com. Each section is a native, editable WordPress block with the site's design baked in.
 * Version:           0.3.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Elizabeth Eagle-Simbeye
 * Text Domain:       ees-sections
 */

defined( 'ABSPATH' ) || exit;

define( 'EES_SECTIONS_VER', '0.3.0' );

/**
 * Register the shared stylesheet and every block found in /blocks.
 * Each block folder must contain block.json whose "editorScript" is
 * "ees-<folder>-editor" and (for dynamic blocks) a render.php.
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
