( function ( blocks, blockEditor, element, components, i18n ) {
	'use strict';
	var el = element.createElement;
	var Fragment = element.Fragment;
	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;
	var MediaUpload = blockEditor.MediaUpload;
	var MediaUploadCheck = blockEditor.MediaUploadCheck;
	var PanelBody = components.PanelBody;
	var Button = components.Button;
	var TextControl = components.TextControl;
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/hero', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;

			var style = a.bgUrl
				? { backgroundImage: 'url(' + a.bgUrl + ')', backgroundSize: 'cover', backgroundPosition: 'center' }
				: {};
			var blockProps = useBlockProps( { className: 'ees-hero', style: style } );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Background image', 'ees-sections' ), initialOpen: true },
						el(
							MediaUploadCheck,
							null,
							el( MediaUpload, {
								onSelect: function ( m ) { set( { bgId: m.id, bgUrl: m.url } ); },
								allowedTypes: [ 'image' ],
								value: a.bgId,
								render: function ( o ) {
									return el( Button, { variant: 'secondary', onClick: o.open },
										a.bgUrl ? __( 'Replace image', 'ees-sections' ) : __( 'Select image', 'ees-sections' ) );
								}
							} )
						),
						a.bgUrl ? el( Button, {
							variant: 'link', isDestructive: true,
							onClick: function () { set( { bgId: undefined, bgUrl: '' } ); },
							style: { marginTop: '8px' }
						}, __( 'Remove image', 'ees-sections' ) ) : null
					),
					el(
						PanelBody,
						{ title: __( 'Call to action', 'ees-sections' ), initialOpen: false },
						el( TextControl, {
							label: __( 'Button link (URL)', 'ees-sections' ),
							value: a.ctaUrl,
							onChange: function ( v ) { set( { ctaUrl: v } ); }
						} )
					)
				),
				el(
					'div',
					blockProps,
					el( 'div', { className: 'ees-hero__scrim' } ),
					el(
						'div',
						{ className: 'ees-hero__inner' },
						el( RichText, {
							tagName: 'p', className: 'ees-hero__eyebrow', value: a.eyebrow,
							allowedFormats: [], onChange: function ( v ) { set( { eyebrow: v } ); },
							placeholder: __( 'PRINCIPAL, EXPERIENCE DESIGN', 'ees-sections' )
						} ),
						el( RichText, {
							tagName: 'h1', className: 'ees-hero__headline', value: a.headline,
							onChange: function ( v ) { set( { headline: v } ); },
							placeholder: __( 'Your hero headline…', 'ees-sections' )
						} ),
						el( RichText, {
							tagName: 'p', className: 'ees-hero__meta', value: a.meta,
							allowedFormats: [], onChange: function ( v ) { set( { meta: v } ); },
							placeholder: __( 'Twenty years in practice · Manchester based', 'ees-sections' )
						} ),
						el( RichText, {
							tagName: 'span', className: 'ees-cta', value: a.ctaText,
							allowedFormats: [], onChange: function ( v ) { set( { ctaText: v } ); },
							placeholder: __( 'DISCOVER MORE', 'ees-sections' )
						} )
					)
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
