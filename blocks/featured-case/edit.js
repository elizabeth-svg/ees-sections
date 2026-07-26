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

	blocks.registerBlockType( 'ees/featured-case', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var blockProps = useBlockProps( { className: 'ees-case' } );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Case image & link', 'ees-sections' ), initialOpen: true },
						el(
							MediaUploadCheck,
							null,
							el( MediaUpload, {
								onSelect: function ( m ) { set( { imgId: m.id, imgUrl: m.url } ); },
								allowedTypes: [ 'image' ],
								value: a.imgId,
								render: function ( o ) {
									return el( Button, { variant: 'secondary', onClick: o.open },
										a.imgUrl ? __( 'Replace image', 'ees-sections' ) : __( 'Select image', 'ees-sections' ) );
								}
							} )
						),
						el( TextControl, {
							label: __( 'Links to (URL)', 'ees-sections' ),
							value: a.url,
							onChange: function ( v ) { set( { url: v } ); },
							style: { marginTop: '12px' }
						} )
					)
				),
				el(
					'div',
					blockProps,
					a.imgUrl
						? el( 'div', { className: 'ees-case__media' }, el( 'img', { src: a.imgUrl, alt: '' } ) )
						: el( 'div', { className: 'ees-case__media ees-case__media--empty' },
							el( 'span', null, __( 'Select a case image in the sidebar →', 'ees-sections' ) ) ),
					el( RichText, {
						tagName: 'p', className: 'ees-case__meta', value: a.meta,
						allowedFormats: [], onChange: function ( v ) { set( { meta: v } ); },
						placeholder: __( 'CLIENT · DISCIPLINE', 'ees-sections' )
					} ),
					el( RichText, {
						tagName: 'h3', className: 'ees-case__title', value: a.title,
						onChange: function ( v ) { set( { title: v } ); },
						placeholder: __( 'Case study title', 'ees-sections' )
					} ),
					el( RichText, {
						tagName: 'p', className: 'ees-case__desc', value: a.desc,
						onChange: function ( v ) { set( { desc: v } ); },
						placeholder: __( 'One-line outcome…', 'ees-sections' )
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
