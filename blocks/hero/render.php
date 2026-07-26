<?php
/**
 * Server render for ees/hero.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$bg       = isset( $attributes['bgUrl'] ) ? $attributes['bgUrl'] : '';
$eyebrow  = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$headline = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$meta     = isset( $attributes['meta'] ) ? $attributes['meta'] : '';
$cta_text = isset( $attributes['ctaText'] ) ? $attributes['ctaText'] : '';
$cta_url  = isset( $attributes['ctaUrl'] ) && '' !== $attributes['ctaUrl'] ? $attributes['ctaUrl'] : '#';

$style   = '' !== $bg ? 'style="background-image:url(' . esc_url( $bg ) . ')"' : '';
$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-hero' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore ?> <?php echo $style; // phpcs:ignore ?>>
	<div class="ees-hero__scrim" aria-hidden="true"></div>
	<div class="ees-hero__inner">
		<?php if ( '' !== $eyebrow ) : ?>
			<p class="ees-hero__eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $headline ) : ?>
			<h1 class="ees-hero__headline"><?php echo wp_kses_post( $headline ); ?></h1>
		<?php endif; ?>
		<?php if ( '' !== $meta ) : ?>
			<p class="ees-hero__meta"><?php echo wp_kses_post( $meta ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $cta_text ) : ?>
			<a class="ees-cta" href="<?php echo esc_url( $cta_url ); ?>">
				<?php echo wp_kses_post( $cta_text ); ?>
				<span class="ees-dot" aria-hidden="true"></span>
			</a>
		<?php endif; ?>
	</div>
</section>
