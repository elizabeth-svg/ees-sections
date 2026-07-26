<?php
/**
 * Server render for ees/statement.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner content (unused).
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$eyebrow  = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$headline = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$body     = isset( $attributes['body'] ) ? $attributes['body'] : '';
$cta_text = isset( $attributes['ctaText'] ) ? $attributes['ctaText'] : '';
$cta_url  = isset( $attributes['ctaUrl'] ) && $attributes['ctaUrl'] !== '' ? $attributes['ctaUrl'] : '#';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-statement' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="ees-inner">
		<div class="ees-col">
			<?php if ( '' !== $eyebrow ) : ?>
				<p class="ees-eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
			<?php endif; ?>
			<?php if ( '' !== $headline ) : ?>
				<h2 class="ees-headline"><?php echo wp_kses_post( $headline ); ?></h2>
			<?php endif; ?>
		</div>
		<div class="ees-col">
			<?php if ( '' !== $body ) : ?>
				<p class="ees-body"><?php echo wp_kses_post( $body ); ?></p>
			<?php endif; ?>
			<?php if ( '' !== $cta_text ) : ?>
				<a class="ees-cta" href="<?php echo esc_url( $cta_url ); ?>">
					<?php echo wp_kses_post( $cta_text ); ?>
					<span class="ees-dot" aria-hidden="true"></span>
				</a>
			<?php endif; ?>
		</div>
	</div>
</section>
