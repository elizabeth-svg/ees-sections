( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var RichText = wp.blockEditor.RichText;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var MediaUploadCheck = wp.blockEditor.MediaUploadCheck;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var PanelBody = wp.components.PanelBody;
	var TextControl = wp.components.TextControl;
	var Button = wp.components.Button;

	// Image tile picker: attribute holds { id, url, alt }.
	function tilePanel( attributes, setAttributes, key, label ) {
		var tile = attributes[ key ] || {};
		return el(
			PanelBody,
			{ title: label, initialOpen: false },
			el(
				MediaUploadCheck,
				null,
				el( MediaUpload, {
					allowedTypes: [ 'image' ],
					value: tile.id,
					onSelect: function ( media ) {
						setAttributes(
							( function () {
								var o = {};
								o[ key ] = {
									id: media.id,
									url: media.url,
									alt: media.alt || ''
								};
								return o;
							} )()
						);
					},
					render: function ( o ) {
						return el(
							Fragment,
							null,
							tile.url
								? el( 'img', {
										src: tile.url,
										alt: tile.alt || '',
										style: {
											display: 'block',
											width: '100%',
											height: 'auto',
											marginBottom: '8px'
										}
								  } )
								: null,
							el(
								Button,
								{ variant: 'secondary', onClick: o.open },
								tile.url ? 'Replace' : 'Select image'
							),
							tile.url
								? el(
										Button,
										{
											variant: 'tertiary',
											isDestructive: true,
											onClick: function () {
												setAttributes(
													( function () {
														var r = {};
														r[ key ] = {
															id: 0,
															url: '',
															alt: ''
														};
														return r;
													} )()
												);
											}
										},
										'Remove'
								  )
								: null
						);
					}
				} )
			)
		);
	}

	// Media picker that stores only a URL string (video / poster).
	function urlMediaPanel( attributes, setAttributes, key, label, type ) {
		var url = attributes[ key ] || '';
		return el(
			MediaUploadCheck,
			null,
			el( MediaUpload, {
				allowedTypes: [ type ],
				onSelect: function ( media ) {
					var o = {};
					o[ key ] = media.url;
					setAttributes( o );
				},
				render: function ( o ) {
					return el(
						Fragment,
						null,
						type === 'image' && url
							? el( 'img', {
									src: url,
									alt: '',
									style: {
										display: 'block',
										width: '100%',
										height: 'auto',
										marginBottom: '8px'
									}
							  } )
							: null,
						el(
							Button,
							{ variant: 'secondary', onClick: o.open },
							url ? 'Replace' : 'Select ' + label
						)
					);
				}
			} )
		);
	}

	wp.blocks.registerBlockType( 'ees/home-hero', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps( {
				style: {
					padding: '28px',
					background: '#08080a',
					color: '#f7f7f5',
					fontFamily: 'system-ui, sans-serif'
				}
			} );

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: 'Showreel', initialOpen: false },
						urlMediaPanel(
							attributes,
							setAttributes,
							'reelVideoUrl',
							'video',
							'video'
						),
						el( TextControl, {
							label: 'Video URL',
							value: attributes.reelVideoUrl,
							onChange: function ( v ) {
								setAttributes( { reelVideoUrl: v } );
							}
						} ),
						urlMediaPanel(
							attributes,
							setAttributes,
							'reelPosterUrl',
							'poster image',
							'image'
						)
					),
					el(
						PanelBody,
						{ title: 'Stage 2 CTA', initialOpen: false },
						el( TextControl, {
							label: 'CTA URL',
							value: attributes.stage2CtaUrl,
							onChange: function ( v ) {
								setAttributes( { stage2CtaUrl: v } );
							}
						} )
					),
					tilePanel( attributes, setAttributes, 'tile1', 'Tile 1 · top left' ),
					tilePanel( attributes, setAttributes, 'tile2', 'Tile 2 · top centre' ),
					tilePanel( attributes, setAttributes, 'tile3', 'Tile 3 · top right' ),
					tilePanel( attributes, setAttributes, 'tile4', 'Tile 4 · mid left' ),
					tilePanel( attributes, setAttributes, 'tile5', 'Tile 5 · mid right' ),
					tilePanel( attributes, setAttributes, 'tile6', 'Tile 6 · bottom left' ),
					tilePanel( attributes, setAttributes, 'tile7', 'Tile 7 · bottom centre' ),
					tilePanel( attributes, setAttributes, 'tile8', 'Tile 8 · bottom right' )
				),
				el(
					'div',
					blockProps,
					el( RichText, {
						tagName: 'p',
						value: attributes.eyebrow,
						allowedFormats: [],
						onChange: function ( v ) {
							setAttributes( { eyebrow: v } );
						},
						placeholder: 'Eyebrow',
						style: {
							fontFamily: 'monospace',
							fontSize: '11px',
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
							color: '#a8a8a4',
							margin: '0 0 12px'
						}
					} ),
					el( RichText, {
						tagName: 'h1',
						value: attributes.headline,
						allowedFormats: [],
						onChange: function ( v ) {
							setAttributes( { headline: v } );
						},
						placeholder: 'Headline',
						style: {
							fontFamily: "'Poppins', sans-serif",
							fontWeight: 700,
							fontSize: '28px',
							lineHeight: 1,
							letterSpacing: '-0.02em',
							textTransform: 'uppercase',
							margin: '0 0 18px'
						}
					} ),
					el(
						'div',
						{
							style: {
								display: 'flex',
								gap: '16px',
								flexWrap: 'wrap',
								fontFamily: 'monospace',
								fontSize: '11px',
								letterSpacing: '0.16em',
								textTransform: 'uppercase',
								color: '#8a8a92',
								margin: '0 0 18px'
							}
						},
						el( RichText, {
							tagName: 'span',
							value: attributes.meta1,
							allowedFormats: [],
							onChange: function ( v ) {
								setAttributes( { meta1: v } );
							},
							placeholder: 'Meta 1'
						} ),
						el( RichText, {
							tagName: 'span',
							value: attributes.meta2,
							allowedFormats: [],
							onChange: function ( v ) {
								setAttributes( { meta2: v } );
							},
							placeholder: 'Meta 2'
						} ),
						el( RichText, {
							tagName: 'span',
							value: attributes.meta3,
							allowedFormats: [],
							onChange: function ( v ) {
								setAttributes( { meta3: v } );
							},
							placeholder: 'Meta 3'
						} )
					),
					el( RichText, {
						tagName: 'p',
						value: attributes.stage2Statement,
						allowedFormats: [],
						onChange: function ( v ) {
							setAttributes( { stage2Statement: v } );
						},
						placeholder: 'Stage 2 statement',
						style: {
							fontSize: '18px',
							fontWeight: 500,
							lineHeight: 1.16,
							margin: '0 0 12px'
						}
					} ),
					el( RichText, {
						tagName: 'p',
						value: attributes.stage2Strap,
						allowedFormats: [],
						onChange: function ( v ) {
							setAttributes( { stage2Strap: v } );
						},
						placeholder: 'Stage 2 strap',
						style: {
							fontFamily: 'monospace',
							fontSize: '11px',
							letterSpacing: '0.18em',
							textTransform: 'uppercase',
							color: '#a8a8a4',
							margin: '0 0 12px'
						}
					} ),
					el( RichText, {
						tagName: 'span',
						value: attributes.stage2CtaText,
						allowedFormats: [],
						onChange: function ( v ) {
							setAttributes( { stage2CtaText: v } );
						},
						placeholder: 'CTA label',
						style: {
							display: 'inline-block',
							fontFamily: 'monospace',
							fontSize: '11px',
							letterSpacing: '0.16em',
							textTransform: 'uppercase',
							border: '1px solid rgba(247,247,245,0.22)',
							padding: '13px 22px'
						}
					} )
				)
			);
		},
		save: function () {
			return null;
		}
	} );
} )( window.wp );
