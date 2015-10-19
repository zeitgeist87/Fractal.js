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

var Fractal = (function (Fractal, Color){
	"use strict";

	// Check for double inclusion
	if (Fractal.HTree)
		return Fractal;

	// constructor
	function HTree(canvas, pos, maxorder, startcolor, stopcolor, alpha) {
		if (!(this instanceof HTree))
			return new HTree(canvas, pos, maxorder, startcolor, stopcolor,
					alpha);

		Fractal.Fractal.call(this, canvas, pos);

		this.maxorder = maxorder || 14;
		startcolor = startcolor || "black";
		stopcolor = stopcolor || startcolor;

		this.colors = Color && Color.gradient &&
				Color.gradient(startcolor, stopcolor, maxorder + 2, alpha) || [];

		if (this.colors.length !== maxorder + 2) {
			for (var i = 0, len = maxorder + 2; i < len; ++i) {
				this.colors[i] = "black";
			}
		}

		this.base_width = this.width / 48;
		this.base_height = this.height / 4.5;
		this.diagonal_length = Math.sqrt(this.width * this.width + this.height * this.height);
		this.ctx.lineCap = 'round';
		this.update(pos);
	}

	HTree.prototype = Object.create(Fractal.Fractal.prototype);

	HTree.prototype.update = function(pos) {
		var x = pos && pos.x || 0,
		    y = pos && pos.y || 0,
		    // calculate the sides of the triangle to get the angle
		    // from the center to the mouse position
		    sidex = (x - (this.width / 2)),
		    sidey = ((this.height - y) - this.base_height),
		    angle = Math.atan(sidey / sidex),
		    // calculate the ratio between the diagonal and
		    // the distance of center to mouse
		    ratio = Math.max(0.1, Math.min(0.8,
		    		Math.abs(Math.sqrt(sidex * sidex + sidey * sidey) /
		    		(this.diagonal_length / 4)))),
		    ctx = this.ctx;

		this.pos = this.pos || {x: 0, y: 0};
		this.pos.x = x;
		this.pos.y = y;

		// adjust the angle
		angle += (x < (this.width / 2)) ? Math.PI : 0;
		angle -= Math.PI / 2;

		if (this.angle === angle && this.ratio === ratio)
			return;

		this.angle = angle;
		this.ratio = ratio;
		this.order = Math.min(Math.max(0,
				Math.round(this.maxorder * ratio)), this.maxorder);

		this.clear();

		// draw trunk of the tree
		ctx.save();
			ctx.translate((this.width / 2), this.height);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -this.base_height);
			ctx.lineWidth = this.base_width;
			ctx.strokeStyle = this.colors[0];
			ctx.stroke();
			ctx.translate(0, -this.base_height);
			this.draw(1, this.base_width, this.base_height);
		ctx.restore();
	};
	HTree.prototype.draw = function(curr_order, width, height) {
		var ctx = this.ctx;

		width = width * this.ratio;
		height = height * this.ratio;

		if (curr_order > this.order)
			return;

		++curr_order;

		// draw left branch recursively
		ctx.save();
			ctx.rotate(-this.angle);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -height);
			ctx.lineWidth = width;
			ctx.strokeStyle = this.colors[curr_order];
			ctx.stroke();
			ctx.translate(0, -height);
			this.draw(curr_order, width, height);
		ctx.restore();

		//draw right branch recursively
		ctx.save();
			ctx.rotate(this.angle);
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -height);
			ctx.lineWidth = width;
			ctx.strokeStyle = this.colors[curr_order];
			ctx.stroke();
			ctx.translate(0, -height);
			this.draw(curr_order, width, height);
		ctx.restore();
	};

	Fractal.HTree = HTree;
	return Fractal;
}(Fractal || {}, Color));
