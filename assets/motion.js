/* EES Sections — front-end motion (GSAP + Lenis), scoped to the EES block markup.
   Robust progressive enhancement: if GSAP is absent or reduced-motion is set,
   content stays fully visible; only the chrome (nav/navigator/cursor) is wired. */
( function () {
	'use strict';

	var REVEAL = '.ees-hero__inner, .ees-statement .ees-inner, .ees-spotlight__inner, .ees-rows__inner, .ees-articles__inner, .ees-logos__inner, .ees-footer__inner, .ees-case';
	var HEADLINES = '.ees-statement .ees-headline, .ees-spotlight__statement, .ees-rows__headline, .ees-articles__headline, .ees-footer__headline, .ees-row__title, .ees-article__title';
	var SECTIONS = '.ees-statement, .ees-spotlight, .ees-rows, .ees-logos, .ees-articles';
	var reduce = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	function ready( fn ) {
		if ( document.readyState !== 'loading' ) { fn(); } else { document.addEventListener( 'DOMContentLoaded', fn ); }
	}

	function words( el ) {
		if ( el.children.length ) { return null; }
		var parts = el.textContent.split( /(\s+)/ ), out = [];
		el.textContent = '';
		parts.forEach( function ( p ) {
			if ( /^\s+$/.test( p ) ) { el.appendChild( document.createTextNode( p ) ); return; }
			var s = document.createElement( 'span' );
			s.className = 'ees-w'; s.style.display = 'inline-block'; s.textContent = p;
			el.appendChild( s ); out.push( s );
		} );
		return out;
	}

	/* ---- On-this-page navigator ---- */
	function buildNavigator() {
		var host = document.querySelector( '[data-ees-navigator]' );
		if ( ! host ) { return []; }
		var secs = Array.prototype.slice.call( document.querySelectorAll( SECTIONS ) );
		var items = [];
		secs.forEach( function ( sec, i ) {
			var eb = sec.querySelector( '[class*="__eyebrow"], .ees-eyebrow, p' );
			var label = eb ? eb.textContent.replace( /^\s*[0-9]+\s*\/\s*/, '' ).trim() : ( 'Section ' + ( i + 1 ) );
			if ( label.length > 22 ) { label = label.slice( 0, 22 ); }
			var b = document.createElement( 'button' );
			b.type = 'button'; b.className = 'ees-nav2__item';
			b.innerHTML = '<span class="ees-nav2__idx">' + ( '0' + ( i + 1 ) ).slice( -2 ) + '</span><span class="ees-nav2__name">' + label + '</span>';
			b.addEventListener( 'click', function () {
				if ( window.__eesLenis ) { window.__eesLenis.scrollTo( sec, { offset: -20 } ); }
				else { sec.scrollIntoView( { behavior: 'smooth' } ); }
			} );
			host.appendChild( b );
			items.push( { el: sec, btn: b } );
		} );
		host.setAttribute( 'data-ready', '1' );
		return items;
	}

	function header() {
		var h = document.querySelector( '[data-ees-header]' );
		if ( ! h ) { return; }
		var upd = function () { h.classList.toggle( 'is-scrolled', window.scrollY > 40 ); };
		upd(); window.addEventListener( 'scroll', upd, { passive: true } );
	}

	function cursor( g ) {
		var c = document.querySelector( '[data-ees-cross]' );
		if ( ! c || ! g || ! window.matchMedia( '(hover: hover) and (pointer: fine)' ).matches ) { return; }
		var v = c.querySelector( '.ees-cross__v' ), hz = c.querySelector( '.ees-cross__h' ), disc = c.querySelector( '.ees-cross__disc' );
		var xTo = g.quickTo( v, 'x', { duration: 0.42, ease: 'power3' } );
		var yTo = g.quickTo( hz, 'y', { duration: 0.42, ease: 'power3' } );
		var dx = g.quickTo( disc, 'x', { duration: 0.28, ease: 'power3' } );
		var dy = g.quickTo( disc, 'y', { duration: 0.28, ease: 'power3' } );
		var shown = false;
		window.addEventListener( 'mousemove', function ( e ) {
			if ( ! shown ) { shown = true; g.to( c, { opacity: 1, duration: 0.5 } ); }
			xTo( e.clientX ); yTo( e.clientY ); dx( e.clientX ); dy( e.clientY );
		}, { passive: true } );
		document.querySelectorAll( 'a,button' ).forEach( function ( el ) {
			el.addEventListener( 'mouseenter', function () { g.to( disc, { scale: 3.2, duration: 0.45, ease: 'expo.out' } ); } );
			el.addEventListener( 'mouseleave', function () { g.to( disc, { scale: 1, duration: 0.5, ease: 'expo.out' } ); } );
		} );
	}

	ready( function () {
		var items = buildNavigator();
		header();

		var g = window.gsap, ST = window.ScrollTrigger, Lenis = window.Lenis;

		function paint( active ) { items.forEach( function ( it ) { it.btn.classList.toggle( 'is-active', it === active ); } ); }

		if ( reduce || ! g || ! ST ) {
			// static: nav still tracks on scroll
			window.addEventListener( 'scroll', function () {
				var best = null, bd = Infinity;
				items.forEach( function ( it ) { var d = Math.abs( it.el.getBoundingClientRect().top - window.innerHeight * 0.4 ); if ( d < bd ) { bd = d; best = it; } } );
				paint( best );
			}, { passive: true } );
			return;
		}

		g.registerPlugin( ST );

		if ( Lenis ) {
			var lenis = new Lenis( { duration: 1.1, easing: function ( t ) { return Math.min( 1, 1.001 - Math.pow( 2, -10 * t ) ); }, smoothWheel: true } );
			window.__eesLenis = lenis;
			lenis.on( 'scroll', ST.update );
			var lenisRaf = function ( t ) { lenis.raf( t * 1000 ); };
			g.ticker.add( lenisRaf ); g.ticker.lagSmoothing( 0 );
		}

		document.querySelectorAll( REVEAL ).forEach( function ( el, i ) {
			var rise = [ 46, 64, 0 ][ i % 3 ], ease = [ 'expo.out', 'power3.out', 'sine.out' ][ i % 3 ];
			g.from( el, { y: rise, autoAlpha: 0, duration: 1.05, ease: ease, scrollTrigger: { trigger: el, start: 'top 86%' } } );
		} );

		document.querySelectorAll( HEADLINES ).forEach( function ( el ) {
			var w = words( el );
			if ( ! w ) { return; }
			g.set( w, { opacity: 0.26 } );
			g.to( w, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 88%', end: 'bottom 55%', scrub: 1 } } );
		} );

		var heroBits = document.querySelectorAll( '.ees-hero__eyebrow, .ees-hero__headline, .ees-hero__meta, .ees-hero .ees-cta' );
		if ( heroBits.length ) { g.from( heroBits, { y: 22, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.15 } ); }

		items.forEach( function ( it ) {
			ST.create( { trigger: it.el, start: 'top 55%', end: 'bottom 45%', onToggle: function ( self ) { if ( self.isActive ) { paint( it ); } } } );
		} );

		cursor( g );

		var refresh = function () { ST.refresh(); };
		window.addEventListener( 'load', refresh );
		if ( document.fonts && document.fonts.ready ) { document.fonts.ready.then( refresh ); }
	} );
} )();
