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

var Fractal = (function(Fractal) {
	"use strict";

	// Check for double inclusion
	if (Fractal.Fractal)
		return Fractal;

	// constructor
	function FractalBase(canvas, pos) {
		if (!(this instanceof FractalBase))
			return new FractalBase(canvas, pos);

		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext("2d");

		FractalBase.prototype.update.call(this, pos);
	}

	FractalBase.prototype = {
		clear : function() {
			this.ctx.clearRect(0, 0, this.width, this.height);
		},
		update: function(pos) {
			var x = pos && pos.x || 0,
			    y = pos && pos.y || 0;
			this.pos = this.pos || {x: 0, y: 0};
			this.pos.x = x;
			this.pos.y = y;
		},
		getCanvas: function() {
			return this.ctx.canvas;
		}
	};

	Fractal.Fractal = FractalBase;
	return Fractal;
}(Fractal || {}));
