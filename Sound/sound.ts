/**
 * Sound
 * Author: OKI Yoshiya (ceroan)
 * Date: 2013/04/23 21:05
 * URL: http://ceroan.jp/
 * URL: http://448.jp/blog/
 * Sound asset by NHK
 */

class Sound {
	private canvas:HTMLElement;
	private stage:createjs.Stage;
	private bg:createjs.Shape;
	private buttonContainer:createjs.MovieClip;
	private button:createjs.Bitmap;
	private isPlaying:bool;
	private queue:createjs.LoadQueue;

	constructor() {
		this.canvas = document.getElementById("my-canvas");
		this.stage = new createjs.Stage("my-canvas");
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addListener(this.stage);
		if (createjs.Touch.isSupported()) {
			createjs.Touch.enable(this.stage);
		}
		createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin]);
		this.load();
	}

	load():void {
		this.queue = new createjs.LoadQueue(false);
		this.queue.installPlugin(createjs.Sound);
		this.queue.addEventListener("complete", (e) => { this.onComplete(e); }, false);
		var manifest:Array = [
			{src: "play-button_up.png"},
			{src: "play-button_down.png"},
			{src: "stop-button_up.png"},
			{src: "stop-button_down.png"},
			{src: "se.mp3", id: "se"},
			{src: "se.wav", id: "se"},
			{src: "bgm.mp4", id: "bgm"},
			{src: "bgm.wav", id: "bgm"}
		];
		this.queue.loadManifest(manifest);
	}

	onComplete(e:Event):void {
		this.queue.removeEventListener("complete");
		this.buttonContainer = new createjs.MovieClip(null, 0, false);
		this.button = new createjs.Bitmap("play-button_up.png");
		this.button.regX = Math.floor(this.button.image.width * 0.5);
		this.button.regY = Math.floor(this.button.image.height * 0.5);

		this.isPlaying = false;

		// 背景
		this.bg = new createjs.Shape();
		this.stage.addChild(this.bg);

		this.init();
	}

	init():void {
		window.addEventListener("resize", (e) => { this.onResize(e); }, false);
		this.onResize();

		// SE
		this.bg.onClick = (e) => { this.clickStageHandler(e); };
		// BGM
		this.buttonContainer.addChild(this.button);
		this.stage.addChild(this.buttonContainer);
		this.buttonContainer.onClick = (e) => { this.onClick(e); };
	}

	clickStageHandler(e:createjs.MouseEvent):void {
		var exportRoot:createjs.MovieClip = new lib.Scream();
		exportRoot.x = e.stageX;
		exportRoot.y = e.stageY;
		exportRoot.alpha = 0;
		var initialScale:number = Math.random();
		exportRoot.scaleX = exportRoot.scaleY = initialScale;
		this.stage.addChild(exportRoot);
		createjs.Tween.get(exportRoot)
			.to({
				scaleX: initialScale + 0.5,
				scaleY: initialScale + 0.5,
				alpha: 1
			}, 400, createjs.Ease.quintOut)
			.to({
				scaleX: initialScale + 0.7,
				scaleY: initialScale + 0.7,
				alpha: 0
			}, 200, createjs.Ease.quintOut);
		createjs.Sound.play("se", createjs.Sound.INTERRUPT_ANY, 0, 0, 0, initialScale);
	}

	onClick(e:Event):void {
		this.buttonContainer.removeAllChildren();
		if(!this.isPlaying) {
			this.button = new createjs.Bitmap("stop-button_down.png");
			this.button.regX = Math.floor(this.button.image.width * 0.5);
			this.button.regY = Math.floor(this.button.image.height * 0.5);
			this.buttonContainer.addChild(this.button);
			createjs.Sound.play("bgm", createjs.Sound.INTERRUPT_ANY, 0, 0, -1);
		} else {
			this.button = new createjs.Bitmap("play-button_up.png");
			this.button.regX = Math.floor(this.button.image.width * 0.5);
			this.button.regY = Math.floor(this.button.image.height * 0.5);
			this.buttonContainer.addChild(this.button);
			createjs.Sound.stop("bgm");
		}
		this.isPlaying = !this.isPlaying;
	}

	onResize(e:Event = null):void {
		// canvas
		this.canvas.width = document.documentElement.clientWidth;
		this.canvas.height = document.documentElement.clientHeight;
		// 背景
		this.bg.graphics.clear().beginFill("#FF0000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height).endFill();
		// ボタン
		this.buttonContainer.x = Math.floor(this.stage.canvas.width * 0.5);
		this.buttonContainer.y = Math.floor(this.stage.canvas.height * 0.5);

		this.stage.update();
	}
}

window.onload = function() {
	new Sound();
};
// iOS用のスクロール禁止
document.addEventListener("touchmove", onTouchMove, false);
function onTouchMove(e:Event):void {
	e.preventDefault();
}
