(function() {
	var zIndex = 1030;
	var jqueryAlert = function(opts) {
		var opt = {
			"style": "wap",
			"title": "",
			"icon": "",
			"content": "",
			'iframe':'',
			"contentTextAlign": "center",
			"width": "auto",
			"height": "auto",
			"iwidth": "",
			"iheight": 300,
			"minWidth": "0",
			"className": "",
			"position": "fixed",
			"animateType": "scale",
			"modal": false,
			"isModalClose": false,
			"bodyScroll": false,
			"closeTime": 3000,
			"buttons": {},
		};
		var option = $.extend({},
		opt, opts);
		var dialog = {};
		dialog.time = 450;
		dialog.init = function() {
			dialog.framework()
		};
		function IsPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					flag = false;
					break
				}
			}
			return flag
		}
		var isHaveTouch = IsPC();
		if (isHaveTouch) {
			dialog.event = "click"
		} else {
			dialog.event = "touchstart"
		}
		var $modal = $("<div class='alert-modal'>");
		var $container = $("<div class='alert-container animated'>");
		var $title = $("<div class='alert-title'>" + option.title + "</div>");
		var $content = $("<div class='alert-content'>");
		var $buttonBox = $("<div class='alert-btn-box'>");
		var $closeBtn = $("<div class='alert-btn-close'>×</div>");
		if ( !! option.content[0] && (1 == option.content[0].nodeType)) {
			var $newContent = option.content.clone();
			$content.append($newContent)
		} else {
			if(option.iframe==""){
				$content.html(option.content)
			}else{
				var ihtml='<iframe frameborder="0" id="iframeDialog" class="'+option.iclass+'" width="'+(option.iwidth||(document.body.clientWidth/1.5))+'" height="'+option.iheight+'" scrolling="auto" src="'+option.iframe+'"></iframe>';
				$content.append(ihtml);
			}
			
		}
		dialog.framework = function() {
			dialog.buttons = [];
			for (var key in option.buttons) {
				dialog.buttons.push(key)
			}
			dialog.buttonsLength = dialog.buttons.length;
			$container.append($title).append($content);
			if (option.style == "pc") {
				$container.append($closeBtn).addClass("pcAlert")
			}
			if (option.modal || option.modal == "true") {
				$("body").append($modal);
				option.bodyScroll && $("body").css("overflow", "hidden")
			}
			$("body").append($container);
			$content.css({
				"text-align": option.contentTextAlign
			});
			if (parseInt(option.minWidth) > parseInt($container.css("width"))) {
				option.width = option.minWidth
			}
			$modal.css("position", option.position);
			$modal.css("z-index", zIndex);
			$modal.css({
				width: window.top.document.body.clientWidth
			}); ++zIndex;
			if (option.position == "fixed") {
				$container.css({
					"position": option.position,
					"left": "50%",
					"top": "50%",
					"z-index": zIndex,
				})
			}
			if (option.position == "absolute") {
				$container.css({
					"position": option.position,
					"left": $(window).width() / 2,
					"top": $(window).height() / 2 + $(window).scrollTop(),
					"z-index": zIndex,
				})
			}
			$container.css("width", option.width);
			$container.css("height", option.height);
			if (option.width == "auto") {
				$container.css("width", $container[0].clientWidth + 10)
			}
			if (parseInt($(window).height()) <= parseInt($container.css("height"))) {
				$container.css("height", $(window).height())
			} ( !! option.className) && $container.addClass(option.className);
			for (var key in option.buttons) {
				var $button = $("<p class='alert-btn-p'>" + key + "</p>");
				if (option.style != "pc") {
					$button.css({
						"width": Math.floor(($container[0].clientWidth) / dialog.buttonsLength),
					})
				}
				$button.bind(dialog.event, option.buttons[key]);
				$buttonBox.append($button)
			}
			if (dialog.buttonsLength > 0) {
				$container.append($buttonBox);
				$content.css("padding-bottom", "46px");
				if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
					if ($content[0].scrollHeight > $content[0].clientHeight) {
						$content.css("height", parseInt($content.css("height")) - 46)
					}
				}
			}
			if (option.title != "") {
				$content.css("padding-top", "42px")
			}
			if (dialog.buttonsLength <= 0 && option.title == "") {
				$container.addClass("alert-container-black");
				if ( !! option.icon) {
					$icon = $('<i></i>');
					$icon.css({
						margin: "0 auto 5px",
						"display": "block",
						width: "50px",
						height: "50px",
						"background": "url(" + option.icon + ") no-repeat 0 0"
					});
					$content.prepend($icon);
				}
			}
			$container.css({
				"margin-left": -parseInt($container.css("width")) / 2,
				"margin-top": -parseInt($container.css("height")) / 2,
			});
			if (option.animateType == "scale") {
				$container.addClass("bounceIn")
			}
			if (option.animateType == "linear") {
				$container.addClass("linearTop")
			}
			isSelfClose()
		};
		function isSelfClose() {
			if (dialog.buttonsLength <= 0 && option.style != "pc") {
				setTimeout(function() {
					$container.fadeOut(300);
					$modal.fadeOut(300);
					option.bodyScroll && $("body").css("overflow", "auto")
				},
				option.closeTime)
			}
		}
		dialog.toggleAnimate = function() {
			if (option.animateType == "scale") {
				return $container.removeClass("bounceIn").addClass("bounceOut")
			} else {
				if (option.animateType == "linear") {
					return $container.removeClass("linearTop").addClass("linearBottom")
				} else {
					return $container
				}
			}
		};
		dialog.close = function() {
			dialog.toggleAnimate().fadeOut(dialog.time);
			$modal.fadeOut(dialog.time);
			option.bodyScroll && $("body").css("overflow", "auto")
		};
		option.style == "pc" && $closeBtn.bind(dialog.event, dialog.close);
		option.isModalClose && $modal.bind(dialog.event, dialog.close);
		dialog.destroy = function() {
			dialog.toggleAnimate().fadeOut(dialog.time);
			setTimeout(function() {
				$container.remove();
				$modal.remove();
				option.bodyScroll && $("body").css("overflow", "auto")
			},
			dialog.time)
		};
		dialog.show = function() {
			$modal.css("z-index", zIndex); ++zIndex;
			$container.css({
				"z-index": zIndex,
			});
			if (option.animateType == "scale") {
				$container.fadeIn().removeClass("bounceOut").addClass("bounceIn")
			} else {
				if (option.animateType == "linear") {
					$container.fadeIn().removeClass("linearBottom").addClass("linearTop")
				} else {
					$container.fadeIn()
				}
			}
			if (option.position == "absolute") {
				$container.css({
					"top": $(window).height() / 2 + $(window).scrollTop(),
				})
			}
			$modal.fadeIn();
			option.bodyScroll && option.modal && $("body").css("overflow", "hidden");
			isSelfClose()
		};
		dialog.init();
		return dialog
	};
	if (typeof module !== "undefined" && typeof exports === "object") {
		module.exports = jqueryAlert
	} else {
		if (typeof define === "function" && (define.amd || define.cmd)) {
			define(function() {
				return jqueryAlert
			})
		} else {
			this.jqueryAlert = jqueryAlert
		}
	}
}).call(function() {
	return this || (typeof window !== "undefined" ? window: global)
} ());