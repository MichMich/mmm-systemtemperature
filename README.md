# Module: Hello World
This MagicMirror modules allows you to show your processor temperature on you mirror. Currently it only works with a Raspberry Pi.


## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/MichMich/mm-systemtemperature.git
````

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'systemtemperature',
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
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>prependString</code></td>
			<td>The text that will be shown before the temperature.<br>
				<br><b>Default value:</b> <code>'System temperature: '</code>
			</td>
		</tr>
	</tbody>
</table>
