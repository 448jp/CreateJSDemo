var LiquidLayouts = (function () {
    function LiquidLayouts() {
        this.canvas = document.getElementById("my-canvas");
        this.stage = new createjs.Stage("my-canvas");
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addListener(this.stage);
        this.load();
    }
    LiquidLayouts.prototype.load = function () {
        var _this = this;
        this.queue = new createjs.LoadQueue(false);
        this.queue.addEventListener("complete", function (e) {
            _this.onComplete(e);
        }, false);
        this.queue.loadFile("bg.jpg");
    };
    LiquidLayouts.prototype.onComplete = function (e) {
        this.queue.removeEventListener("complete");
        this.bg = new createjs.Bitmap("bg.jpg");
        this.bg.regX = Math.floor(this.bg.image.width * 0.5);
        this.title = new createjs.Text("Liquid Layouts", null, "#FFFFFF");
        this.title.shadow = new createjs.Shadow("#000000", 0, 0, 8);
        this.init();
    };
    LiquidLayouts.prototype.init = function () {
        var _this = this;
        window.addEventListener("resize", function (e) {
            _this.onResize(e);
        }, false);
        this.onResize();
        this.stage.addChild(this.bg);
        this.bg.alpha = 0;
        createjs.Tween.get(this.bg).to({
            alpha: 1
        }, 2500, createjs.Ease.quintIn);
        this.title.x = -this.title.getMeasuredWidth();
        this.stage.addChild(this.title);
        var targetScaleX = this.stage.canvas.width / this.bg.image.width;
        var targetScaleY = this.stage.canvas.height / this.bg.image.height;
        var targetScale = Math.max(targetScaleX, targetScaleY);
        createjs.Tween.get(this.title).wait(3000).to({
            x: 40 * targetScale
        }, 1000, createjs.Ease.quintOut);
    };
    LiquidLayouts.prototype.onResize = function (e) {
        if (typeof e === "undefined") { e = null; }
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        var targetScaleX = this.stage.canvas.width / this.bg.image.width;
        var targetScaleY = this.stage.canvas.height / this.bg.image.height;
        var targetScale = Math.max(targetScaleX, targetScaleY);
        this.bg.scaleX = this.bg.scaleY = targetScale;
        this.bg.x = Math.floor(this.stage.canvas.width * 0.5);
        this.title.x = 40 * targetScale;
        this.title.y = this.stage.canvas.height - 140 * targetScale;
        this.title.font = 96 * targetScale + "px Bubblegum Sans";
        this.title.shadow = new createjs.Shadow("#000000", 0, 0, 8 * targetScale);
        this.stage.update();
    };
    return LiquidLayouts;
})();
var WebFontConfig = {
    google: {
        families: [
            'Bubblegum+Sans::latin'
        ]
    },
    active: function () {
        new Sound();
    }
};
window.onload = function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
};
document.addEventListener("touchstart", onTouchStart, false);
function onTouchStart(e) {
    e.preventDefault();
}
//@ sourceMappingURL=liquid-layouts.js.map
