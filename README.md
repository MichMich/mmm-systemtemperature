# Module: MMM-SystemTemperature
This MagicMirror modules allows you to show your processor temperature on you mirror.
It also allows to safely shutdown the Raspberry Pi using [MMM-Remote-Control](https://github.com/Jopyth/MMM-Remote-Control) if you configure it.

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/MichMich/mmm-systemtemperature.git
````

Install dependencies:
````
npm install
````

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'mmm-systemtemperature',
		position: 'top_center',	// This can be any of the regions.
		classes: 'small dimmed', // Add your own styling. Optional.
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>prependString</code></td>
			<td>The text that will be shown before the temperature.
				<br><b>Default value:</b> <code>'System temperature: '</code>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often does the content needs to be fetched? (Milliseconds)
				<br><b>Possible values:</b> <code>1000</code> - <code>86400000</code>
				<br><b>Default value:</b> <code>5000</code> (5 seconds)
			</td>
		</tr>
		<tr>
			<td><code>animationSpeed</code></td>
			<td>Speed of the update animation. (Milliseconds)
				<br><b>Possible values:</b> <code>0</code> - <code>5000</code>
				<br><b>Default value:</b> <code>0</code> (animation off)
			</td>
		</tr>
		<tr>
			<td><code>unit</code></td>
			<td>Temperature unit of measurement
				<br><b>Possible values:</b> <code>c</code> (Celsius), <code>f</code> (fahrenheit), <code>k</code> (Kelvin)
				<br><b>Default value:</b> <code>c</code> (Celsius)
			</td>
		</tr>
		<tr>
			<td><code>warning</code></td>
			<td>Specific config for <code>warning</code> state
				<br><b>Possible values:</b> <code>{ temp: 0-999, color: '#HEX', command: Object }</code>
				<br><b>Default value:</b> <code>{ temp: 60, color: 'orange', command: undefined }</code> 
			</td>
		</tr>
		<tr>
			<td><code>critical</code></td>
			<td>Specific config for <code>critical</code> state
				<br><b>Possible values:</b> <code>{ temp: 0-999, color: '#HEX', command: Object  }</code>
				<br><b>Default value:</b> <code>{ temp: 75, color: 'red', command: { notification: 'REMOTE_ACTION', payload: { action: 'SHUTDOWN' } } }</code> 
				<br><b>NOTE:</b> The <code>REMOTE_ACTION</code> notification (<code>SHUTDOWN</code> and <code>MONITOROFF</code>) actions require the <a href="https://github.com/Jopyth/MMM-Remote-Control">MMM-Remote-Control</a> module to be installed.
			</td>
		</tr>
	</tbody>
</table>
