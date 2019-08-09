"use strict";
var AppControllerBase = function()
{
	this.contentModel = {};
	// initialise other fields and the lib object in the individual banner's app-controller.js constructor
}

// - kick off loading assets

$.extend(AppControllerBase.prototype, {

	initEB: function()
	{
		var t = this;

		if (!EB.isInitialized())
		{
			EB.addEventListener(EBG.EventName.EB_INITIALIZED, function(){ t.initEB(); });
		} else
		{
			this.init()
		}

		//this.init();
	},

	init: function()
	{
		console.log('init')
		canvas = document.getElementById("canvas");

		var t = this;

		// check for CreateJS support, and show alternate content if necessary for IE 8
		if (!createjs.AdHelper.isSupported() || (isIE() && isIE() < 9))
		{
			createjs.AdHelper.showAltImage(canvas, "backup-image.jpg", "", "");
			document.getElementById('adAlt').style.cursor = 'pointer';
			document.getElementById('adAlt').onclick=function()
			{
				EB.clickthrough();
			};
			return; // early out - i.e. don't bother with anything else if canvas not supported
		}

		console.log('begin loading assets from manifest...');
		loader = new createjs.LoadQueue(true);
		loader.addEventListener("complete", function() { t.handleLoadComplete(); });
		loader.loadManifest(lib.properties.manifest);
	},

	// - event handlers
	handleLoadComplete: function()
	{
		console.log('assets loaded');
		this.contentModel = loader.getResult('Content');

		stage = new createjs.Stage(canvas);
		stage.snapToPixelEnabled = true;
		stage.snapToPixel = true;
		stage.update();
		stage.enableMouseOver();

		createjs.Ticker.setFPS(lib.properties.fps);

		// enable touch for mobile devices:
		createjs.Touch.enable(stage);

		// create the AdHelper, and point it at the stage
		// it's important to do this after the FPS is set if you're using timeSynch!
		var ad = new createjs.AdHelper(stage)
			.setSleep(29, 29, 29)
			.timeSync()
			.highDPI();


		// main app flow controller
		var flowController = new FlowController(stage, this.contentModel);
		flowController.init();
	}
});
