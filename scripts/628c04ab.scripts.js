"use strict";angular.module("portfolioApp",["ngCookies","ngResource","ngSanitize","ngAnimate","colorpicker.module"]).config(function(){}),angular.module("portfolioApp").directive("jqSlider",function(){return function(a,b,c){b.sudoSlider({responsive:!0,speed:400,customLink:".jq-slider-link-"+c.jqSliderCustomlink+" .jq-slider-link",controlsFade:!0,prevNext:!1})}}),angular.module("portfolioApp").directive("scrollTo",["$window",function(a){return{restrict:"AC",compile:function(){function b(b){if(!b)return a.scrollTo(0,0);var d=c.getElementById(b);d&&d.scrollIntoView()}var c=a.document;return function(a,c,d){c.bind("click",function(a){console.log("scroll to",d.scrollTo),a.preventDefault(),b(d.scrollTo)})}}}}]),angular.module("portfolioApp").directive("scrollFollow",["Tracker",function(a){return{restrict:"A",link:function(b,c,d){setTimeout(function(){c.stickOnScroll({footerElement:$(d.scrollStop),topOffset:d.scrollTopOffset||50,bottomOffset:d.ScrollBottomOffset||0,stickClass:d.scrollStickClass||"sticked-top",onStick:function(){a.track({action:d.scrollFollow})}})},1e3)}}}]),angular.module("portfolioApp").directive("scrollbarAnnotate",function(){return function(){setTimeout(function(){$(window).sausage({classes:"visible-lg visible-md",content:function(a,b){var c=b.attr("id");return'<span class="sausage-span" data-target='+c+">"+c+"</span>"}})},1e3)}}),angular.module("portfolioApp").directive("demoAngular",[function(){return{restrict:"A",templateUrl:"views/demo-angular.html",controller:["$scope",function(a){a.initColors=function(){return["","#a2d39c","#7bcdc8","rgb(110,207,246)","transparent"]};var b=function(){var b=[];return angular.forEach(a.colors,function(a){a&&b.push(a)}),b};a.clearColor=function(b){a.colors[b]=""},a.updateGradient=function(){var c=b(),d=[];c.length?1===c.length?d.push("background-color: "+c[0]+";"):(d.push("background: linear-gradient(left, "+c.join(", ")+") transparent;"),d.push("background: -webkit-linear-gradient(left, "+c.join(", ")+") transparent;"),d.push("background: -moz-linear-gradient(left, "+c.join(", ")+") transparent;")):d.push(""),a.gradient=d.join(""),a.gradientDisplay=d},a.$watch('colors | filter:"!!"',a.updateGradient,!0)}]}}]),angular.module("portfolioApp").directive("demoBackbone",[function(){return{restrict:"A",templateUrl:"views/demo-backbone.html",controller:["$scope","$element",function(a,b){var c=Backbone.View.extend({events:{"click .blur-o-meter [blur]":"updateBlur","click .clear-history":"clearHistory"},initialize:function(){var a=this;setTimeout(a.render.bind(a),600),this.listenTo(this.model,"change:blur",this.renderBlur,this),this.listenTo(this.model,"change:blur",this.updateHistory.bind(this,"success")),this.listenTo(this.model,"invalid",this.updateHistory.bind(this,"error")),this.listenTo(this.collection,"all",this.renderHistory,this)},getEl:function(){return this.$el.find("#twenty")},render:function(){var a=this.getEl();a.twentytwenty({default_offset_pct:.1}),a.find(".twentytwenty-overlay").unbind().remove(),this.renderClearHistoryLink()},updateBlur:function(a){var b=a.currentTarget.getAttribute("blur");this.model.set("blur",b,{validate:!0})},renderBlur:function(){var a=this.getEl().find(".right");a.attr("blur",this.model.get("blur"))},clearHistory:function(a){a.preventDefault(),this.collection.clear()},updateHistory:function(a,b,c){var d={type:a,reason:c,value:c};this.collection.addEntry(d)},renderHistory:function(){var a=this.$el.find(".history");a.html("");var b=this.tpl.message;_.forEach(this.collection.invoke("message"),function(c){var d=_.template(b,c);a.prepend(d)}),this.renderClearHistoryLink()},renderClearHistoryLink:function(){var a=this.$el.find(".clear-history");a[this.collection.isEmpty()?"hide":"show"]()},tpl:{message:'<li class="text-<%= type %>"><%= content %></li>'}}),d=Backbone.Model.extend({defaults:{blur:"regular"},validate:function(a){return a.blur?1*a.blur?"blur value cannot be a number":void 0:"blur value cannot be empty"}}),e=Backbone.Collection.extend({maxSize:5,model:Backbone.Model.extend({defaults:{type:void 0,value:void 0,reason:void 0},isError:function(){return"error"===this.get("type")},message:function(){return this.isError()?{type:"warning",content:this.get("reason").replace("blur value ","")}:{type:"success",content:this.get("value")}}}),addEntry:function(a){var b;return this.length>=this.maxSize&&(b=this.shift()),this.add(a),b},clear:function(){this.reset()}});return new c({el:b,model:new d,collection:new e})}]}}]),angular.module("portfolioApp").directive("demoJqueryCss",["Tracker",function(a){return{restrict:"E",templateUrl:"views/demo-jquery-css.html",controller:["$scope","$element",function(){$.widget("demo.superHero",{options:{speed:400,steps:3,target:void 0,preventDefault:!0},_create:function(){this.$el=$(this.options.target),this.timer=0,this.bindEvents(this)},bindEvents:function(a){for(var b in a.options.trigger)$(a.options.trigger[b]).bind(b,function(b){a.options.preventDefault&&b.preventDefault(),setTimeout(function(){a.animate(a)},a.options.speed)})},animate:function(b){return 0===b.timer&&a.track({action:"play-css-animation-hero"}),b.$el.attr("hero",this.timer),b.timer===b.options.steps?b.timer=0:(b.timer+=1,void setTimeout(function(){b.animate(b)},b.options.speed))},_destroy:function(){}}),$("#super-hero").superHero({target:"#super-hero",trigger:{click:".text-super-hero"}}),$("#switch-button").switchButton({width:50,height:20,button_width:25,labels_placement:"right"}).bind("change",function(b){var c=$(b.currentTarget).is(":checked");$(".neon-container-well").animate({"background-color":c?"#222":"transparent"},function(){setTimeout(function(){c||a.track({action:"play-css-animation-neon"}),$("#neon")[c?"addClass":"removeClass"]("animate-lights-on")},500)})})}]}}]),angular.module("portfolioApp").directive("demoTdd",[function(){return{restrict:"A",templateUrl:"views/demo-tdd.html",controller:["$scope","$element",function(a){a.hero={name:"Mario",mustache:!0},a.quest={reward:"Princess",location:"Castle"},a.initJasmine=function(){var b=jasmine.getEnv();b.updateInterval=0,b.addReporter(new jasmine.JSReporter);var c=b.currentRunner(),d=c.finishCallback;c.finishCallback=function(){d.apply(c,arguments),a.tests=jasmine.getJSReport();var b={passing:0,failing:0,skipped:0,total:0};angular.forEach(a.tests.suites,function(a){angular.forEach(a.specs,function(a){return b.total+=1,a.skipped?b.skipped+=1:void(b[a.passed?"passing":"failing"]+=1)})}),a.nbSpecs=b},b.execute()};var b=function(a){this.hero={mustache:a.hero.mustache,name:a.hero.name.toLowerCase()},this.quest={reward:a.quest.reward.toLowerCase(),location:a.quest.location.toLowerCase()}};describe("Hero",function(){it("should have a mustache",function(){var c=new b(a);expect(c.hero.mustache).toBeTruthy()}),it("should be named Mario",function(){var c=new b(a);expect(c.hero.name).toEqual("mario")})}),describe("Quest",function(){describe("Reward",function(){it("should be a Princess",function(){var c=new b(a);expect(c.quest.reward).toEqual("princess")})}),describe("Location",function(){it("should be in another castle",function(){var c=new b(a);expect(c.quest.location).toEqual("castle")})})})}]}}]).directive("jasmineSuite",[function(){return{restrict:"E",replace:!0,scope:{suite:"="},templateUrl:"views/demo-tdd-suite.html",link:function(a,b){angular.isArray(a.suite.suites)&&(b.append("<jasmine-suite suite='suite.suites'></jasmine-suite>"),$compile(b.contents())(a))}}}]).directive("jasmineSpec",[function(){return{restrict:"E",replace:!0,scope:{spec:"="},templateUrl:"views/demo-tdd-spec.html"}}]),angular.module("portfolioApp").directive("ryActivity",[function(){return{restrict:"A",transclude:!0,scope:{},templateUrl:"views/section-activity.html",link:function(a,b,c){a.activity={title:c.title,subtitle:c.subtitle,logo:c.logo,logoAlt:c.logoAlt,logoStyle:c.logoStyle}}}}]),angular.module("portfolioApp").factory("Tracker",[function(){return{track:function(a){clicky.log(a.url||"/",a.action)}}}]),angular.module("portfolioApp").controller("MainCtrl",["$scope","Tracker",function(a,b){a.track=function(a){b.track({action:a})}}]),angular.module("portfolioApp").controller("HeaderCtrl",["$scope","Tracker",function(a,b){a.trackContact=function(){b.track({action:"contact-email"})}}]);