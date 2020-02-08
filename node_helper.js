var NodeHelper = require("node_helper");
var exec = require('child_process').exec;


module.exports = NodeHelper.create({
	start: function() {
		console.log("Starting node helper: " + this.name);
	},

	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		var self = this;

		if (notification === 'CONFIG') {
			this.config = payload;

			setInterval(function() {
				self.sendTemperature();
			}, this.config.updateInterval);
		}
		
	},

	sendTemperature: function() {
		var self = this;
		child = exec("/opt/vc/bin/vcgencmd measure_temp", function (error, stdout, stderr) {
			if (error) {
				console.log(error);
				return;
			}
		self.sendSocketNotification('TEMPERATURE', parseFloat(stdout.replace('temp=','')));
		});
	}
});
