var NodeHelper = require("node_helper");
var exec = require('child_process').exec;
var fs = require('fs');

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
		var command = "/opt/vc/bin/vcgencmd measure_temp"
		
		// Since on 64 bit OS's like Raspbian, path to vcgencmd is different 
		// we need to adjust it accordingly
		if (fs.existsSync(command) === false) {
		  command = "/usr/bin/vcgencmd measure_temp"
		}
		
		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				return;
			}
			this.sendSocketNotification('TEMPERATURE', parseFloat(stdout.replace('temp=','')));
		});
	}
});
