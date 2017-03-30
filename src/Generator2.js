
var forge = require('node-forge');
var fs = require('fs');

Generator2 = module.exports = Class.extend({
	
	initialize: function(properties) {
		
		console.log('Starting the generator.');
		Object.assign(this, properties);
		this.assets = {};
	},
	
	start: function() {
		
		var selfsigned = require('selfsigned');
		var pems = selfsigned.generate([{
		  name: 'commonName',
		  value: 'domain.com'
		}, {
		  name: 'countryName',
		  value: 'US'
		}, {
		  shortName: 'ST',
		  value: 'Texas'
		}, {
		  name: 'localityName',
		  value: 'Austin'
		}, {
		  name: 'organizationName',
		  value: 'Development'
		}, {
		  shortName: 'OU',
		  value: 'Development'
		}], {
			days: 365
		});
		this.write('server.key.private.pem', pems.private);
		this.write('server.key.public.pem', pems.public);
		this.write('server.cert.pem', pems.cert);
	},
	
	write: function(key, value) {
		
		fs.writeFileSync(this.config.directory + '/' + key, value);
	}
});
