/**
 * Created with IntelliJ IDEA.
 * User: oki
 * Date: 13/04/23
 * Time: 21:05
 * To change this template use File | Settings | File Templates.
 */

class LiquidLayouts {
	private canvas:HTMLElement;
	private stage:createjs.Stage;
	private bg:createjs.Bitmap;
	private title:createjs.Text;
	private queue:createjs.LoadQueue;

	constructor() {
		this.canvas = document.getElementById("my-canvas");
		this.stage = new createjs.Stage("my-canvas");
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(this.stage);
		this.load();
	}

	load():void {
		this.queue = new createjs.LoadQueue(false);
		this.queue.addEventListener("complete", (e) => { this.onComplete(e); }, false);
		this.queue.loadFile("bg.jpg");
	}

	onComplete(e:Event):void {
		this.queue.removeEventListener("complete");
		// 背景
		this.bg = new createjs.Bitmap("bg.jpg");
		this.bg.regX = Math.floor(this.bg.image.width * 0.5);
		// タイトル
		this.title = new createjs.Text("Liquid Layouts", null, "#FFFFFF");
		this.title.shadow = new createjs.Shadow("#000000", 0, 0, 8);

		this.init();
	}

	init():void {
		window.addEventListener("resize", (e) => { this.onResize(e); }, false);
		this.onResize();

		// 背景
		this.stage.addChild(this.bg);
		this.bg.alpha = 0;
		createjs.Tween.get(this.bg).to({alpha: 1}, 2500, createjs.Ease.quintIn);
		// タイトル
		this.title.x = -this.title.getMeasuredWidth();
		this.stage.addChild(this.title);
		var targetScaleX:number = this.stage.canvas.width / this.bg.image.width;
		var targetScaleY:number = this.stage.canvas.height / this.bg.image.height;
		var targetScale:number = Math.max(targetScaleX, targetScaleY);
		createjs.Tween.get(this.title).wait(3000).to({x: 40 * targetScale}, 1000, createjs.Ease.quintOut);
	}

	onResize(e:Event = null):void {
		// canvas
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;
		// スケール率の算出
		var targetScaleX:number = this.stage.canvas.width / this.bg.image.width;
		var targetScaleY:number = this.stage.canvas.height / this.bg.image.height;
		var targetScale:number = Math.max(targetScaleX, targetScaleY);
		// 背景
		this.bg.scaleX = this.bg.scaleY = targetScale;
		this.bg.x = Math.floor(this.stage.canvas.width * 0.5);
		// タイトル
		this.title.x = 40 * targetScale;
		this.title.y = this.stage.canvas.height - 140 * targetScale;
		this.title.font = 96 * targetScale + "px Bubblegum Sans";
		this.title.shadow = new createjs.Shadow("#000000", 0, 0, 8 * targetScale);

		this.stage.update();
	}
}

// Google Web Fonts
var WebFontConfig:Object = {
	google: { families: [ 'Bubblegum+Sans::latin' ] },
	active: function() {
		new LiquidLayouts();
	}
};
window.onload = function() {
	// Google Web Fonts
	var wf:HTMLElement = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s:HTMLElement = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
};
// iOS用のスクロール禁止
document.addEventListener("touchstart", onTouchStart, false);
function onTouchStart(e:Event):void {
	e.preventDefault();
}