var NodeHelper = require("node_helper");
var exec = require('child_process').exec;

module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper: " + this.name);
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG') {
			this.config = payload;
			setInterval(() => {
				this.sendTemperature();
			}, this.config.updateInterval);
		}
	},

	sendTemperature: function() {
		exec("/opt/vc/bin/vcgencmd measure_temp", (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				return;
			}
			this.sendSocketNotification('TEMPERATURE', parseFloat(stdout.replace('temp=','')));
		});
	}
});
