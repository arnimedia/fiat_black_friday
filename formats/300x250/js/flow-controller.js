"use strict";

var FlowController = function(stage, maskStage, contentModel)
{
    FlowControllerBase.call(this, stage, maskStage, contentModel);
};

inheritsFrom(FlowController, FlowControllerBase);


$.extend(FlowController.prototype, {

    // overridden methods
    setupFormatSpecificElements: function()
    {
        console.log("Animation 300x250");

    },

});
