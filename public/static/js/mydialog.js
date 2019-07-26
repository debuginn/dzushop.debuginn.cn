var binfo = (function()
{
    var ua = navigator.userAgent.toLowerCase();
	return {
	    ie : /*@cc_on!@*/false,
		i7 : /*@cc_on!@*/false && (parseInt(ua.match(/msie (\d+)/)[1],10) >= 7)
	};
})();

var config = { opac : 0.50, bgcolor : '#fff', bzi : null, it : null, il : null };

var tool =
{
	restyle : function(e)
	{
	    e.style.cssText = 'margin:0;padding:0;background-image:none;background-color:transparent;border:0;';
	},
	
	ststyle : function( e, dict )
	{
	    var style = e.style;
		for( var n in dict ) style[n] = dict[n];
	},
	
	getestyle : function( e, p )
	{
	    if( binfo.ie )
		    return e.currentStyle[p];
		else
		    return e.ownerDocument.defaultView.getComputedStyle(e, '').getPropertyValue(p);
	},
	
	stopac : function( e, opac )
	{
	    if( binfo.ie )
		{
		    opac = Math.round( opac * 100 );
			e.style.filter = ( opac > 100 ? '' : 'alpha(opacity=' + opac + ')' );
		}
		else
		    e.style.opacity = opac;
	},
	
	getvoid : function()
	{
	    if( binfo.ie )
		    return ( binfo.i7 ? '' : 'javascript:\'\'' );
		return 'javascript:void(0)';
	},
	
	addevt : function( o, e, l )
	{
	    if( binfo.ie )
		    o.attachEvent( 'on' + e, l );
		else
		    o.addEventListener( e, l, false );
	},
	
	remevt : function( o, e, l )
	{
	    if( binfo.ie )
		    o.detachEvent( 'on' + e, l );
		else
		    o.removeEventListener( e, l, false );
	},
	
	isdtd : function(doc)
	{
	    return ( 'CSS1Compat' == ( doc.compatMode || 'CSS1Compat' ) );
	},
	
	getclsize : function(w)
	{
		if( binfo.ie )
		{
		    var oSize, doc = w.document.documentElement;
			oSize = ( doc && doc.clientWidth ) ? doc : w.document.body;
			
			if(oSize)
			    return { w : oSize.clientWidth, h : oSize.clientHeight };
			else
			    return { w : 0, h : 0 };
		}
		else
		    return { w : w.innerWidth, h : w.innerHeight };
	},
	
	getev : function()
	{
	    if(binfo.ie) return window.event;
		var func = tool.getev.caller;
		while( func != null )
		{
			var arg = func.arguments[0];
			if( arg && (arg + '').indexOf('Event') >= 0 ) return arg;
			func = func.caller;
		}
		return null;
	},
	
	getepos : function(o)
	{
		var l, t;
		if( o.getBoundingClientRect )
		{
			var el = o.getBoundingClientRect(); l = el.left; t = el.top;
		}
		else
		{
			l = o.offsetLeft - Math.max( document.documentElement.scrollLeft, document.body.scrollLeft );
			t = o.offsetTop - Math.max( document.documentElement.scrollTop, document.body.scrollTop );
		}
		return { x : l, y : t };
	},
	
	getspos : function(w)
	{
	    if( binfo.ie )
		{
		    var doc = w.document;
			var oPos = { X : doc.documentElement.scrollLeft, Y : doc.documentElement.scrollTop };
			if( oPos.X > 0 || oPos.Y > 0 ) return oPos;
			return { X : doc.body.scrollLeft, Y : doc.body.scrollTop };
		}
		else
		    return { X : w.pageXOffset, Y : w.pageYOffset };
	},
	
	getlink : function(c)
	{
	    if( c.length == 0 ) return;
		return '<' + 'link href="' + c + '" type="text/css" rel="stylesheet"/>';
	},
	
	regdoll : function(w)
	{
		if( binfo.ie )
		    w.$ = w.document.getElementById;
		else
		    w.$ = function(id){ return w.document.getElementById(id); };
	},
	
	getedoc : function(e)
	{
	    return e.ownerDocument || e.document;
	},
	
	disctmenu : function(doc)
	{
	    doc.oncontextmenu = function(e)
		{
		    e = e || event || this.parentWindow.event;
			var o = e.srcElement || e.target;
		    if( !( o.type == 'password' || o.type == 'text' || o.type == 'textarea' ) )
		    {
		        if( binfo.ie ) e.returnValue = false; else e.preventDefault();
		    }
		};
	},
	
	getpath : function()
	{
	    var bp, len, sc = document.getElementsByTagName('script');
		for( var i = 0; i < sc.length; i++ )
		{
		    bp = sc[i].src.substring( 0, sc[i].src.toLowerCase().indexOf('mydialog.js') );
			len = bp.lastIndexOf('/'); if(len>0) bp = bp.substring( 0, len + 1 ); if(bp) break;
		}
		if( binfo.ie && bp.indexOf('../') != -1 )
		{
		    var fp = window.location.href;
			fp = fp.substring( 0, fp.lastIndexOf('/') );
			while( bp.indexOf('../') >= 0 )
			{
			    bp = bp.substring(3);
				fp = fp.substring( 0, fp.lastIndexOf('/') );
			} return fp + '/' + bp;
		}else return bp;
	},
	
	remnode : function(n){ return n.parentNode.removeChild(n); }
};

