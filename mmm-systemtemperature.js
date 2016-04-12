Module.register("mmm-systemtemperature",{

	defaults: {
		prependString: 'System temperature: '
	},

	start: function() {
		this.temperature = 'fetching ...';
		this.sendSocketNotification('CONNECT');
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'TEMPERATURE') {
	    	this.temperature = payload;
	    	this.updateDom();
	    }
	}, 

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.innerHTML = this.config.prependString + this.temperature;
		return wrapper;
	}
});
