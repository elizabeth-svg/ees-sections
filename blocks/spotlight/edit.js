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
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/spotlight', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var style = a.bgUrl
				? { backgroundImage: 'url(' + a.bgUrl + ')', backgroundSize: 'cover', backgroundPosition: 'center' }
				: {};
			var blockProps = useBlockProps( { className: 'ees-spotlight', style: style } );

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
					)
				),
				el(
					'div',
					blockProps,
					el( 'div', { className: 'ees-spotlight__scrim' } ),
					el(
						'div',
						{ className: 'ees-spotlight__inner' },
						el( RichText, {
							tagName: 'p', className: 'ees-spotlight__eyebrow', value: a.eyebrow,
							allowedFormats: [], onChange: function ( v ) { set( { eyebrow: v } ); },
							placeholder: __( '02 / Approach', 'ees-sections' )
						} ),
						el( RichText, {
							tagName: 'h2', className: 'ees-spotlight__statement', value: a.statement,
							onChange: function ( v ) { set( { statement: v } ); },
							placeholder: __( 'From ambition to alignment.', 'ees-sections' )
						} )
					)
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
