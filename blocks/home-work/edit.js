( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;

	wp.blocks.registerBlockType( 'ees/home-work', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = function ( key ) {
				return function ( value ) {
					var o = {};
					o[ key ] = value;
					props.setAttributes( o );
				};
			};
			var caseImg = a.caseImage || {};

			return el( Fragment, null,
				el( InspectorControls, null,
					el( PanelBody, { title: 'Links', initialOpen: true },
						el( TextControl, { label: 'CTA URL', value: a.ctaUrl, onChange: set( 'ctaUrl' ) } ),
						el( TextControl, { label: 'Case URL', value: a.caseUrl, onChange: set( 'caseUrl' ) } )
					),
					el( PanelBody, { title: 'Featured case image', initialOpen: false },
						el( MediaUpload, {
							onSelect: function ( m ) {
								props.setAttributes( { caseImage: { id: m.id, url: m.url, alt: m.alt || '' } } );
							},
							allowedTypes: [ 'image' ],
							value: caseImg.id,
							render: function ( o ) {
								return el( Fragment, null,
									caseImg.url ? el( 'img', { src: caseImg.url, alt: caseImg.alt || '', style: { display: 'block', width: '100%', height: 'auto', marginBottom: '8px' } } ) : null,
									el( Button, { variant: 'secondary', onClick: o.open }, caseImg.url ? 'Replace image' : 'Select image' ),
									caseImg.url ? el( Button, { variant: 'link', isDestructive: true, onClick: function () { props.setAttributes( { caseImage: { id: 0, url: '', alt: '' } } ); } }, 'Remove' ) : null
								);
							}
						} )
					)
				),
				el( 'div', { style: { padding: '24px', background: '#08080a', color: '#f7f7f5', fontFamily: 'system-ui, sans-serif' } },
					el( 'p', { style: { margin: '0 0 20px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } },
						el( 'span', { style: { color: '#8a8a92' } }, '04' ),
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
						value: a.headline,
						allowedFormats: [],
						onChange: set( 'headline' ),
						placeholder: 'Headline',
						style: { margin: '0 0 24px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.05, color: '#8a8a92' }
					} ),
					el( RichText, {
						tagName: 'p',
						value: a.body1,
						onChange: set( 'body1' ),
						placeholder: 'Intro paragraph',
						style: { margin: '0 0 32px', maxWidth: '54ch', lineHeight: 1.6, color: '#a8a8a4' }
					} ),
					el( RichText, {
						tagName: 'span',
						value: a.ctaText,
						allowedFormats: [],
						onChange: set( 'ctaText' ),
						placeholder: 'CTA label',
						style: { display: 'inline-block', marginBottom: '32px', padding: '13px 22px', border: '1px solid rgba(247,247,245,0.22)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f7f7f5' }
					} ),
					caseImg.url ? el( 'img', { src: caseImg.url, alt: caseImg.alt || '', style: { display: 'block', width: '100%', height: 'auto', marginBottom: '24px' } } ) : null,
					el( RichText, {
						tagName: 'p',
						value: a.caseKicker,
						allowedFormats: [],
						onChange: set( 'caseKicker' ),
						placeholder: 'Case kicker',
						style: { margin: '0 0 16px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8a8a92' }
					} ),
					el( RichText, {
						tagName: 'h3',
						value: a.caseTitle,
						allowedFormats: [],
						onChange: set( 'caseTitle' ),
						placeholder: 'Case title',
						style: { margin: '0 0 16px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.06, letterSpacing: '-0.02em' }
					} ),
					el( RichText, {
						tagName: 'p',
						value: a.caseStandfirst,
						onChange: set( 'caseStandfirst' ),
						placeholder: 'Case standfirst',
						style: { margin: 0, lineHeight: 1.6, color: '#a8a8a4' }
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp );
