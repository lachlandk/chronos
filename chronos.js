(function (root, factory) {
	root.Chronos = factory();
}(window, function () {
	return {
		intervalTimer: function (callback, interval) {
			return new function (callback, interval) {
				this.callback = callback;
				this.interval = interval;
				this.ideal_time = interval;
				this.running = true;
				this.start_time = new Date().getTime();
				setTimeout(function (timerInstance) {
					timerInstance.tick();
				}, this.interval, this);

				this.tick = function () {
					if (this.running) {
						this.callback();
						let time_elapsed = new Date().getTime() - this.start_time,
							delta = this.ideal_time - time_elapsed;
						setTimeout(function (timerInstance) {
							timerInstance.tick();
						}, this.interval + delta, this);
						this.ideal_time += this.interval;
					}
				};

				this.clear = function () {
					this.running = false;
				}
			}(callback, interval);
		},

		stopWatch: function () {
			return new function () {
				this._startTime = new Date().getTime();
				this.time = function (units = null) {
					if (units === null) {
						return new Date().getTime() - this._startTime;
					} else if (typeof units === "string") {
						switch (units) {
							case "seconds":
								return (new Date().getTime() - this._startTime) / 1000;
							case "minutes":
								return (new Date().getTime() - this._startTime) / (1000 * 60);
							case "hours":
								return (new Date().getTime() - this._startTime) / (1000 * 3600);
						}
					}
				};
			}();
		}
	}
}));
