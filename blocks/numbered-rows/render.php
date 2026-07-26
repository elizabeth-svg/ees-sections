<?php
/**
 * Server render for ees/numbered-rows.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$eyebrow  = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$headline = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$rows     = isset( $attributes['rows'] ) && is_array( $attributes['rows'] ) ? $attributes['rows'] : array();

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-rows' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore ?>>
	<div class="ees-rows__inner">
		<?php if ( '' !== $eyebrow ) : ?>
			<p class="ees-rows__eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $headline ) : ?>
			<h2 class="ees-rows__headline"><?php echo wp_kses_post( $headline ); ?></h2>
		<?php endif; ?>
		<?php if ( ! empty( $rows ) ) : ?>
			<div class="ees-rows__list">
				<?php foreach ( $rows as $i => $row ) : ?>
					<div class="ees-row">
						<span class="ees-row__num"><?php echo esc_html( sprintf( '%02d', $i + 1 ) ); ?></span>
						<span class="ees-row__title"><?php echo isset( $row['title'] ) ? wp_kses_post( $row['title'] ) : ''; ?></span>
						<span class="ees-row__desc"><?php echo isset( $row['desc'] ) ? wp_kses_post( $row['desc'] ) : ''; ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
