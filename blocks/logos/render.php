<?php
/**
 * Server render for ees/logos.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$eyebrow = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$logos   = isset( $attributes['logos'] ) && is_array( $attributes['logos'] ) ? $attributes['logos'] : array();

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-logos' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore ?>>
	<div class="ees-logos__inner">
		<?php if ( '' !== $eyebrow ) : ?>
			<p class="ees-logos__eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
		<?php endif; ?>
		<?php if ( ! empty( $logos ) ) : ?>
			<div class="ees-logos__grid">
				<?php foreach ( $logos as $logo ) : ?>
					<?php if ( ! empty( $logo['url'] ) ) : ?>
						<div class="ees-logos__cell">
							<img src="<?php echo esc_url( $logo['url'] ); ?>" alt="<?php echo esc_attr( isset( $logo['alt'] ) ? $logo['alt'] : '' ); ?>" loading="lazy" />
						</div>
					<?php endif; ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
