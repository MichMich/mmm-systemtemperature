Module.register("mmm-systemtemperature",{

	defaults: {
		prependString: 'System temperature: ',
		updateInterval: 5000,
		animationSpeed: 0,
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
		wrapper.innerHTML = this.config.prependString + this.temperature;
		return wrapper;
	}
});
