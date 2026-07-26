( function ( wp ) {
	var el = wp.element.createElement;
	var RichText = wp.blockEditor.RichText;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;

	wp.blocks.registerBlockType( 'ees/home-mindset', {
		edit: function ( props ) {
			var a = props.attributes;
			var rows = a.rows || [];

			function setRows( next ) { props.setAttributes( { rows: next } ); }

			function updateRow( i, key, val ) {
				setRows( rows.map( function ( r, idx ) {
					if ( idx !== i ) { return r; }
					var c = Object.assign( {}, r );
					c[ key ] = val;
					return c;
				} ) );
			}

			function addRow() {
				setRows( rows.concat( [ { category: '', title: '', standfirst: '', url: '' } ] ) );
			}

			function removeRow( i ) {
				setRows( rows.filter( function ( r, idx ) { return idx !== i; } ) );
			}

			function moveRow( i, dir ) {
				var j = i + dir;
				if ( j < 0 || j >= rows.length ) { return; }
				var next = rows.slice();
				var tmp = next[ i ];
				next[ i ] = next[ j ];
				next[ j ] = tmp;
				setRows( next );
			}

			var rowEls = rows.map( function ( row, i ) {
				return el( 'div', { key: i, style: { border: '1px solid #2a2a30', borderRadius: '6px', padding: '12px', margin: '0 0 12px', background: '#0d0d10' } },
					el( 'div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
						el( 'strong', { style: { color: '#f2ea36', fontFamily: 'monospace', fontSize: '11px' } }, 'Row ' + ( i + 1 ) ),
						el( 'div', null,
							el( Button, { variant: 'secondary', disabled: i === 0, onClick: function () { moveRow( i, -1 ); } }, '↑' ),
							el( Button, { variant: 'secondary', disabled: i === rows.length - 1, onClick: function () { moveRow( i, 1 ); } }, '↓' ),
							el( Button, { variant: 'secondary', isDestructive: true, onClick: function () { removeRow( i ); } }, 'Remove' )
						)
					),
					el( TextControl, { label: 'Category', value: row.category || '', onChange: function ( v ) { updateRow( i, 'category', v ); } } ),
					el( TextControl, { label: 'Title', value: row.title || '', onChange: function ( v ) { updateRow( i, 'title', v ); } } ),
					el( TextControl, { label: 'Standfirst', value: row.standfirst || '', onChange: function ( v ) { updateRow( i, 'standfirst', v ); } } ),
					el( TextControl, { label: 'Link URL', value: row.url || '', onChange: function ( v ) { updateRow( i, 'url', v ); } } )
				);
			} );

			return el( 'div', { style: { padding: '20px', border: '1px dashed #b7b7b7', borderRadius: '8px', background: '#0d0d10', color: '#f7f7f5', fontFamily: 'system-ui' } },
				el( 'p', { style: { color: '#a8a8a4', fontFamily: 'monospace', fontSize: '11px', margin: '0 0 4px' } }, 'Home · Mindset' ),
				el( RichText, { tagName: 'p', value: a.eyebrow, allowedFormats: [], placeholder: 'Eyebrow', onChange: function ( v ) { props.setAttributes( { eyebrow: v } ); }, style: { fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a8a8a4' } } ),
				el( RichText, { tagName: 'h2', value: a.headline, allowedFormats: [], placeholder: 'Headline', onChange: function ( v ) { props.setAttributes( { headline: v } ); }, style: { fontWeight: 700, textTransform: 'uppercase', fontSize: '22px', color: '#f7f7f5', margin: '0 0 16px' } } ),
				rowEls,
				el( Button, { variant: 'primary', onClick: addRow }, 'Add row' )
			);
		},
		save: function () { return null; }
	} );
} )( window.wp );
