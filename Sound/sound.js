var Sound = (function () {
    function Sound() {
        this.MOUSE_DOWN = "mousedown";
        this.MOUSE_UP = "mouseup";
        this.canvas = document.getElementById("my-canvas");
        this.stage = new createjs.Stage("my-canvas");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addListener(this.stage);
        if(createjs.Touch.isSupported()) {
            createjs.Touch.enable(this.stage);
        }
        this.load();
    }
    Sound.prototype.load = function () {
        var _this = this;
        this.queue = new createjs.LoadQueue(false);
        this.queue.installPlugin(createjs.Sound);
        this.queue.addEventListener("complete", function (e) {
            _this.onComplete(e);
        }, false);
        var manifest = [
            {
                src: "play-button_up.png"
            }, 
            {
                src: "play-button_down.png"
            }, 
            {
                src: "stop-button_up.png"
            }, 
            {
                src: "stop-button_down.png"
            }, 
            {
                src: "se.mp3",
                id: "se"
            }, 
            {
                src: "eurotechno.mp3",
                id: "bgm"
            }
        ];
        this.queue.loadManifest(manifest);
    };
    Sound.prototype.onComplete = function (e) {
        this.queue.removeEventListener("complete");
        this.buttonContainer = new createjs.MovieClip(null, 0, false);
        this.button = new createjs.Bitmap("play-button_up.png");
        this.button.regX = Math.floor(this.button.image.width * 0.5);
        this.button.regY = Math.floor(this.button.image.height * 0.5);
        this.isPlaying = false;
        this.init();
    };
    Sound.prototype.init = function () {
        var _this = this;
        window.addEventListener("resize", function (e) {
            _this.onResize(e);
        }, false);
        this.onResize();
        this.bg = new createjs.Shape();
        this.bg.graphics.beginFill("#FF0000").drawRect(0, 0, this.stage.canvas.width, this.stage.canvas.height).endFill();
        this.stage.addChild(this.bg);
        this.bg.onClick = function (e) {
            _this.clickStageHandler(e);
        };
        this.buttonContainer.addChild(this.button);
        this.stage.addChild(this.buttonContainer);
        this.buttonContainer.onClick = function (e) {
            _this.onClick(e);
        };
    };
    Sound.prototype.clickStageHandler = function (e) {
        var exportRoot = new lib.Scream();
        exportRoot.x = e.stageX;
        exportRoot.y = e.stageY;
        exportRoot.alpha = 0;
        var initialScale = Math.random();
        exportRoot.scaleX = exportRoot.scaleY = initialScale;
        this.stage.addChild(exportRoot);
        createjs.Tween.get(exportRoot).to({
            scaleX: initialScale + 0.5,
            scaleY: initialScale + 0.5,
            alpha: 1
        }, 400, createjs.Ease.quintOut).to({
            scaleX: initialScale + 0.7,
            scaleY: initialScale + 0.7,
            alpha: 0
        }, 200, createjs.Ease.quintOut);
        createjs.Sound.play("se", createjs.Sound.INTERRUPT_ANY, 0, 0, 0, initialScale);
    };
    Sound.prototype.onClick = function (e) {
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
    };
    Sound.prototype.onResize = function (e) {
        if (typeof e === "undefined") { e = null; }
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.buttonContainer.x = Math.floor(this.stage.canvas.width * 0.5);
        this.buttonContainer.y = Math.floor(this.stage.canvas.height * 0.5);
        this.stage.update();
    };
    return Sound;
})();
window.onload = function () {
    new Sound();
};
document.addEventListener("touchmove", onTouchMove, false);
function onTouchMove(e) {
    e.preventDefault();
}
