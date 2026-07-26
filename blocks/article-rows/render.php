<?php
/**
 * Server render for ees/article-rows.
 *
 * @var array $attributes
 */

defined( 'ABSPATH' ) || exit;

$eyebrow  = isset( $attributes['eyebrow'] ) ? $attributes['eyebrow'] : '';
$headline = isset( $attributes['headline'] ) ? $attributes['headline'] : '';
$rows     = isset( $attributes['rows'] ) && is_array( $attributes['rows'] ) ? $attributes['rows'] : array();

$wrapper = get_block_wrapper_attributes( array( 'class' => 'ees-articles' ) );
?>
<section <?php echo $wrapper; // phpcs:ignore ?>>
	<div class="ees-articles__inner">
		<?php if ( '' !== $eyebrow ) : ?>
			<p class="ees-articles__eyebrow"><?php echo wp_kses_post( $eyebrow ); ?></p>
		<?php endif; ?>
		<?php if ( '' !== $headline ) : ?>
			<h2 class="ees-articles__headline"><?php echo wp_kses_post( $headline ); ?></h2>
		<?php endif; ?>
		<?php if ( ! empty( $rows ) ) : ?>
			<div class="ees-articles__list">
				<?php
				foreach ( $rows as $row ) :
					$url  = isset( $row['url'] ) && '' !== $row['url'] ? $row['url'] : '';
					$tag  = '' !== $url ? 'a' : 'div';
					$href = '' !== $url ? ' href="' . esc_url( $url ) . '"' : '';
					?>
					<<?php echo esc_attr( $tag ); ?> class="ees-article"<?php echo $href; // phpcs:ignore ?>>
						<span class="ees-article__cat"><?php echo isset( $row['category'] ) ? wp_kses_post( $row['category'] ) : ''; ?></span>
						<span class="ees-article__title"><?php echo isset( $row['title'] ) ? wp_kses_post( $row['title'] ) : ''; ?></span>
						<span class="ees-article__stand"><?php echo isset( $row['standfirst'] ) ? wp_kses_post( $row['standfirst'] ) : ''; ?></span>
					</<?php echo esc_attr( $tag ); ?>>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
