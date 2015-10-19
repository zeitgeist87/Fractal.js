/*
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this page.
 *
 * Copyright (C) 2014  Andreas Rohner
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 */

var Color = (function (Color){
	"use strict";

	// Check for double inclusion
	if (Color.parse)
		return Color;

	var colorNames={
		aliceblue:'#f0f8ff', antiquewhite:'#faebd7', aqua:'#00ffff',
		aquamarine:'#7fffd4', azure:'#f0ffff', beige:'#f5f5dc',
		bisque:'#ffe4c4', black:'#000000', blanchedalmond:'#ffebcd',
		blue:'#0000ff', blueviolet:'#8a2be2', brown:'#a52a2a',
		burlywood:'#deb887', cadetblue:'#5f9ea0', chartreuse:'#7fff00',
		chocolate:'#d2691e', coral:'#ff7f50', cornflowerblue:'#6495ed',
		cornsilk:'#fff8dc', crimson:'#dc143c', cyan:'#00ffff',
		darkblue:'#00008b', darkcyan:'#008b8b', darkgoldenrod:'#b8860b',
		darkgray:'#a9a9a9', darkgreen:'#006400', darkkhaki:'#bdb76b',
		darkmagenta:'#8b008b', darkolivegreen:'#556b2f', darkorange:'#ff8c00',
		darkorchid:'#9932cc', darkred:'#8b0000', darksalmon:'#e9967a',
		darkseagreen:'#8fbc8f', darkslateblue:'#483d8b', darkslategray:'#2f4f4f',
		darkturquoise:'#00ced1', darkviolet:'#9400d3', deeppink:'#ff1493',
		deepskyblue:'#00bfff', dimgray:'#696969', dodgerblue:'#1e90ff',
		firebrick:'#b22222', floralwhite:'#fffaf0',
		forestgreen:'#228b22', fuchsia:'#ff00ff', gainsboro:'#dcdcdc',
		ghostwhite:'#f8f8ff', gold:'#ffd700', goldenrod:'#daa520', gray:'#808080',
		green:'#008000', greenyellow:'#adff2f', honeydew:'#f0fff0',
		hotpink:'#ff69b4', indianred:'#cd5c5c', indigo:'#4b0082',
		ivory:'#fffff0', khaki:'#f0e68c', lavender:'#e6e6fa',
		lavenderblush:'#fff0f5', lawngreen:'#7cfc00', lemonchiffon:'#fffacd',
		lightblue:'#add8e6', lightcoral:'#f08080', lightcyan:'#e0ffff',
		lightgoldenrodyellow:'#fafad2', lightgray:'#d3d3d3', lightgreen:'#90ee90',
		lightpink:'#ffb6c1', lightsalmon:'#ffa07a', lightseagreen:'#20b2aa',
		lightskyblue:'#87cefa', lightslategray:'#778899', lightsteelblue:'#b0c4de',
		lightyellow:'#ffffe0', lime:'#00ff00', limegreen:'#32cd32', linen:'#faf0e6',
		magenta:'#ff00ff', maroon:'#800000', mediumaquamarine:'#66cdaa',
		mediumblue:'#0000cd', mediumorchid:'#ba55d3', mediumpurple:'#9370db',
		mediumseagreen:'#3cb371', mediumslateblue:'#7b68ee',
		mediumspringgreen:'#00fa9a', mediumturquoise:'#48d1cc',
		mediumvioletred:'#c71585', midnightblue:'#191970', mintcream:'#f5fffa',
		mistyrose:'#ffe4e1', moccasin:'#ffe4b5', navajowhite:'#ffdead',
		navy:'#000080', oldlace:'#fdf5e6', olive:'#808000', olivedrab:'#6b8e23',
		orange:'#ffa500', orangered:'#ff4500', orchid:'#da70d6',
		alegoldenrod:'#eee8aa', palegreen:'#98fb98', paleturquoise:'#afeeee',
		palevioletred:'#db7093', papayawhip:'#ffefd5', peachpuff:'#ffdab9',
		peru:'#cd853f', pink:'#ffc0cb', plum:'#dda0dd', powderblue:'#b0e0e6',
		purple:'#800080', red:'#ff0000', rosybrown:'#bc8f8f', royalblue:'#4169e1',
		saddlebrown:'#8b4513', salmon:'#fa8072', sandybrown:'#f4a460',
		seagreen:'#2e8b57', seashell:'#fff5ee', sienna:'#a0522d',
		silver:'#c0c0c0', skyblue:'#87ceeb', slateblue:'#6a5acd',
		slategray:'#708090', snow:'#fffafa', springgreen:'#00ff7f',
		steelblue:'#4682b4', tan:'#d2b48c', teal:'#008080', thistle:'#d8bfd8',
		tomato:'#ff6347', turquoise:'#40e0d0', violet:'#ee82ee', wheat:'#f5deb3',
		white:'#ffffff', whitesmoke:'#f5f5f5', yellow:'#ffff00', yellowgreen:'#9acd32'
	};

	Color.parse = function(c) {
		if (toString.call(c) === "[object Array]")
			return c;

		c = c.toLowerCase();
		c = colorNames[c] || c;

		var m = c.match(/^#([0-9a-f]{6})$/i);
		if (m) {
			m = m[1];
			return [ parseInt(m.substr(0, 2), 16),
					 parseInt(m.substr(2, 2), 16),
					 parseInt(m.substr(4, 2), 16), 1 ];
		}

		m = c.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
		if (m) {
			return [ parseInt(m[1], 10), parseInt(m[2], 10),
					 parseInt(m[3], 10), 1 ];
		}
		m = c.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+\.?\d*)\s*\)$/i);
		if (m) {
			return [ parseInt(m[1], 10), parseInt(m[2], 10),
					 parseInt(m[3], 10),
					 Math.max(0, Math.min(1, parseFloat(m[4]))) ];
		}

		return [ 0, 0, 0, 1 ];
	};

	Color.gradient = function(start, stop, steps, alpha) {
		var c1 = Color.parse(start),
			c2 = Color.parse(stop),
			stepr = (c2[0] - c1[0]) / steps,
			stepg = (c2[1] - c1[1]) / steps,
			stepb = (c2[2] - c1[2]) / steps,
			stepa = (c2[3] - c1[3]) / steps,
			res = [];

		alpha = !!alpha && (c1[3] !== 1 || c2[3] !== 1);

		for (var i = 0; i < steps - 1; ++i) {
			if (alpha) {
				res[i] = 'rgba(' + Math.round(c1[0] + i * stepr) + ',' +
							Math.round(c1[1] + i * stepg) + ',' +
							Math.round(c1[2] + i * stepb) + ',' +
							Math.round((c1[3] + i * stepa) * 100) / 100 + ')';
			} else {
				res[i] = 'rgb(' + Math.round(c1[0] + i * stepr) + ',' +
							Math.round(c1[1] + i * stepg) + ',' +
							Math.round(c1[2] + i * stepb) + ')';
			}
		}

		if (alpha) {
			res[steps - 1] = 'rgba(' + c2[0] + ',' + c2[1] + ',' + c2[2] + ',' + c2[3] + ')';
		} else {
			res[steps - 1] = 'rgb(' + c2[0] + ',' + c2[1] + ',' + c2[2] + ')';
		}

		return res;
	};

	Color.brightnessGradient = function(c, percent, steps) {
		var res = [], cout;

		c = Color.RGBtoHSV(c);

		for (var i = 0; i < steps; ++i) {
			cout = Color.HSVtoRGB([ c[0],
							Math.max(0, Math.min(100, Math.round(c[1] + i * -percent))),
							Math.max(0, Math.min(100, Math.round(c[2] + i * percent))),
							c[3] ]);

			res[i] = 'rgba(' + cout[0] + ',' + cout[1] + ',' + cout[2] +
					',' + cout[3] + ')';
		}

		return res;
	};

	Color.RGBtoHSV = function(c) {
		c = Color.parse(c);
		var r = c[0] / 255,
			g = c[1] / 255,
			b = c[2] / 255,
			min = Math.min(r, g, b),
			max = Math.max(r, g, b),
			delta = max - min,
			v = max, s, h;

		if (max !== 0) {
			s = delta / max;
		} else {
			s = 0;
			h = 0;
			return [ h, s, v, c[3] ];
		}

		if (r == max)
			h = (g - b) / delta;
		else if (g == max)
			h = 2 + (b - r) / delta;
		else
			h = 4 + (r - g) / delta;

		h *= 60;
		if (h < 0)
			h += 360;

		return [ Math.round(h), Math.round(s * 100), Math.round(v * 100), c[3] ];
	};

	Color.HSVtoRGB = function(c) {
		var i, p, q, t,
			h = c[0] / 60,
			s = c[1] / 100,
			v = c[2] / 100;

		if (s === 0)
			return [ v * 255, v * 255, v * 255, c[3] ];

		i = Math.floor(h);
		p = Math.round((v * (1 - s)) * 255);
		q = Math.round((v * (1 - s * (h - i))) * 255);
		t = Math.round((v * (1 - s * (1 - (h - i)))) * 255);
		v = Math.round(v * 255);

		switch (i) {
		case 0:
			return [ v, t, p, c[3] ];
		case 1:
			return [ q, v, p, c[3] ];
		case 2:
			return [ p, v, t, c[3] ];
		case 3:
			return [ p, q, v, c[3] ];
		case 4:
			return [ t, p, v, c[3] ];
		default:
			return [ v, p, q, c[3] ];
		}
	};

	return Color;
}(Color || {}));
