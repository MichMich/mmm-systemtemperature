Module.register("mmm-systemtemperature",{

	defaults: {
		prependString: 'System temperature: ',
		updateInterval: 5000,
		animationSpeed: 0,
		unit: 'c'
	},

	start: function() {
		this.temperature = this.translate("LOADING");
		this.sendSocketNotification('CONFIG', this.config);
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'TEMPERATURE') {
	    	this.temperature = payload;
	    	this.updateDom(this.config.animationSpeed);
	    }
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		// Do unit any conversions
		var unit = this.config.unit.toLowerCase();
		if (this.temperature !== this.translate("LOADING") && unit !== 'c') {
			if (unit === 'f') {
				this.temperature = parseFloat(this.temperature) * 9 / 5 + 32;
			} else if (unit === 'k') {
				this.temperature = parseFloat(this.temperature) - 273.15;
			}
			// Round off the temperature to 2 decimal places
			this.temperature = Math.round(parseFloat(this.temperature * 100)) / 100;
		}

		// Append &deg; + unit
		if (this.temperature != this.translate("LOADING")) {
			this.temperature += '&deg;' + this.config.unit.toUpperCase();
		}
		wrapper.innerHTML = this.config.prependString + this.temperature;
		return wrapper;
	},
});
