( function ( blocks, blockEditor, element, components, i18n ) {
	'use strict';
	var el = element.createElement;
	var Fragment = element.Fragment;
	var useBlockProps = blockEditor.useBlockProps;
	var RichText = blockEditor.RichText;
	var InspectorControls = blockEditor.InspectorControls;
	var PanelBody = components.PanelBody;
	var TextControl = components.TextControl;
	var Button = components.Button;
	var __ = i18n.__;

	blocks.registerBlockType( 'ees/article-rows', {
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
			function add() { set( { rows: rows.concat( [ { category: '', title: '', standfirst: '', url: '' } ] ) } ); }
			function remove( i ) { var r = rows.slice(); r.splice( i, 1 ); set( { rows: r } ); }

			var blockProps = useBlockProps( { className: 'ees-articles' } );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Article links', 'ees-sections' ), initialOpen: true },
						rows.length ? rows.map( function ( row, i ) {
							return el( TextControl, {
								key: i,
								label: __( 'Row ', 'ees-sections' ) + ( i + 1 ) + __( ' — link (URL)', 'ees-sections' ),
								value: row.url,
								onChange: function ( v ) { update( i, 'url', v ); }
							} );
						} ) : el( 'p', { style: { opacity: 0.7 } }, __( 'Add a row to set its link.', 'ees-sections' ) )
					)
				),
				el(
					'div',
					blockProps,
					el( RichText, {
						tagName: 'p', className: 'ees-articles__eyebrow', value: a.eyebrow,
						allowedFormats: [], onChange: function ( v ) { set( { eyebrow: v } ); },
						placeholder: __( '06 / Mindset', 'ees-sections' )
					} ),
					el( RichText, {
						tagName: 'h2', className: 'ees-articles__headline', value: a.headline,
						onChange: function ( v ) { set( { headline: v } ); },
						placeholder: __( 'Section headline…', 'ees-sections' )
					} ),
					el(
						'div', { className: 'ees-articles__list' },
						rows.map( function ( row, i ) {
							return el(
								'div', { className: 'ees-article', key: i },
								el( RichText, {
									tagName: 'span', className: 'ees-article__cat', value: row.category,
									allowedFormats: [], onChange: function ( v ) { update( i, 'category', v ); },
									placeholder: __( 'CATEGORY', 'ees-sections' )
								} ),
								el( RichText, {
									tagName: 'span', className: 'ees-article__title', value: row.title,
									onChange: function ( v ) { update( i, 'title', v ); },
									placeholder: __( 'Article title', 'ees-sections' )
								} ),
								el( RichText, {
									tagName: 'span', className: 'ees-article__stand', value: row.standfirst,
									onChange: function ( v ) { update( i, 'standfirst', v ); },
									placeholder: __( 'One-line standfirst', 'ees-sections' )
								} ),
								el( Button, {
									className: 'ees-article__del', variant: 'link', isDestructive: true,
									onClick: function () { remove( i ); }, label: __( 'Remove row', 'ees-sections' )
								}, '✕' )
							);
						} )
					),
					el( Button, { variant: 'secondary', onClick: add, style: { marginTop: '12px' } },
						__( '+ Add article', 'ees-sections' ) )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
