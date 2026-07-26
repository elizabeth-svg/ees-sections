( function ( wp ) {
	var el = wp.element.createElement;
	wp.blocks.registerBlockType( 'ees/home-approach', {
		edit: function () {
			return el( 'div', { style:{padding:'20px',border:'1px dashed #b7b7b7',borderRadius:'8px',background:'#0d0d10',color:'#f2ea36',fontFamily:'system-ui'} },
				el('strong',null,'Home · Approach'),
				el('p',{style:{color:'#cfcfcf',margin:'6px 0 0',fontSize:'12px'}},'Renders on the front end with full motion. Editable fields coming in the next pass.') );
		},
		save: function () { return null; }
	} );
} )( window.wp );
