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

var Fractal = (function(Fractal, Color) {
	"use strict";

	// Check for double inclusion
	if (Fractal.Pythagoras)
		return Fractal;

	// constructor
	function Pythagoras(canvas, pos, maxorder, startcolor, stopcolor, alpha) {
		if (!(this instanceof Pythagoras))
			return new Pythagoras(canvas, pos, maxorder, startcolor, stopcolor,
					alpha);

		Fractal.Fractal.call(this, canvas, pos);

		this.maxorder = maxorder || 10;
		startcolor = startcolor || "black";
		stopcolor = stopcolor || startcolor;

		this.colors = Color && Color.gradient
				&& Color.gradient(startcolor, stopcolor, maxorder + 2, alpha)
				|| [];

		if (this.colors.length !== maxorder + 2) {
			for (var i = 0, len = maxorder + 2; i < len; ++i) {
				this.colors[i] = "black";
			}
		}

		this.base_width = this.width / 8;
		this.update(pos);
	}

	Pythagoras.prototype = Object.create(Fractal.Fractal.prototype);

	Pythagoras.prototype.update = function(pos) {
		var x = pos && pos.x || 0,
		    y = pos && pos.y || 0,
		    ratio = Math.max(0.35, Math.min(0.65, x / this.width)),
		    order = Math.max(0, Math.min(this.maxorder,
		            Math.floor(2 * this.maxorder * (1 - (y / this.height))))),
		    langle = (Math.PI / 2) * ratio,
		    rangle = (Math.PI / 2) - langle,
		    ctx = this.ctx;

		this.pos = this.pos || {x: 0, y: 0};
		this.pos.x = x;
		this.pos.y = y;

		if (this.order === order && this.langle === langle)
			return;

		this.order = order;
		this.langle = langle;
		this.rangle = rangle;
		/*
		 * The original pythagoras factorial uses a
		 * rratio=lratio=0.5*Math.sqrt(2), but that is equal to
		 * Math.sin(Math.PI / 4). So for a general angle we can simply
		 * use the sinus to calculate lratio and rratio.
		 */
		this.lratio = Math.sin(rangle);
		this.rratio = Math.sin(langle);

		this.clear();

		// draw trunk of the tree
		ctx.save();
		ctx.translate((this.width / 2) - (this.base_width / 2), this.height
				- this.base_width);
		ctx.fillStyle = this.colors[0];
		ctx.fillRect(0, 0, this.base_width, this.base_width);
		this.draw(1, this.base_width);
		ctx.restore();
	};

	Pythagoras.prototype.draw = function(curr_order, width) {
		var ctx = this.ctx,
			lwidth = this.lratio * width,
			rwidth = this.rratio * width;

		if (curr_order > this.order)
			return;

		++curr_order;

		//draw left branch recursively
		ctx.save();
		ctx.rotate(-this.langle);
		ctx.translate(0, -lwidth);
		ctx.fillStyle = this.colors[curr_order];
		ctx.fillRect(0, 0, lwidth, lwidth);
		this.draw(curr_order, lwidth);
		ctx.restore();

		//draw right branch recursively
		ctx.save();
		ctx.translate(width, 0);
		ctx.rotate(this.rangle);
		ctx.translate(-rwidth, -rwidth);
		ctx.fillStyle = this.colors[curr_order];
		ctx.fillRect(0, 0, rwidth, rwidth);
		this.draw(curr_order, rwidth);
		ctx.restore();
	};

	Fractal.Pythagoras = Pythagoras;
	return Fractal;
}(Fractal || {}, Color));
