<?php
/**
 * Plugin Name:       EES Sections
 * Description:        Editable design-system section blocks for eaglesimbeye.com. Each section is a native, editable WordPress block with the site's design baked in.
 * Version:           0.1.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Elizabeth Eagle-Simbeye
 * Text Domain:       ees-sections
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register shared assets and all section blocks on init.
 */
add_action( 'init', function () {

	// Shared design stylesheet (loads in editor + on the front end wherever a block renders).
	wp_register_style(
		'ees-sections-style',
		plugins_url( 'assets/design.css', __FILE__ ),
		array(),
		'0.1.0'
	);

	// --- Statement block (pilot) ---------------------------------------
	wp_register_script(
		'ees-statement-editor',
		plugins_url( 'blocks/statement/edit.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		'0.1.0',
		true
	);

	register_block_type( __DIR__ . '/blocks/statement' );
} );
