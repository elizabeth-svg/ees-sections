( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;

	function moveItem( arr, from, to ) {
		var copy = arr.slice();
		var item = copy.splice( from, 1 )[ 0 ];
		copy.splice( to, 0, item );
		return copy;
	}

	wp.blocks.registerBlockType( 'ees/home-clients', {
		edit: function ( props ) {
			var a = props.attributes;
			var logos = a.logos || [];

			function updateLogo( i, patch ) {
				var next = logos.slice();
				next[ i ] = Object.assign( {}, next[ i ], patch );
				props.setAttributes( { logos: next } );
			}
			function addLogo() {
				props.setAttributes( { logos: logos.concat( [ { url: '', alt: '', id: 0 } ] ) } );
			}
			function removeLogo( i ) {
				props.setAttributes( { logos: logos.filter( function ( _item, j ) { return j !== i; } ) } );
			}
			function moveLogo( i, dir ) {
				var to = i + dir;
				if ( to < 0 || to >= logos.length ) { return; }
				props.setAttributes( { logos: moveItem( logos, i, to ) } );
			}

			var inspector = el( InspectorControls, null,
				el( PanelBody, { title: 'Client logos', initialOpen: true },
					logos.map( function ( logo, i ) {
						return el( 'div', { key: i, style: { borderTop: '1px solid #ddd', paddingTop: '12px', marginTop: '12px' } },
							el( 'strong', null, 'Logo ' + ( i + 1 ) ),
							el( MediaUploadCheck, null,
								el( MediaUpload, {
									allowedTypes: [ 'image' ],
									value: logo.id,
									onSelect: function ( media ) {
										updateLogo( i, { id: media.id, url: media.url, alt: media.alt || logo.alt } );
									},
									render: function ( o ) {
										return el( Button, { variant: 'secondary', onClick: o.open, style: { marginTop: '6px' } },
											logo.url ? 'Replace image' : 'Select image' );
									}
								} )
							),
							logo.url ? el( 'img', { src: logo.url, alt: logo.alt, style: { display: 'block', maxWidth: '120px', height: 'auto', margin: '8px 0' } } ) : null,
							el( TextControl, {
								label: 'Image URL',
								value: logo.url,
								onChange: function ( v ) { updateLogo( i, { url: v } ); }
							} ),
							el( TextControl, {
								label: 'Alt text',
								value: logo.alt,
								onChange: function ( v ) { updateLogo( i, { alt: v } ); }
							} ),
							el( 'div', { style: { display: 'flex', gap: '4px', marginTop: '6px' } },
								el( Button, { variant: 'tertiary', onClick: function () { moveLogo( i, -1 ); }, disabled: i === 0 }, 'Up' ),
								el( Button, { variant: 'tertiary', onClick: function () { moveLogo( i, 1 ); }, disabled: i === logos.length - 1 }, 'Down' ),
								el( Button, { variant: 'tertiary', isDestructive: true, onClick: function () { removeLogo( i ); } }, 'Remove' )
							)
						);
					} ),
					el( Button, { variant: 'primary', onClick: addLogo, style: { marginTop: '12px' } }, 'Add logo' )
				)
			);

			var preview = el( 'div', useBlockProps( { style: { padding: '32px', background: '#0d0d10', color: '#f7f7f5' } } ),
				el( 'p', { style: { margin: 0, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a8a92' } },
					el( 'span', { style: { color: '#8a8a92' } }, '05' ),
					' / ',
					el( RichText, {
						tagName: 'span',
						value: a.eyebrow,
						allowedFormats: [],
						onChange: function ( v ) { props.setAttributes( { eyebrow: v } ); },
						placeholder: 'Eyebrow'
					} )
				),
				el( 'div', { style: { display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', marginTop: '24px' } },
					logos.map( function ( logo, i ) {
						return logo.url ? el( 'img', { key: i, src: logo.url, alt: logo.alt, style: { height: '48px', objectFit: 'contain', opacity: 0.72 } } ) : null;
					} )
				)
			);

			return el( Fragment, null, inspector, preview );
		},
		save: function () { return null; }
	} );
} )( window.wp );
