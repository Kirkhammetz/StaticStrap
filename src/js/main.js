;(function($, window, document, undefined){
	var www = {
		init:function(){
			console.log("main.js :4", "Main Script UP");
			this.ui();
			this.bindEvents();
		},
		ui:function(){
			var windowHeight = $(window).height();
			var winHeightPercent = windowHeight / 100;
			
			/**
			 * VERTICAL CENTER
			 */
			$('.vertical-center').each(function(index, el) {
				$(el).css({
					'position': "relative",
					'top': ($(el).parent().height() - $(el).height()) / 2 + 'px'
				});
			});
		},
		bindEvents:function(){
		},
	};

	$(document).ready(function(){
		www.init();
	});

})(jQuery, this, this.document)