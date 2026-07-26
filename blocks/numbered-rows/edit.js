( function ( blocks, blockEditor, element, components, i18n ) {
	'use strict';
	var el = element.createElement;
	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var Button = components.Button;
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/numbered-rows', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var rows = a.rows || [];

			function update( i, key, val ) {
				var r = rows.slice();
				r[ i ] = Object.assign( {}, r[ i ] );
				r[ i ][ key ] = val;
				set( { rows: r } );
			}
			function add() { set( { rows: rows.concat( [ { title: '', desc: '' } ] ) } ); }
			function remove( i ) { var r = rows.slice(); r.splice( i, 1 ); set( { rows: r } ); }

			var blockProps = useBlockProps( { className: 'ees-rows' } );

			return el(
				'div',
				blockProps,
				el( RichText, {
					tagName: 'p', className: 'ees-rows__eyebrow', value: a.eyebrow,
					allowedFormats: [], onChange: function ( v ) { set( { eyebrow: v } ); },
					placeholder: __( '03 / Focus area', 'ees-sections' )
				} ),
				el( RichText, {
					tagName: 'h2', className: 'ees-rows__headline', value: a.headline,
					onChange: function ( v ) { set( { headline: v } ); },
					placeholder: __( 'Section headline…', 'ees-sections' )
				} ),
				el(
					'div', { className: 'ees-rows__list' },
					rows.map( function ( row, i ) {
						return el(
							'div', { className: 'ees-row', key: i },
							el( 'span', { className: 'ees-row__num' }, ( '0' + ( i + 1 ) ).slice( -2 ) ),
							el( RichText, {
								tagName: 'span', className: 'ees-row__title', value: row.title,
								onChange: function ( v ) { update( i, 'title', v ); },
								placeholder: __( 'Row title', 'ees-sections' )
							} ),
							el( RichText, {
								tagName: 'span', className: 'ees-row__desc', value: row.desc,
								onChange: function ( v ) { update( i, 'desc', v ); },
								placeholder: __( 'Row description', 'ees-sections' )
							} ),
							el( Button, {
								className: 'ees-row__del', variant: 'link', isDestructive: true,
								onClick: function () { remove( i ); }, label: __( 'Remove row', 'ees-sections' )
							}, '✕' )
						);
					} )
				),
				el( Button, { variant: 'secondary', onClick: add, style: { marginTop: '12px' } },
					__( '+ Add row', 'ees-sections' ) )
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
