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

	blocks.registerBlockType( 'ees/footer-cta', {
		edit: function ( props ) {
			var a = props.attributes;
			var set = props.setAttributes;
			var links = a.links || [];

			function updateLink( i, key, val ) { var l = links.slice(); l[ i ] = Object.assign( {}, l[ i ] ); l[ i ][ key ] = val; set( { links: l } ); }
			function addLink() { set( { links: links.concat( [ { text: '', url: '' } ] ) } ); }
			function removeLink( i ) { var l = links.slice(); l.splice( i, 1 ); set( { links: l } ); }

			var blockProps = useBlockProps( { className: 'ees-footer' } );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: __( 'Button link', 'ees-sections' ), initialOpen: true },
						el( TextControl, { label: __( 'CTA link (URL)', 'ees-sections' ), value: a.ctaUrl, onChange: function ( v ) { set( { ctaUrl: v } ); } } )
					),
					el(
						PanelBody,
						{ title: __( 'Footer links', 'ees-sections' ), initialOpen: false },
						links.map( function ( link, i ) {
							return el( TextControl, {
								key: i,
								label: ( link.text || __( 'Link', 'ees-sections' ) ) + __( ' — URL', 'ees-sections' ),
								value: link.url,
								onChange: function ( v ) { updateLink( i, 'url', v ); }
							} );
						} )
					)
				),
				el(
					'div',
					blockProps,
					el( 'div', { className: 'ees-footer__inner' },
						el( 'div', { className: 'ees-footer__lead' },
							el( RichText, {
								tagName: 'h2', className: 'ees-footer__headline', value: a.headline,
								onChange: function ( v ) { set( { headline: v } ); },
								placeholder: __( 'Based in Manchester. Available worldwide.', 'ees-sections' )
							} ),
							el( RichText, {
								tagName: 'span', className: 'ees-cta', value: a.ctaText,
								allowedFormats: [], onChange: function ( v ) { set( { ctaText: v } ); },
								placeholder: __( 'GET IN TOUCH', 'ees-sections' )
							} )
						),
						el( 'div', { className: 'ees-footer__links' },
							links.map( function ( link, i ) {
								return el( 'div', { className: 'ees-footer__linkrow', key: i },
									el( RichText, {
										tagName: 'span', className: 'ees-footer__link', value: link.text,
										allowedFormats: [], onChange: function ( v ) { updateLink( i, 'text', v ); },
										placeholder: __( 'Link label', 'ees-sections' )
									} ),
									el( Button, { variant: 'link', isDestructive: true, onClick: function () { removeLink( i ); } }, '✕' )
								);
							} ),
							el( Button, { variant: 'secondary', onClick: addLink, style: { marginTop: '8px' } }, __( '+ Add link', 'ees-sections' ) )
						)
					),
					el( RichText, {
						tagName: 'p', className: 'ees-footer__copy', value: a.copyright,
						allowedFormats: [], onChange: function ( v ) { set( { copyright: v } ); },
						placeholder: __( 'All rights reserved ©2026 eaglesimbeye.com', 'ees-sections' )
					} )
				)
			);
		},
		save: function () { return null; }
	} );
} )( window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components, window.wp.i18n );
