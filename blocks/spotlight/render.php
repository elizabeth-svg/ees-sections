<?php
/**
 * Server render for ees/spotlight.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$bg        = isset( $attributes['bgUrl'] ) ? $attributes['bgUrl'] : '';
$eyebrow   = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$statement = isset( $attributes['statement'] ) ? $attributes['statement'] : '';

$style   = '' !== $bg ? 'style="background-image:url(' . esc_url( $bg ) . ')"' : '';
$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-spotlight' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore ?> <?php echo $style; // phpcs:ignore ?>>
	<div class="ees-spotlight__scrim" aria-hidden="true"></div>
	<div class="ees-spotlight__inner">
		<?php if ( '' !== $eyebrow ) : ?>
			<p class="ees-spotlight__eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $statement ) : ?>
			<h2 class="ees-spotlight__statement"><?php echo wp_kses_post( $statement ); ?></h2>
		<?php endif; ?>
	</div>
</section>
