( function ( blocks, blockEditor, element, components, i18n ) {
	'use strict';
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var MediaUpload = blockEditor.MediaUpload;
	var MediaUploadCheck = blockEditor.MediaUploadCheck;
	var Button = components.Button;
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/logos', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var logos = a.logos || [];

			function replace( i, m ) { var l = logos.slice(); l[ i ] = { id: m.id, url: m.url, alt: m.alt || '' }; set( { logos: l } ); }
			function remove( i ) { var l = logos.slice(); l.splice( i, 1 ); set( { logos: l } ); }
			function addMany( media ) {
				var arr = Array.isArray( media ) ? media : [ media ];
				var add = arr.map( function ( m ) { return { id: m.id, url: m.url, alt: m.alt || '' }; } );
				set( { logos: logos.concat( add ) } );
			}

			var blockProps = useBlockProps( { className: 'ees-logos' } );

			return el(
				'div',
				blockProps,
				el( RichText, {
					tagName: 'p', className: 'ees-logos__eyebrow', value: a.eyebrow,
					allowedFormats: [], onChange: function ( v ) { set( { eyebrow: v } ); },
					placeholder: __( '05 / Selected clients', 'ees-sections' )
				} ),
				el(
					'div', { className: 'ees-logos__grid' },
					logos.map( function ( logo, i ) {
						return el(
							'div', { className: 'ees-logos__cell', key: i },
							el( 'img', { src: logo.url, alt: logo.alt || '' } ),
							el(
								MediaUploadCheck, null,
								el( MediaUpload, {
									onSelect: function ( m ) { replace( i, m ); },
									allowedTypes: [ 'image' ], value: logo.id,
									render: function ( o ) { return el( Button, { variant: 'link', onClick: o.open }, __( 'Replace', 'ees-sections' ) ); }
								} )
							),
							el( Button, { variant: 'link', isDestructive: true, onClick: function () { remove( i ); } }, __( 'Remove', 'ees-sections' ) )
						);
					} )
				),
				el(
					MediaUploadCheck, null,
					el( MediaUpload, {
						onSelect: addMany, allowedTypes: [ 'image' ], multiple: true, gallery: false,
						render: function ( o ) { return el( Button, { variant: 'secondary', onClick: o.open, style: { marginTop: '12px' } }, __( '+ Add logos', 'ees-sections' ) ); }
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
