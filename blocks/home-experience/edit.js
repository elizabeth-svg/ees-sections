( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;

	wp.blocks.registerBlockType( 'ees/home-experience', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = function ( key ) {
				return function ( value ) {
					var o = {};
					o[ key ] = value;
					props.setAttributes( o );
				};
			};

			return el( Fragment, null,
				el( InspectorControls, null,
					el( PanelBody, { title: 'Links', initialOpen: true },
						el( TextControl, {
							label: 'CTA URL',
							value: a.ctaUrl,
							onChange: set( 'ctaUrl' )
						} )
					)
				),
				el( 'div', { style: { padding: '24px', background: '#08080a', color: '#f7f7f5', fontFamily: 'system-ui, sans-serif' } },
					el( 'p', { style: { margin: '0 0 20px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } },
						el( 'span', { style: { color: '#8a8a92' } }, '01' ),
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
						placeholder: 'Body paragraph 1',
						style: { margin: '0 0 16px', maxWidth: '54ch', lineHeight: 1.6, color: '#a8a8a4' }
					} ),
					el( RichText, {
						tagName: 'p',
						value: a.body2,
						onChange: set( 'body2' ),
						placeholder: 'Body paragraph 2',
						style: { margin: '0 0 24px', maxWidth: '54ch', lineHeight: 1.6, color: '#a8a8a4' }
					} ),
					el( RichText, {
						tagName: 'span',
						value: a.ctaText,
						allowedFormats: [],
						onChange: set( 'ctaText' ),
						placeholder: 'CTA label',
						style: { display: 'inline-block', padding: '13px 22px', border: '1px solid rgba(247,247,245,0.22)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f7f7f5' }
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp );
