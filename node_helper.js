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
		var command = "cat /sys/class/thermal/thermal_zone*/temp"

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				return;
			}
			var temperatures = stdout.trim().split('\n').map((t) => parseInt(t));
			var average = temperatures.reduce((a, b) => a + b, 0) / temperatures.length || 0;
			this.sendSocketNotification('TEMPERATURE', (average / 1000).toFixed(2));
		});
	}
});
