Module.register("mmm-systemtemperature",{

	defaults: {
		prependString: 'System temperature: ',
		updateInterval: 5000,
		animationSpeed: 0,
		unit: 'c'
	},

	start: function() {
		this.temperature = 'fetching ...';
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
		if(this.temperature!='fetching ...' && this.config.unit.toLowerCase()!='c') {
			if(this.config.unit.toLowerCase()=='f')
				this.temperature = parseFloat(this.temperature) * 9 / 5 + 32;
			else if(this.config.unit.toLowerCase()=='k')
				this.temperature = parseFloat(this.temperature) - 273.15;

			// Round off the temperature to 2 decimal places
			this.temperature = Math.round(parseFloat(this.temperature*100))/100;
		}


		// Append &deg; + unit
		if(this.temperature!='fetching ...')
			this.temperature += '&deg;'+this.config.unit.toUpperCase();

		wrapper.innerHTML = this.config.prependString + this.temperature;
		return wrapper;
	}
});
