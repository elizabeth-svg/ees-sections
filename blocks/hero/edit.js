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

	function mediaPanel( title, urlKey, idKey, types, a, set ) {
		return el(
			PanelBody,
			{ title: title, initialOpen: true },
			el(
				MediaUploadCheck,
				null,
				el( MediaUpload, {
					onSelect: function ( m ) { var o = {}; o[ idKey ] = m.id; o[ urlKey ] = m.url; set( o ); },
					allowedTypes: types,
					value: a[ idKey ],
					render: function ( o ) {
						return el( Button, { variant: 'secondary', onClick: o.open },
							a[ urlKey ] ? __( 'Replace', 'ees-sections' ) : __( 'Select', 'ees-sections' ) );
					}
				} )
			),
			a[ urlKey ] ? el( Button, {
				variant: 'link', isDestructive: true, style: { marginTop: '8px' },
				onClick: function () { var o = {}; o[ idKey ] = undefined; o[ urlKey ] = ''; set( o ); }
			}, __( 'Remove', 'ees-sections' ) ) : null
		);
	}

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
					mediaPanel( __( 'Background video', 'ees-sections' ), 'videoUrl', 'videoId', [ 'video' ], a, set ),
					mediaPanel( __( 'Background image (fallback / poster)', 'ees-sections' ), 'bgUrl', 'bgId', [ 'image' ], a, set ),
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
					a.videoUrl ? el( 'video', {
						className: 'ees-hero__video', src: a.videoUrl, muted: true, loop: true,
						autoPlay: true, playsInline: true, poster: a.bgUrl || undefined
					} ) : null,
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
