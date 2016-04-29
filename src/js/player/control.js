
"use strict";
var html = require('../html');
var dateHelper = require('../util/date');

var dom = html.dom;

var name = 'control-';
var meta = {
	className: {
		container: 'control',
		scroll: name+'scroll',
		scrollBg: name+'scroll-bg',
		scrollBg1: name+'scroll-bg1',
		scrollBg2: name+'scroll-bg2',
		btnPlay: name+'btn-play',
		btnVolumn: name+'btn-volume',
		btnFullScreen: name+'btn-fullscreen',
		txtTime: name+'txt-time'
	}
};

function Control(options){
	this.init(options);
}
Control.prototype = {
	constructor: Control,
	init: function(options){
		var self = this;
		var namespace = options.namespace;
		var container = options.container;
		var video = options.video;
		var autoplay = options.autoplay;
		var loop = options.loop;
		
		var controlContainer = dom.createElement({ className: namespace+meta.className.container});
		var scroll = dom.createElement({ className: namespace+meta.className.scroll });
		var scrollBg = dom.createElement({ className: namespace+meta.className.scrollBg });
		var scrollBg1 = dom.createElement({ className: namespace+meta.className.scrollBg1 });
		var scrollBg2 = dom.createElement({ className: namespace+meta.className.scrollBg2 });
		var btnPlay = dom.createElement({ className: namespace+meta.className.btnPlay });
		var btnVolumn = dom.createElement({ className: namespace+meta.className.btnVolumn });
		var btnFullScreen = dom.createElement({ className: namespace+meta.className.btnFullScreen });
		var txtTime = dom.createElement({ className: namespace+meta.className.txtTime });
		scroll.appendChild(scrollBg);
		scroll.appendChild(scrollBg1);
		scroll.appendChild(scrollBg2);
		controlContainer.appendChild(scroll);
		controlContainer.appendChild(btnPlay);
		controlContainer.appendChild(btnVolumn);
		controlContainer.appendChild(btnFullScreen);
		controlContainer.appendChild(txtTime);
		container.appendChild(controlContainer);
		
		btnPlay.addEventListener('click', handleBtnPlay);
		
		self.video = video;
		self.scroll = scroll;
		self.scrollBg1 = scrollBg1;
		self.scrollBg2 = scrollBg2;
		self.btnPlay = btnPlay;
		self.btnVolumn = btnVolumn;
		self.btnFullScreen = btnFullScreen;
		self.txtTime = txtTime;
		
		dom.addAttribute(video,'loop', loop);
		dom.addAttribute(video,'autoplay', autoplay);
		if(autoplay){
			self.play();
		}
		
		function handleBtnPlay(e){
			var target = e.target||e.srcElement;
			var isPause = target.getAttribute('pause');
			if(isPause){
				self.play();
			}else{
				self.pause();
			}
		}
	},
	keyframe: function(){  //param: renderer
		var self = this;
		var video = self.video;
		var scrollBg2 = self.scrollBg2;
		var txtTime = self.txtTime;
		var currentTime = video.currentTime||0;
		var duration = video.duration||1;
		
		var currentStr = dateHelper.durationToStr(currentTime*1000, 'hh:mm:ss', 'hh');
		var durationStr = dateHelper.durationToStr(duration*1000, 'hh:mm:ss', 'hh');
		
		txtTime.innerHTML = currentStr + '/' + durationStr;
		
		var progress = Math.floor(currentTime/duration*10000)/100;
		scrollBg2.style.width = progress+'%';
	},
	play: function(){
		var self = this;
		self.video.play();
	}
};







module.exports = Control;