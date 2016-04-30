var NodeHelper = require("node_helper");
var sys = require('sys');
var exec = require('child_process').exec;


module.exports = NodeHelper.create({
	start: function function_name () {
		var self = this;
		setInterval(function() {
			self.sendTemperature();
		}, 1000);
	},

	sendTemperature: function() {
		var self = this;
		child = exec("/opt/vc/bin/vcgencmd measure_temp", function (error, stdout, stderr) {
			if (error) {
				console.log(error);
				return;
			}
	  		self.sendSocketNotification('TEMPERATURE', stdout.replace('temp=','').replace('\'','\°'));
		});
	}
});
