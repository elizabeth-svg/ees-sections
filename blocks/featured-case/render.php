<?php
/**
 * Server render for ees/featured-case.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$img   = isset( $attributes['imgUrl'] ) ? $attributes['imgUrl'] : '';
$meta  = isset( $attributes['meta'] ) ? $attributes['meta'] : '';
$title = isset( $attributes['title'] ) ? $attributes['title'] : '';
$desc  = isset( $attributes['desc'] ) ? $attributes['desc'] : '';
$url   = isset( $attributes['url'] ) && '' !== $attributes['url'] ? $attributes['url'] : '';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-case' ) );
$tag     = '' !== $url ? 'a' : 'div';
$href    = '' !== $url ? ' href="' . esc_url( $url ) . '"' : '';
?>
<<?php echo esc_attr( $tag ); ?> <?php echo $wrapper; // phpcs:ignore ?><?php echo $href; // phpcs:ignore ?>>
	<?php if ( '' !== $img ) : ?>
		<div class="ees-case__media"><img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( wp_strip_all_tags( $title ) ); ?>" loading="lazy" /></div>
	<?php endif; ?>
	<?php if ( '' !== $meta ) : ?>
		<p class="ees-case__meta"><?php echo wp_kses_post( $meta ); ?></p>
	<?php endif; ?>
	<?php if ( '' !== $title ) : ?>
		<h3 class="ees-case__title"><?php echo wp_kses_post( $title ); ?></h3>
	<?php endif; ?>
	<?php if ( '' !== $desc ) : ?>
		<p class="ees-case__desc"><?php echo wp_kses_post( $desc ); ?></p>
	<?php endif; ?>
</<?php echo esc_attr( $tag ); ?>>