var mydialog = (function()
{
    var twin = window.parent, cover;
	while( twin.parent && twin.parent != twin )
	{
	    try{ if( twin.parent.document.domain != document.domain ) break; } catch(e){break;}
		twin = twin.parent;
	}
	var tdoc = twin.document;
	
	var getzi = function()
	{
	    if(!config.bzi) config.bzi = 999; return ++config.bzi;
	};
	
	var resizehdl = function()
	{
	    if(!cover) return;
		var rel = tool.isdtd(tdoc) ? tdoc.documentElement : tdoc.body;
		tool.ststyle(cover,
		{
		    'width' : Math.max( rel.scrollWidth, rel.clientWidth, tdoc.scrollWidth || 0 ) - 1 + 'px',
			'height' : Math.max( rel.scrollHeight, rel.clientHeight, tdoc.scrollHeight || 0 ) - 1 + 'px'
		});
	};
    
    return {
		opendlg : function( t, p, w, h, c, i, n, s, l )
		{
			if(c) this.dcover(); else{ if(cover) cover = null; }
			var dinfo = { tit : t, page : p, win : window, topw : twin, link : i, sc : s };
			var clsize = tool.getclsize(twin), spos = tool.getspos(twin);
			
			var schdl = function()
			{
				var rel = tool.getspos(twin);
				tool.ststyle( dfrm, { 'top' : rel.Y + config.it + 'px', 'left' : rel.X + config.il + 'px' } );
			};
			
			var it = ( l && l.top ) ? spos.Y + l.top : Math.max( spos.Y + ( clsize.h - h - 20 ) / 2, 0 );
			var il = ( l && l.left ) ? spos.X + l.left : Math.max( spos.X + ( clsize.w - w - 20 ) / 2, 0 );
			
			var dfrm = tdoc.createElement('iframe'); tool.restyle(dfrm); if(n) dfrm.id = n;
			dfrm.frameBorder = 0; dfrm.src = tool.getpath() + 'mydialog.html';
			tool.ststyle(dfrm,
			{
			    'position' : 'absolute', 'top' : it + 'px', 'left' : il + 'px',
				'width' : w + 'px', 'height' : h + 'px', 'zIndex' : getzi()
			}); if(s){ config.it = it - spos.Y; config.il = il - spos.X; };
			if(s) tool.addevt( twin, 'scroll', schdl ); tdoc.body.appendChild(dfrm); dfrm._dlgargs = dinfo;
		},
		
		closdlg : function( d, c )
		{
			var dlg = ( 'object' == typeof(d) ) ? d.frameElement : document.getElementById(d);
			if(dlg) tool.remnode(dlg); if(c) this.hcover(c);
		},
		
		dcover : function()
		{
		    cover = tdoc.createElement('div'); tool.restyle(cover);
			tool.ststyle(cover, 
			{
				'position' : 'absolute', 'zIndex' : getzi(), 'top' : '0px',
				'left' : '0px', 'backgroundColor' : config.bgcolor
			});
			tool.stopac( cover, config.opac );
			
			if( binfo.ie && !binfo.i7 )
			{
			    var ifrm = tdoc.createElement('iframe');
				tool.restyle(ifrm); ifrm.hideFocus = true;
				ifrm.frameBorder = 0; ifrm.src = tool.getvoid();
				tool.ststyle(ifrm,
				{
				    'width' : '100%', 'height' : '100%', 'position' : 'absolute', 'left' : '0px',
					'top' : '0px', 'filter' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)'
				});
				cover.appendChild(ifrm);
			}
			
			tool.addevt( twin, 'resize', resizehdl ); resizehdl(); tdoc.body.appendChild(cover);
		},
		
		gcover : function(){ return cover; },
		hcover : function(o){ tool.remnode(o); cover = null; o = null; }
	};
})();

