ga.lib.BulletSystem = function () {
	this.bullets = [];
	this.update = function () {
		if (ga.data.circle % 3 == 0) { // 每3回合加入一顆子彈
			this.bullets.push(new ga.lib.Bullet());
		}
		// 更新每顆子彈
		for (var i = 0; i < this.bullets.length; i++) {
			if (this.bullets[i].update()) {
				this.bullets.splice(i, 1);
				i--;
			}
		}
	};
	this.draw = function () {
		for (var i = 0; i < this.bullets.length; i++) {
			this.bullets[i].draw();
		}
	};
};
ga.lib.Bullet = function () {
	var seed = Math.random();
	if (seed > 0.75) { // 左到右
		this.x = 0;
		this.y = Math.random() * ga.ctx.canvas.height;
		this.vx = Math.random() * 2 + 1; // 1~3
		this.vy = Math.random() * 2 - 1; // -1 ~ 1
	} else if (seed > 0.5) { // 右到左
		this.x = ga.ctx.canvas.width;
		this.y = Math.random() * ga.ctx.canvas.height;
		this.vx = Math.random() * 2 - 3; // -1~-3
		this.vy = Math.random() * 2 - 1; // -1 ~ 1
	} else if (seed > 0.25) { // 上到下
		this.x = Math.random() * ga.ctx.canvas.width;
		this.y = 0;
		this.vx = Math.random() * 2 - 1; // -1~1
		this.vy = Math.random() * 2 + 1; // 1 ~ 3
	} else { // 由下到上
		this.x = Math.random() * ga.ctx.canvas.width;
		this.y = ga.ctx.canvas.height;
		this.vx = Math.random() * 2 - 1; // -1~1
		this.vy = Math.random() * 2 - 3; // -1 ~ -3
	}
	this.size = 1;
	this.update = function () {
		this.x += this.vx;
		this.y += this.vy;
		return this.x > ga.ctx.canvas.width || this.x < 0 ||
			this.y > ga.ctx.canvas.height || this.y < 0;
	};
	this.draw = function () {
		ga.ctx.save();
		ga.ctx.fillStyle = "white";
		ga.ctx.beginPath();
		ga.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ga.ctx.fill();
		ga.ctx.restore();
	};
};
ga.lib.Plane = function () {
	this.x = ga.ctx.canvas.width / 2;
	this.y = ga.ctx.canvas.height / 2;
	this.size = 24;
	this.speed = 2;
	this.update = function () {
		var speed = this.speed;
		if (ga.keys.space) {//按空白鍵速度變兩倍
			speed *= 2;
		}
		if (ga.keys.left) {
			this.x -= speed;
		}
		if (ga.keys.top) {
			this.y -= speed;
		}
		if (ga.keys.right) {
			this.x += speed;
		}
		if (ga.keys.bottom) {
			this.y += speed;
		}
		return false;
	};
	this.draw = function () {
		ga.ctx.save(); // 儲存繪圖設定
		var img;
		if (ga.keys.space) { //按空白鍵時改變圖片
			img = ga.res.imgs.explosion;
		} else {
			img = ga.res.imgs.plane;
		}
		ga.ctx.drawImage(img,
			this.x - this.size / 2, this.y - this.size / 2,
			this.size, this.size);
		ga.ctx.restore(); // 恢復上一個儲存的設定
	};
};



