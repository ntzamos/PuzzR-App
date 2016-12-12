// jshint ignore: start
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(root.jQuery);
	}
}(this, function($) {
	// PRIVATE
	var options = {
		src: "default",
		size: 5,
		callback: function() {

		}
	};
	var rivalid;
	var puzzle_dif;
	// PUZZLE PROTOTYPE
	var Puzzle = function(element, userOptions) {
		var elementType;

		this.options = options = $.extend(this.options, options, userOptions);
		this.element = element;

		this._create();
	};

	/**
	 * Initialize the plugin with public methods
	 */
	Puzzle.prototype = {
		_create: function() {
			var root = $(this.element);
			root.html('');
			console.log('creating');
			var img = $('<img>').attr('src',this.options.src);
			var startButton = $('<span>').addClass('start-button').text('Play Now');
			var self = this;
			puzzle_dif = this.size;
			var counter = 3;
			function countdown() {

				if(counter === 0) {
					// rivalid = root.data("rivals")===null?0:root.data("rivals");
					// puzzle_dif = root.data("puzzle_dif")===null?-1:root.data("puzzle_dif");

					self._start();
					return;
				}
				startButton.unbind( "click" );
				startButton.text(counter);
				counter--;
				setTimeout(countdown,1000);
			}

			startButton.click(countdown);
			root.append(
				img,
				startButton
			);
		},

		_start: function() {

			console.log('starting1');
			var root = $(this.element);
			console.log('starting');
			var gameContainer = $('<div>').addClass('game-container');
			var tileContainer = $('<div>').addClass('tile-container');

			this.width = $('img', root).width();
			this.height = $('img', root).height();
			var size = this.options.size;
    	this.step_size_x = Math.ceil(this.width / size);
    	this.step_size_y = Math.ceil(this.height / size);

			this.width = this.step_size_x * size;
			this.height = this.step_size_y * size;

			gameContainer.css({
				width: this.width + 'px',
				height: this.height + 'px',
				'background-size':  this.width+"px "+this.height+"px"
			});
			root.html(gameContainer.html(tileContainer));
			this.gameContainer = gameContainer[0];
			this.tileContainer = tileContainer[0];
			this._setupEvents();
			this.start();
		},

		start: function() {
			var root = $(this.element);
			$('.tile-container', root).html('');
			console.log('starting game');
			var gameContainer = this.gameContainer;
			var tileContainer = this.tileContainer;

			var img = this.options.src;
			var size = this.options.size;
			var step_size_x = this.step_size_x;
			var step_size_y = this.step_size_y;
	    var k = 0;
	    for(var i=1;i<=size;i++) {
	      for(var j=1;j<=size;j++) {
	        k++;
					var tile = document.createElement("div");
	        tile.setAttribute('class','tile');
	        tile.setAttribute('data-realpos',k);
	        tile.style['width'] = step_size_x + "px";
	        tile.style['height'] = step_size_y + "px";
	        var tileInner = document.createElement("div");
	        tileInner.setAttribute('class','tile-inner');
	        tileInner.style['width'] = step_size_x + "px";
	        tileInner.style['height'] = step_size_y + "px";
	        tileInner.style['background-image'] = "url('"+img+"')";
	        tileInner.style['background-size'] = this.width+"px "+this.height+"px";
	        tileInner.style['background-position'] =  (-step_size_x*(j-1))+"px "+(-step_size_y*(i-1))+"px";

	        tile.appendChild(tileInner);
	        tileContainer.appendChild(tile);
	      }
	    }

	    this.shuffle();
	    this.playing = true;
			this.start_time = new Date();
			this._moves = 0;
		},

		shuffle: function() {
			var positions = [];

			var size = this.options.size;
			var step_size_x = this.step_size_x;
			var step_size_y = this.step_size_y;

			for(var i=1;i<=size;i++) {
				for(var j=1;j<=size;j++) {
					positions.push( [i,j] );
				}
			}

			for(var k=0;k<positions.length;k++) {
				var y = Math.floor(Math.random()*(positions.length-k))+k;
				var b = positions[y];
				positions[y] = positions[k];
				positions[k] = b;
			}
			$('.tile', this.element).each(function(k){
				this.setAttribute('class','tile tile-position-'+positions[k][1]+'-'+positions[k][0]);
				this.style['transform'] = 'translate(' + step_size_x*(positions[k][1]-1) + "px,"+ step_size_y*(positions[k][0]-1) +"px)";
			});
		},

		_setupEvents: function() {
			var gameContainer = this.gameContainer;
			function addHandlers() {
				gameContainer.addEventListener("mousedown", function (event) {
		      dragstart(event.clientX, event.clientY);
		      event.preventDefault();
		    });
		    gameContainer.addEventListener("mousemove", function (event) {
		      dragmove(event.clientX, event.clientY);
		      event.preventDefault();
		    });
		    gameContainer.addEventListener("mouseup", function (event) {
		      dragstop(event.clientX, event.clientY);
		      event.preventDefault();
		    });
		    document.addEventListener("mouseup",dragstop);

		    var eventTouchstart    = "touchstart";
		    var eventTouchmove     = "touchmove";
		    var eventTouchend      = "touchend";
		    if (window.navigator.msPointerEnabled) {
		      eventTouchstart    = "MSPointerDown";
		      eventTouchmove     = "MSPointerMove";
		      eventTouchend      = "MSPointerUp";
		    }
		    gameContainer.addEventListener(eventTouchstart, function (event) {
		      if ((!window.navigator.msPointerEnabled && event.touches.length > 1) ||
		          event.targetTouches.length > 1) {
		        return; // Ignore if touching with more than 1 finger
		      }
		      var touchStartClientX, touchStartClientY;

		      if (window.navigator.msPointerEnabled) {
		        touchStartClientX = event.pageX;
		        touchStartClientY = event.pageY;
		      } else {
		        touchStartClientX = event.touches[0].clientX;
		        touchStartClientY = event.touches[0].clientY;
		      }
		      dragstart(touchStartClientX, touchStartClientY);

		      event.preventDefault();
		    });
		    gameContainer.addEventListener(eventTouchmove, function (event) {
		      if (window.navigator.msPointerEnabled) {
		        dragmove(event.pageX, event.pageY);
		      } else {
		        dragmove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
		      }
		      event.preventDefault();
		    });
		    gameContainer.addEventListener(eventTouchend, function (event) {
		      if ((!window.navigator.msPointerEnabled && event.touches.length > 0) ||
		          event.targetTouches.length > 0) {
		          dragstop();
		          return; // Ignore if still touching with one or more fingers
		      }
		      var touchEndClientX, touchEndClientY;
		      if (window.navigator.msPointerEnabled) {
		        touchEndClientX = event.pageX;
		        touchEndClientY = event.pageY;
		      } else {
		        touchEndClientX = event.changedTouches[0].clientX;
		        touchEndClientY = event.changedTouches[0].clientY;
		      }

		      dragstop(touchEndClientX, touchEndClientY);
		      // event.preventDefault();
		    });
	    	//document.addEventListener(this.eventTouchend,dragstop);
			}

			addHandlers();

			var selected = false, selx, sely, seli, selj;
			var size = this.options.size;
			var step_size_x = this.step_size_x;
			var step_size_y = this.step_size_y;
			var self = this;

			function dragstart(x,y) {
				if(!self.playing) return;
				bx = gameContainer.getBoundingClientRect();

				$('.tile-dropped',self.element).removeClass('tile-dropped');
				$('.tile-changed',self.element).removeClass('tile-changed');

				seli = Math.floor( (y - bx.top)*size/bx.height )+1, selj = Math.floor( (x-bx.left)*size/bx.width )+1;
				selected = $('.tile-position-'+selj+'-'+seli, self.element)[0];
				if(selected) {
					selected.setAttribute('class','tile tile-drag tile-position-'+selj+'-'+seli);
					gameContainer.setAttribute('class','game-container dragging');
				}
				return false;
			}
			function dragmove(x,y) {
				if(!selected) return;
				var pi = Math.floor( (y - bx.top)*size/bx.height )+1, pj = Math.floor( (x-bx.left)*size/bx.width )+1;
				y = (y - bx.top - step_size_y/2) | 0, x = (x-bx.left - step_size_x/2) | 0;
				$('.tile-hover',self.element).not('.tile-position-'+pj+'-'+pi).removeClass('tile-hover');
				$('.tile-position-'+pj+'-'+pi,self.element).addClass('tile-hover');
				selected.style['transform'] = 'translate('+x+'px,'+y+'px)';
			}
			function dragstop(x,y) {
				if(!selected) return;
				bx = gameContainer.getBoundingClientRect();
				var pi = Math.floor( (y - bx.top)*size/bx.height )+1, pj = Math.floor( (x-bx.left)*size/bx.width )+1;
				var curr =  $('.tile-position-'+pj+'-'+pi,self.element)[0];
				if(curr) {
					curr.setAttribute('class','tile tile-changed tile-position-'+selj+'-'+seli);
					curr.style['transform'] = 'translate(' + step_size_x*(selj-1) + "px,"+ step_size_y*(seli-1) +"px)";
					if(pi!=seli || pj!=selj) self._moves++;
				}
				else {pi = seli; pj = selj;}
				gameContainer.setAttribute('class','game-container');
				selected.setAttribute('class','tile tile-dropped tile-position-'+pj+'-'+pi);
				selected.style['transform'] = 'translate(' + step_size_x*(pj-1) + "px,"+ step_size_y*(pi-1) +"px)";
				selected = false;
				self.win();
				return false;
			}
		},

		win: function() {
			var size = this.options.size;
			this.end_time = new Date();
	    var k = 0;
	    for(var i=1;i<=size;i++) {
	      for(var j=1;j<=size;j++) {
	        tile = $('.tile-position-'+j+'-'+i, this.element);
	        if(!tile || tile.data('realpos') != (++k)) return;
	      }
	    }
			this.playing = false;
			this.options.callback(this.rivals(),this.puzzle_dif(), this.moves(), this.elapsed_time());



			var root = $(this.element);
			console.log('won');
			var winInfo = $('<span>').addClass('win-info').text('Great! '+this.moves()+' moves, '+ Math.floor(this.elapsed_time()/1000)+' seconds');
			var startButton = $('<span>').addClass('start-button').text('Play Again');
			var self = this;
			var counter = 3;
			function countdown() {
				if(counter === 0) {
					winInfo.remove();
					startButton.remove();
					self.start();
					return;
				}
				startButton.unbind( "click" );
				startButton.text(counter);
				counter--;
				setTimeout(countdown,1000);
			}

			startButton.click(countdown);
			root.append(
				startButton,
				winInfo
			);
		},

		moves: function() {
			return this._moves;
		},
		rivals: function() {
			return rivalid;
		},
		puzzle_dif: function() {
			return puzzle_dif;
		},


		elapsed_time: function() {
			var td;
			if(this.playing)
				td = (new Date()) - this.start_time;
			else
				td = this.end_time - this.start_time;

			return td;
		},
	};

	// INITIALIZE THE PLUGIN
	var pluginName = 'puzzle';
	$.fn[pluginName] = function(options) {

		return this.each(function() {
			if ( typeof options !== 'string' ) {
				$.data(this, 'plugin_' + pluginName, new Puzzle(this, options));
			}
			var instance = $.data(this, 'plugin_' + pluginName);

			if (typeof options === 'string') {
				if (typeof instance[options] === 'function') {
					instance[options].call(instance);
				}
			}
		});
	};

}));