//网站产品树
var mytreedialog = (function()
{
    var twin = window.parent, cover;
	while( twin.parent && twin.parent != twin )
	{
	    try{ if( twin.parent.document.domain != document.domain ) break; } catch(e){break;}
		twin = twin.parent;
	}
	var tdoc = twin.document;
	
	var getzi = function()
	{
	    if(!config.bzi) config.bzi = 999; return ++config.bzi;
	};
	
	var resizehdl = function()
	{
	    if(!cover) return;
		var rel = tool.isdtd(tdoc) ? tdoc.documentElement : tdoc.body;
		tool.ststyle(cover,
		{
		    'width' : Math.max( rel.scrollWidth, rel.clientWidth, tdoc.scrollWidth || 0 ) - 1 + 'px',
			'height' : Math.max( rel.scrollHeight, rel.clientHeight, tdoc.scrollHeight || 0 ) - 1 + 'px'
		});
	};
    
    return {
		opendlg_tree : function( t, p, w, h, c, i, n, s, l )
		{
		    
			if(c) this.dcover_tree(); else{ if(cover) cover = null; }
			var dinfo = { tit : t, page : p, win : window, topw : twin, link : i, sc : s };
			var clsize = tool.getclsize(twin), spos = tool.getspos(twin);
			
			var schdl = function()
			{
				var rel = tool.getspos(twin);
				tool.ststyle( dfrm, { 'top' : rel.Y + config.it + 'px', 'left' : rel.X + config.il + 'px' } );
			};
			
			var it = ( l && l.top ) ? spos.Y + l.top : Math.max( spos.Y + ( clsize.h - h - 20 ) / 2, 0 );
			var il = ( l && l.left ) ? spos.X + l.left : Math.max( spos.X + ( clsize.w - w - 20 ) / 2, 0 );
			
			var dfrm = tdoc.createElement('iframe'); tool.restyle(dfrm); if(n) dfrm.id = n;
			dfrm.frameBorder = 0; dfrm.src = tool.getpath() + 'mytreedialog.html';
			tool.ststyle(dfrm,
			{
			    'position' : 'absolute', 'top' : it + 'px', 'left' : il + 'px',
				'width' : w + 'px', 'height' : h + 'px', 'zIndex' : getzi()
			}); if(s){ config.it = it - spos.Y; config.il = il - spos.X; };
			if(s) tool.addevt( twin, 'scroll', schdl ); tdoc.body.appendChild(dfrm); dfrm._dlgargs = dinfo;
		},
		
		closdlg_tree : function( d, c )
		{
		    isopenwin=0;
			var dlg = ( 'object' == typeof(d) ) ? d.frameElement : document.getElementById(d);
			if(dlg) tool.remnode(dlg); if(c) this.hcover_tree(c);
		},
		
		dcover_tree : function()
		{
		    cover = tdoc.createElement('div'); tool.restyle(cover);
			tool.ststyle(cover, 
			{
				'position' : 'absolute', 'zIndex' : getzi(), 'top' : '0px',
				'left' : '0px', 'backgroundColor' : config.bgcolor
			});
			tool.stopac( cover, config.opac );
			
			if( binfo.ie && !binfo.i7 )
			{
			    var ifrm = tdoc.createElement('iframe');
				tool.restyle(ifrm); ifrm.hideFocus = true;
				ifrm.frameBorder = 0; ifrm.src = tool.getvoid();
				tool.ststyle(ifrm,
				{
				    'width' : '100%', 'height' : '100%', 'position' : 'absolute', 'left' : '0px',
					'top' : '0px', 'filter' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)'
				});
				cover.appendChild(ifrm);
			}
			
			tool.addevt( twin, 'resize', resizehdl ); resizehdl(); tdoc.body.appendChild(cover);
		},
		
		gcover_tree : function(){ return cover; },
		hcover_tree : function(o){ tool.remnode(o); cover = null; o = null; }
	};
})();