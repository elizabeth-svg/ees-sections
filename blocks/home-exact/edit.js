( function ( wp ) {
	var el = wp.element.createElement;
	wp.blocks.registerBlockType( 'ees/home-exact', {
		edit: function () {
			return el(
				'div',
				{ style: { padding: '28px', border: '1px dashed #b7b7b7', borderRadius: '10px', fontFamily: 'system-ui, sans-serif', background: '#0d0d10', color: '#f2ea36' } },
				el( 'strong', { style: { fontSize: '15px' } }, 'EES Home — exact design' ),
				el( 'p', { style: { color: '#cfcfcf', margin: '8px 0 0', fontSize: '13px', lineHeight: 1.5 } },
					'The full home page (hero scatter mosaic, wordmark flight, spotlight travel, motion engine) renders on the live page. Preview it on the front end.' )
			);
		},
		save: function () { return null; }
	} );
} )( window.wp );
