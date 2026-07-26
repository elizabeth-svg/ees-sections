( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;

	function moveItem( arr, from, to ) {
		var copy = arr.slice();
		var item = copy.splice( from, 1 )[ 0 ];
		copy.splice( to, 0, item );
		return copy;
	}

	// Renders an editable label/url (+ optional color) list for one attribute key.
	function linkListPanel( props, title, key, withColor ) {
		var list = props.attributes[ key ] || [];

		function update( i, patch ) {
			var next = list.slice();
			next[ i ] = Object.assign( {}, next[ i ], patch );
			props.setAttributes( wrap( key, next ) );
		}
		function add() {
			var blank = withColor ? { label: '', url: '', color: '#f7f7f5' } : { label: '', url: '' };
			props.setAttributes( wrap( key, list.concat( [ blank ] ) ) );
		}
		function remove( i ) {
			props.setAttributes( wrap( key, list.filter( function ( _item, j ) { return j !== i; } ) ) );
		}
		function move( i, dir ) {
			var to = i + dir;
			if ( to < 0 || to >= list.length ) { return; }
			props.setAttributes( wrap( key, moveItem( list, i, to ) ) );
		}
		function wrap( k, v ) {
			var o = {};
			o[ k ] = v;
			return o;
		}

		return el( PanelBody, { title: title, initialOpen: false },
			list.map( function ( item, i ) {
				var controls = [
					el( 'strong', { key: 'h' }, title + ' ' + ( i + 1 ) ),
					el( TextControl, {
						key: 'label',
						label: 'Label',
						value: item.label,
						onChange: function ( v ) { update( i, { label: v } ); }
					} ),
					el( TextControl, {
						key: 'url',
						label: 'URL',
						value: item.url,
						onChange: function ( v ) { update( i, { url: v } ); }
					} )
				];
				if ( withColor ) {
					controls.push( el( TextControl, {
						key: 'color',
						label: 'Text colour',
						value: item.color,
						onChange: function ( v ) { update( i, { color: v } ); }
					} ) );
				}
				controls.push( el( 'div', { key: 'btns', style: { display: 'flex', gap: '4px', marginTop: '6px' } },
					el( Button, { variant: 'tertiary', onClick: function () { move( i, -1 ); }, disabled: i === 0 }, 'Up' ),
					el( Button, { variant: 'tertiary', onClick: function () { move( i, 1 ); }, disabled: i === list.length - 1 }, 'Down' ),
					el( Button, { variant: 'tertiary', isDestructive: true, onClick: function () { remove( i ); } }, 'Remove' )
				) );
				return el( 'div', { key: i, style: { borderTop: '1px solid #ddd', paddingTop: '12px', marginTop: '12px' } }, controls );
			} ),
			el( Button, { variant: 'primary', onClick: add, style: { marginTop: '12px' } }, 'Add ' + title )
		);
	}

	wp.blocks.registerBlockType( 'ees/home-footer', {
		edit: function ( props ) {
			var a = props.attributes;

			var inspector = el( InspectorControls, null,
				el( PanelBody, { title: 'Call to action', initialOpen: true },
					el( TextControl, {
						label: 'CTA text',
						value: a.ctaText,
						onChange: function ( v ) { props.setAttributes( { ctaText: v } ); }
					} ),
					el( TextControl, {
						label: 'CTA URL',
						value: a.ctaUrl,
						onChange: function ( v ) { props.setAttributes( { ctaUrl: v } ); }
					} )
				),
				linkListPanel( props, 'Quick links', 'quickLinks', true ),
				linkListPanel( props, 'Socials', 'socialLinks', false )
			);

			var preview = el( 'div', useBlockProps( { style: { padding: '40px', background: '#0b0b0e', color: '#f7f7f5' } } ),
				el( RichText, {
					tagName: 'h2',
					value: a.headline,
					allowedFormats: [],
					onChange: function ( v ) { props.setAttributes( { headline: v } ); },
					placeholder: 'Footer headline',
					style: { margin: '0 0 24px', maxWidth: '18ch', textTransform: 'uppercase', fontWeight: 700, lineHeight: 1.04, color: '#f7f7f5' }
				} ),
				el( 'p', { style: { margin: '0 0 24px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f7f7f5', border: '1px solid rgba(247,247,245,0.22)', display: 'inline-block', padding: '13px 22px' } }, a.ctaText ),
				el( 'div', { style: { display: 'flex', gap: '48px', flexWrap: 'wrap', marginTop: '16px' } },
					el( 'div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
						el( 'p', { style: { margin: 0, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } }, 'Quick links' ),
						( a.quickLinks || [] ).map( function ( link, i ) {
							return el( 'span', { key: i, style: { fontSize: '0.875rem', color: link.color || '#f7f7f5' } }, link.label );
						} )
					),
					el( 'div', { style: { display: 'flex', flexDirection: 'column', gap: '8px' } },
						el( 'p', { style: { margin: 0, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } }, 'Socials' ),
						( a.socialLinks || [] ).map( function ( link, i ) {
							return el( 'span', { key: i, style: { fontSize: '0.875rem', color: '#f7f7f5' } }, link.label );
						} )
					)
				),
				el( RichText, {
					tagName: 'p',
					value: a.copyright,
					allowedFormats: [],
					onChange: function ( v ) { props.setAttributes( { copyright: v } ); },
					placeholder: 'Copyright line',
					style: { marginTop: '40px', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' }
				} )
			);

			return el( Fragment, null, inspector, preview );
		},
		save: function () { return null; }
	} );
} )( window.wp );
