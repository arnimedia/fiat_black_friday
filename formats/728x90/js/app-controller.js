"use strict";
var AppController = function()
{
	AppControllerBase.call(this);

	lib.properties = {
		width: 728,
		height: 90,
		fps: 60,
		color: "#000000",
		manifest: [
			{src:"data/content.json", id:"Content"}
		]
	}
};

inheritsFrom(AppController, AppControllerBase);
