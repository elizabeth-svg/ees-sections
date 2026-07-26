( function ( blocks, blockEditor, element, components, i18n ) {
	'use strict';

	var el = element.createElement;
	var Fragment = element.Fragment;
	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/statement', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var blockProps = useBlockProps( { className: 'ees-statement' } );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Call to action', 'ees-sections' ), initialOpen: true },
						el( TextControl, {
							label: __( 'Button link (URL)', 'ees-sections' ),
							value: a.ctaUrl,
							onChange: function ( v ) { set( { ctaUrl: v } ); },
							placeholder: 'https://eaglesimbeye.com/about/'
						} )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{ className: 'ees-inner' },
						el(
							'div',
							{ className: 'ees-col' },
							el( RichText, {
								tagName: 'p',
								className: 'ees-eyebrow',
								value: a.eyebrow,
								allowedFormats: [],
								onChange: function ( v ) { set( { eyebrow: v } ); },
								placeholder: __( '01 / Experience', 'ees-sections' )
							} ),
							el( RichText, {
								tagName: 'h2',
								className: 'ees-headline',
								value: a.headline,
								onChange: function ( v ) { set( { headline: v } ); },
								placeholder: __( 'Your section statement…', 'ees-sections' )
							} )
						),
						el(
							'div',
							{ className: 'ees-col' },
							el( RichText, {
								tagName: 'p',
								className: 'ees-body',
								value: a.body,
								onChange: function ( v ) { set( { body: v } ); },
								placeholder: __( 'Supporting paragraph…', 'ees-sections' )
							} ),
							el( RichText, {
								tagName: 'span',
								className: 'ees-cta',
								value: a.ctaText,
								allowedFormats: [],
								onChange: function ( v ) { set( { ctaText: v } ); },
								placeholder: __( 'BUTTON LABEL', 'ees-sections' )
							} )
						)
					)
				)
			);
		},
		save: function () {
			return null; // Dynamic block: rendered by render.php.
		}
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
