<?php
/**
 * Plugin Name:       EES Sections
 * Description:        The eaglesimbeye.com design system in WordPress: the Home page reproduced verbatim from the Claude Design with its full motion engine, plus editable section blocks and full-width canvas templates.
 * Version:           0.7.5
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Elizabeth Eagle-Simbeye
 * Text Domain:       ees-sections
 */

defined( 'ABSPATH' ) || exit;

define( 'EES_SECTIONS_VER', '0.7.5' );

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
 * Does the current singular page use any EES block?
 */
function ees_page_uses_blocks() {
	if ( ! is_singular() ) {
		return false;
	}
	$post = get_post();
	return $post && false !== strpos( (string) $post->post_content, 'wp:ees/' );
}

/**
 * Front-end assets: the verbatim design stylesheet + fonts, the self-hosted
 * motion stack (Lenis + GSAP + ScrollTrigger + SplitText), and the ported
 * motion engine. Self-hosted and dependency-chained so nothing loads out of
 * order; tagged so page optimisers leave the motion scripts alone.
 */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! ees_page_uses_blocks() ) {
		return;
	}

	$post      = get_post();
	$has_home  = $post && false !== strpos( (string) $post->post_content, 'wp:ees/home-' );

	// Editable-block styles (older section blocks).
	wp_enqueue_style( 'ees-sections-style' );

	if ( $has_home ) {
		// Google Fonts used by the design (Poppins, Schibsted Grotesk, JetBrains Mono, etc.).
		wp_enqueue_style(
			'ees-gfonts',
			'https://fonts.googleapis.com/css2?family=Sedgwick+Ave+Display&family=Permanent+Marker&family=Caveat+Brush&family=Rubik+Spray+Paint&family=Poppins:wght@600;700&family=Schibsted+Grotesk:wght@400;500&family=JetBrains+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap',
			array(),
			null
		);
		// The design's verbatim global stylesheet (reset, @font-face Rockybilly, media queries).
		wp_enqueue_style(
			'ees-home',
			plugins_url( 'assets/home.css', __FILE__ ),
			array(),
			EES_SECTIONS_VER
		);
	}

	// Self-hosted motion stack — load order enforced by deps.
	$v = plugins_url( 'assets/vendor/', __FILE__ );
	wp_enqueue_script( 'ees-lenis',    $v . 'lenis.min.js',        array(), '1.1.20', true );
	wp_enqueue_script( 'ees-gsap',     $v . 'gsap.min.js',         array(), '3.13.0', true );
	wp_enqueue_script( 'ees-gsap-st',  $v . 'ScrollTrigger.min.js', array( 'ees-gsap' ), '3.13.0', true );
	wp_enqueue_script( 'ees-gsap-split', $v . 'SplitText.min.js',  array( 'ees-gsap' ), '3.13.0', true );
	wp_enqueue_script(
		'ees-motion',
		plugins_url( 'assets/motion.js', __FILE__ ),
		array( 'ees-lenis', 'ees-gsap', 'ees-gsap-st', 'ees-gsap-split' ),
		EES_SECTIONS_VER,
		true
	);
} );

/**
 * Keep page optimisers (LiteSpeed combine/defer/delay, Jetpack Boost, WP Rocket,
 * SG Optimizer, Autoptimize) away from the motion scripts. Reordering or
 * deferring GSAP/Lenis breaks initialisation.
 */
add_filter( 'script_loader_tag', function ( $tag, $handle ) {
	$motion = array( 'ees-lenis', 'ees-gsap', 'ees-gsap-st', 'ees-gsap-split', 'ees-motion' );
	if ( in_array( $handle, $motion, true ) ) {
		$attrs = ' data-no-optimize="1" data-no-defer="1" data-no-minify="1" data-cfasync="false"';
		// LiteSpeed delay-until-interaction opt-out.
		$tag = str_replace( ' src=', $attrs . ' src=', $tag );
	}
	return $tag;
}, 10, 2 );

/**
 * Register the EES page templates (no theme chrome).
 *   - "ees-canvas": plugin chrome (glass nav + navigator) for the editable blocks.
 *   - "ees-exact":  bare shell for the verbatim design pages (they carry their own chrome).
 */
add_filter( 'theme_page_templates', function ( $templates ) {
	$templates['ees-canvas'] = __( 'EES Canvas (full width)', 'ees-sections' );
	$templates['ees-exact']  = __( 'EES Exact (verbatim design)', 'ees-sections' );
	return $templates;
} );

add_filter( 'template_include', function ( $template ) {
	if ( is_page() ) {
		$slug = get_page_template_slug( get_queried_object_id() );
		$map  = array(
			'ees-canvas' => 'templates/ees-canvas.php',
			'ees-exact'  => 'templates/ees-exact.php',
		);
		if ( isset( $map[ $slug ] ) ) {
			$custom = plugin_dir_path( __FILE__ ) . $map[ $slug ];
			if ( file_exists( $custom ) ) {
				return $custom;
			}
		}
	}
	return $template;
} );
