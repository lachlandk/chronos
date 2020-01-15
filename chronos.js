(function (root, factory) {
	root.Chronos = factory();
}(window, function () {
	return {
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
