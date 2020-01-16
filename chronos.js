(function (root, factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory();
	} else {
		root.Chronos = factory();
	}
}(typeof self !== "undefined" ? self : this, function () {
	return {
		intervalTimer: function (callback, interval) {
			return new function (callback, interval) {
				let ideal_time = interval,
					running = true,
					startTime = new Date().getTime(),
					tick = function () {
						if (running) {
							callback();
							let timeElapsed = new Date().getTime() - startTime,
								delta = ideal_time - timeElapsed;
							setTimeout(tick, interval + delta);
							ideal_time += interval;
						}
					};

				this.clear = function () {
					running = false;
				};

				setTimeout(tick, interval);
			}(callback, interval);
		},

		stopWatch: function () {
			return new function () {
				let startTime = new Date().getTime();

				this.time = function (units = null) {
					if (units === null) {
						return new Date().getTime() - startTime;
					} else if (typeof units === "string") {
						switch (units) {
							case "seconds":
								return (new Date().getTime() - startTime) / 1000;
							case "minutes":
								return (new Date().getTime() - startTime) / (1000 * 60);
							case "hours":
								return (new Date().getTime() - startTime) / (1000 * 3600);
						}
					}
				};
			}();
		}
	}
}));
