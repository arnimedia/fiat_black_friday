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
        console.log("Animation 300x600");

    },

    init:function()
    {

        console.log('INIT');
        var t = this;

		var docWidth = lib.properties.width;
		var docHeight = lib.properties.height;
	
		// grab various DOM elements
		var ctaBackground = document.getElementById("cta-container");
		var ctaTerms = document.getElementById("terms_cta");
		var Terms = document.getElementById("terms");
		var mainContainer = document.getElementById("container");
		//
		var carTitle1Container = document.getElementById("title1-container");
		var carTitle2Container = document.getElementById("title2-container");
		//
		var blackFader = document.getElementById("black-fader");
		//
        this.firstFrameAdjustment = 0
        this.setupCommonElements();
        this.setupFormatSpecificElements()
        // wire up a DOM element for the clickthrough

        // add interaction event listeners
        mainContainer.addEventListener("click", function() {t.handleClickThroughClicked();}, false);
        mainContainer.addEventListener("mouseout", function() { t.handleStageMouseOut(); }, false);
		mainContainer.addEventListener("mouseover", function() { t.handleStageMouseOver(); }, false);
		// ctaTerms.addEventListener("mouseover", function() { t.ctaMouseOver(); }, false);
		Terms.addEventListener("mouseout", function() { t.termsMouseOut(); }, false);
        createjs.Ticker.addEventListener("tick", function(){  t.update(); });

		// create split text elements
		// var subtitleLine1SplitText = new SplitText("#subtitle-line1", {type:"words"});

		var titleLine1 = new SplitText("#title1", {type:"lines"});
		var subtitleLine1 = new SplitText("#subtitle1", {type:"lines"});

		var titleLine2 = new SplitText("#title2", {type:"lines"});
		var titleLine3 = new SplitText("#title3", {type:"lines"});
		var titleLine4 = new SplitText("#title4", {type:"lines"});

		var titleLine5 = new SplitText("#title5", {type:"lines"});
		var subtitleLine5 = new SplitText("#subtitle5", {type:"lines"});

		var titleLine6 = new SplitText("#title6", {type:"lines"});

		// WHEELS TIMELINE

		function car_tires(car, duration){

			// CARS   500L = 1, 500 = 2, 500SUV = 3

			car_tl
				// .set('#tire_front'+car,{css:{transform:'scale(.45,.45)'}})
				// .set('#tire_back'+car,{css:{transform:'scale(.45,.45)'}})
				.set('.tire_spin'+car,{rotation:8})
				.set('.tire_start'+car,{opacity:1})
				.set(['.tire_mid'+car,'.tire_end'+car],{opacity:0})

				.add('car_start')
				.to('.tire_spin'+car,1.5,{rotation:730, ease:Power2.easeOut},'car_start')
				.to('.tire_spin'+car,.5,{rotation:728,ease:Power2.easeInOut},'car_start+=1.5')
				.to('.tire_start'+car,.7,{opacity:0, ease:Power2.easeOut},'car_start+=.3')
				.to('.tire_mid'+car,.9,{opacity:1, ease:Power2.easeOut},'car_start+=.3')
				.to('.tire_mid'+car,.7,{opacity:0, ease:Power2.easeOut},'car_start+=.6')
				.to('.tire_end'+car,.9,{opacity:1, ease:Power2.easeOut},'car_start+=.5')
			;
			car_tl.duration(duration);	
			console.log('#tire_front'+car);			
			return car_tl;
		}

		function transition(duration){
						
			transition_tl
				.addLabel('transition_start')
				.to('#tr1', 1.5, {y: 0}, 'transition_start')
				.to('#tr2', 2, {y: 0}, 'transition_start')
				.to('#tr3', 2.5, {y: 0}, 'transition_start')
				.to('#tr4', 3, {y: 0}, 'transition_start')
				.to('#tr5', 2.5, {y: 0}, 'transition_start')
				.to('#tr6', 2, {y: 0}, 'transition_start')
				.to('#tr7', 2, {y: 0}, 'transition_start')

				.to('#tr11', 1.1, {y: 0}, 'transition_start')
				.to('#tr22', 0.5, {y: 0}, 'transition_start')
				.to('#tr33', 1.5, {y: 0}, 'transition_start')
				.to('#tr44', 1.8, {y: 0}, 'transition_start')
				.to('#tr55', 2, {y: 0}, 'transition_start')
				.to('#tr66', 1.2, {y: 0}, 'transition_start')
				.to('#tr77', 1.8, {y: 0}, 'transition_start')
				
				.addLabel('transition_out', "+=2")
				.to('#tr1', 0.5, {y: docHeight*2}, 'transition_out')
				.to('#tr2', 0.5, {y: -docHeight*2}, 'transition_out')
				.to('#tr3', 1.5, {y: docHeight*2}, 'transition_out')
				.to('#tr4', 2, {y: -docHeight*2}, 'transition_out')
				.to('#tr5', 1.2, {y: docHeight*2}, 'transition_out')
				.to('#tr6', 0.4, {y: -docHeight*2}, 'transition_out')
				.to('#tr7', 1.8, {y: docHeight*2}, 'transition_out')

				.to('#tr11', 1.5, {y: -docHeight*2}, 'transition_out')
				.to('#tr22', 2, {y: docHeight*2}, 'transition_out')
				.to('#tr33', 2.5, {y: -docHeight*2}, 'transition_out')
				.to('#tr44', 3, {y: docHeight*2}, 'transition_out')
				.to('#tr55', 2.5, {y: -docHeight*2}, 'transition_out')
				.to('#tr66', 2, {y: docHeight*2}, 'transition_out')
				.to('#tr77', 2, {y: -docHeight*2}, 'transition_out')
			;	

			transition_tl.duration(duration);					
			return transition_tl;
		}

		// BLACK FADER in the beginning
		TweenMax.to(blackFader,0.5,{alpha:0, ease: Power2.easeOut})

        // MAIN TIMELINE
				var indexLabel=1;
				var label = "";
				tl.set(['#welcome','#transition'], {skewX: 33, scale: 0.8});
				tl.set(['#tr1','#tr3','#tr5','#tr7'], {y: docHeight*2});
				tl.set(['#tr2','#tr4','#tr6'], {y: -docHeight*2});
				tl.set(['#tr11','#tr33','#tr55','#tr77'], {y: -docHeight*2});
				tl.set(['#tr22','#tr44','#tr66'], {y: docHeight*2});
				
				// INTRO
				indexLabel++;
				label = "pt"+indexLabel;
				tl
					.addLabel(label)

					.from('#div1', 1, {y: docHeight+150}, label)
					.from('#div2', 1, {y: -docHeight*2}, label)

					.to('#logo', 0.5, {autoAlpha: 1}, label+"+=0.5")
					.staggerFrom(subtitleLine1.lines, 0.4, {y:docHeight, ease:Power2.easeOut},0.09, label+"+=0.5")
					.staggerFrom(titleLine1.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=0.5")

					.staggerTo(titleLine1.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=2.5")
					.staggerTo(subtitleLine1.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=3.0")
					.to('#logo', 0.5, {autoAlpha: 0}, label+"+=3")

					.to('#div1', 1, {y: -docHeight*2}, label+"+=3.5")
					.to('#div2', 1, {y: docHeight*2}, label+"+=3.5")

				;

				// FIAT 500L
				indexLabel++;
				label = "pt"+indexLabel;
				tl
					.addLabel(label, "-=0.5")

					.set('#logo', {top: 55}, label)
					.to('#logo', 0.5, {autoAlpha: 1}, label+"+=0.5")

					.from('#spotlight', 1.5, {autoAlpha: 0}, label+"-=0.2")
					.from('#base1', 1.5, {x: -docWidth}, label+"-=0.5")
					.call(car_tires, ["1", "2.3"], this, label+"-=0.5") 

                    .staggerFrom(titleLine2.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=1.2")
                    .from('#terms', 0.5,{autoAlpha: 0}, label+"+=1.2")
                    .to('.cta', 0.5, {autoAlpha: 1}, label+"+=0.5")
					.staggerTo(titleLine2.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=3.6")

					.to('#spotlight', 0.5, {autoAlpha: 0}, label+"+=3.7")

					.to('#base1', 2, {x: docWidth, ease:Power2.easeOut}, label+"+=3.7")
					.call(car_tires, ["1", "1"], this, label+"+=3.7") 

					.call(transition, ["1.5"], this, label+"+=3.7") 
								
				;

				// FIAT 500
				indexLabel++;
				label = "pt"+indexLabel;
				tl

					.addLabel(label, "-=0")

					.to('#spotlight', 1.5, {autoAlpha: 1}, label+"-=0.5")
					.from('#base2', 1.5, {x: -docWidth}, label+"-=0.9")
					.call(car_tires, ["2", "7.5"], this, label+"-=0.9") 

					.staggerFrom(titleLine3.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=1.2")
					.staggerTo(titleLine3.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=3.6")

					.to('#spotlight', 0.5, {autoAlpha: 0}, label+"+=3.7")

					.to('#base2', 2, {x: docWidth, ease:Power2.easeOut}, label+"+=3.7")
					.call(car_tires, ["2", "2"], this, label+"+=3.7") 

					.call(transition, ["4.5"], this, label+"+=3.7") 	
		
				;

				// FIAT 500SUV
				indexLabel++;
				label = "pt"+indexLabel;
				tl

					.addLabel(label, "-=0")

					.to('#spotlight', 1.5, {autoAlpha: 1}, label+"-=0.5")
					.from('#base3', 1.5, {x: -docWidth}, label+"-=0.9")
					.call(car_tires, ["3", "11"], this, label+"-=0.9") 

					.staggerFrom(titleLine4.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=1.2")
					.staggerTo(titleLine4.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=3.6")
					.to('#logo', 0.5, {autoAlpha: 0}, label+"+=3.6")

                    .to('#spotlight', 0.5, {autoAlpha: 0}, label+"+=3.7")
                    .to('#terms', 0.5, {autoAlpha: 0}, label+"+=3.7")
                    .to('.cta', 0.5, {autoAlpha: 0}, label+"+=3.7")

					.to('#base3', 2, {x: docWidth, ease:Power2.easeOut}, label+"+=3.7")
					.call(car_tires, ["3", "10"], this, label+"+=3.7") 

				;

				// MESSAGE PRE FINAL
				indexLabel++;
				label = "pt"+indexLabel;
				tl
					.addLabel(label, "-=2.3")

					.to('#div1', 1, {y: 0}, label)
					.to('#div2', 1, {y: 0}, label)
					
					.set('#logo', {top: 185}, label+"+=0.2")
					.to('#logo', 0.5, {autoAlpha: 1}, label+"+=0.5")
					.staggerTo(subtitleLine1.lines, 0.4, {x:0, ease:Power2.easeOut},0.09, label+"+=0.5")
					.staggerTo(titleLine1.lines, 0.4, {x:0, ease:Power2.easeOut},0.09, label+"+=0.5")
	
					.staggerTo(titleLine1.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=2.5")
					.staggerTo(subtitleLine1.lines, 0.4, {x:-docWidth, ease:Power2.easeOut},0.09, label+"+=3.0")
					.to('#logo', 0.5, {autoAlpha: 0}, label+"+=3")
	
					.to('#div1', 1, {y: -docHeight*2}, label+"+=3.8")
					.to('#div2', 1, {y: docHeight*2}, label+"+=3.8")
				;

				// FINAL
				indexLabel++;
				label = "pt"+indexLabel;
				tl
					.addLabel(label, "-=0")
				
					.set('#logo', {top: 65}, label)
					.to('#logo', 0.5, {autoAlpha: 1}, label+"+=0.5")
					.from(image1, 0.5, {autoAlpha: 0}, label+"-=0.5")
                    .to('.cta', 0.5, {autoAlpha: 1}, label+"+=0.5")
                    .to('#terms', 0.5, {autoAlpha: 1, color: "#000000"}, label+"+=0.5")
					
					
					.staggerFrom(subtitleLine5.lines, 0.4, {y:docHeight, ease:Power2.easeOut},0.09, label+"+=0.5")
					.staggerFrom(titleLine5.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=0.5")
					.staggerFrom(titleLine6.lines, 0.4, {x:docWidth, ease:Power2.easeOut},0.09, label+"+=0.5")

				;

				// tl.duration(7);

				// Super timeline duration output
                console.log("Banner duration is: "+ '\n' + Math.round(tl.duration()) + " seconds" );
                
    },

});
