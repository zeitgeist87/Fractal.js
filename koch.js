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

var Fractal = (function (Fractal){
	"use strict";

	// check if double inclusion
	if (Fractal.Koch)
		return Fractal;

	// constructor
	function Koch(canvas, pos, maxorder, color) {
		if (!(this instanceof Koch))
			return new Koch(canvas, pos, maxorder, color);

		Fractal.Fractal.call(this, canvas, pos);

		this.ctx.strokeStyle = color || "black";
		this.maxorder = maxorder || 10;
		this.base_height = this.height / 2;

		this.update(pos);
	}

	Koch.prototype = Object.create(Fractal.Fractal.prototype);

	Koch.prototype.update = function(pos) {
		var x = pos && pos.x || 0,
			y = pos && pos.y || 0,
			ratio = Math.max(0.35, Math.min(0.65, x / this.width)),
			// top angle of the initial triangle
			gamma = (Math.PI / 2) * ratio,
			order = Math.max(0, Math.min(this.maxorder,
					Math.floor(2 * this.maxorder * (1 - (y / this.height))))),
			// base angle
			angle = (Math.PI - gamma) / 2,
			ctx = this.ctx;

		this.pos = this.pos || {x: 0, y: 0};
		this.pos.x = x;
		this.pos.y = y;

		if (this.order === order && this.angle === angle)
			return;

		this.order = order;
		this.angle = angle;

		// ratio of width to the side of the smaller triangle in the middle
		this.ratio = Math.sin(angle) / (3 * Math.sin(gamma));

		// width and side width of the initial triangle
		var width = (this.base_height / Math.tan(angle)) * 2, side = this.base_height
				/ Math.sin(angle);

		this.clear();

		// drawing initial triangle
		ctx.save();
			ctx.translate((this.width / 2) - (width / 2), this.height / 3);
			// beginPath and stroke outside also works
			// but seems to be slower
			// ctx.beginPath();
			this.draw(1, width, 1);
			ctx.save();
				ctx.rotate(angle);
				this.draw(1, side, -1);
			ctx.restore();
			ctx.translate(width, 0);
			ctx.rotate(Math.PI - angle);
			this.draw(1, side, 1);
			// ctx.stroke();
		ctx.restore();
	};

	Koch.prototype.draw = function(curr_order, width, inverse) {
		var ctx = this.ctx,
			third_width = width / 3,
			// width of the triangle
			tri_width = width * this.ratio;

		if (curr_order > this.order) {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(width, 0);
			ctx.lineWidth = 1;
			ctx.stroke();
			return;
		}

		++curr_order;

		this.draw(curr_order, third_width, inverse);

		ctx.save();
		ctx.translate(third_width * 2, 0);
		this.draw(curr_order, third_width, inverse);
		ctx.restore();

		ctx.save();
		ctx.translate(third_width, 0);
		ctx.rotate(inverse * (-this.angle));
		this.draw(curr_order, tri_width, inverse);
		ctx.restore();

		ctx.save();
		ctx.translate(2 * third_width, 0);
		ctx.rotate(inverse * -(Math.PI - this.angle));
		this.draw(curr_order, tri_width, -inverse);
		ctx.restore();
	};

	Fractal.Koch = Koch;
	return Fractal;
}(Fractal || {}));
