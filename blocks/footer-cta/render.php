<?php
/**
 * Server render for ees/footer-cta.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$headline  = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$cta_text  = isset( $attributes['ctaText'] ) ? $attributes['ctaText'] : '';
$cta_url   = isset( $attributes['ctaUrl'] ) && '' !== $attributes['ctaUrl'] ? $attributes['ctaUrl'] : '#';
$links     = isset( $attributes['links'] ) && is_array( $attributes['links'] ) ? $attributes['links'] : array();
$copyright = isset( $attributes['copyright'] ) ? $attributes['copyright'] : '';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-footer' ) );
?>
<footer <?php echo $wrapper; // phpcs:ignore ?>>
	<div class="ees-footer__inner">
		<div class="ees-footer__lead">
			<?php if ( '' !== $headline ) : ?>
				<h2 class="ees-footer__headline"><?php echo wp_kses_post( $headline ); ?></h2>
			<?php endif; ?>
			<?php if ( '' !== $cta_text ) : ?>
				<a class="ees-cta" href="<?php echo esc_url( $cta_url ); ?>">
					<?php echo wp_kses_post( $cta_text ); ?>
					<span class="ees-dot" aria-hidden="true"></span>
				</a>
			<?php endif; ?>
		</div>
		<?php if ( ! empty( $links ) ) : ?>
			<div class="ees-footer__links">
				<?php foreach ( $links as $link ) : ?>
					<?php if ( ! empty( $link['text'] ) ) : ?>
						<a class="ees-footer__link" href="<?php echo esc_url( ! empty( $link['url'] ) ? $link['url'] : '#' ); ?>"><?php echo wp_kses_post( $link['text'] ); ?></a>
					<?php endif; ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
	<?php if ( '' !== $copyright ) : ?>
		<p class="ees-footer__copy"><?php echo wp_kses_post( $copyright ); ?></p>
	<?php endif; ?>
</footer>
