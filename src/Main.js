
var homedir = require('homedir');
var extra = require('fs-extra');
var Class = require('./Class');
var Generator = require('./Generator');
var Generator2 = require('./Generator2');
var Server = require('./Server');

Main = Class.extend({
	
	initialize : function() {
		
		this.initializeOutput();
		this.initializeGenerator();
	},
	
	initializeOutput : function() {
		
		this.directory = homedir() +  '/workspace/godsend-trust-output';
		extra.ensureDirSync(this.directory);
	},
	
	initializeGenerator : function() {
		
		if (false) {
			this.generator = new Generator({
				config : {
					directory : this.directory,
					uri : 'http://www.domain.com',
					ip : '127.0.0.1',
					attributes : [{
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
					}]
				}
			});
		} else {
			this.generator = new Generator2({
				config : {
					directory : this.directory,
					uri : 'http://www.domain.com',
					ip : '127.0.0.1'
				}
			});
		}
		this.generator.start();
		var server = new Server();
		server.start(function() {
			console.log('Server has started');
		});
	}
});

new Main();
