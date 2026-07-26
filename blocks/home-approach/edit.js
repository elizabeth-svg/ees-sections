( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var PanelBody = wp.components.PanelBody;
	var Button = wp.components.Button;

	wp.blocks.registerBlockType( 'ees/home-approach', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = function ( key ) {
				return function ( value ) {
					var o = {};
					o[ key ] = value;
					props.setAttributes( o );
				};
			};
			var bg = a.bgImage || {};

			return el( Fragment, null,
				el( InspectorControls, null,
					el( PanelBody, { title: 'Background image', initialOpen: true },
						el( MediaUpload, {
							onSelect: function ( m ) {
								props.setAttributes( { bgImage: { id: m.id, url: m.url, alt: m.alt || '' } } );
							},
							allowedTypes: [ 'image' ],
							value: bg.id,
							render: function ( o ) {
								return el( Fragment, null,
									bg.url ? el( 'img', { src: bg.url, alt: bg.alt || '', style: { display: 'block', width: '100%', height: 'auto', marginBottom: '8px' } } ) : null,
									el( Button, { variant: 'secondary', onClick: o.open }, bg.url ? 'Replace image' : 'Select image' ),
									bg.url ? el( Button, { variant: 'link', isDestructive: true, onClick: function () { props.setAttributes( { bgImage: { id: 0, url: '', alt: '' } } ); } }, 'Remove' ) : null
								);
							}
						} )
					)
				),
				el( 'div', { style: { position: 'relative', padding: '48px 24px', minHeight: '320px', background: bg.url ? 'linear-gradient(rgba(8,8,10,0.58),rgba(8,8,10,0.58)), url(' + bg.url + ') center/cover' : '#08080a', color: '#f7f7f5', fontFamily: 'system-ui, sans-serif' } },
					el( 'p', { style: { margin: '0 0 24px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } },
						el( 'span', { style: { color: '#8a8a92' } }, '02' ),
						' / ',
						el( RichText, {
							tagName: 'span',
							value: a.eyebrow,
							allowedFormats: [],
							onChange: set( 'eyebrow' ),
							placeholder: 'Eyebrow'
						} )
					),
					el( RichText, {
						tagName: 'h2',
						value: a.spotlight,
						allowedFormats: [],
						onChange: set( 'spotlight' ),
						placeholder: 'Spotlight sentence',
						style: { margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.025em', color: '#f7f7f5' }
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp );
