var fs = require('fs');
var path = require('path');
var homedir = require('homedir');
var extra = require('fs-extra');
var Express = require('express');
Express.serveIndex = require('serve-index');
var Class = require('godsend').WebServer;
var SocketServer = require('godsend').SocketServer;
var exchange = require('godsend').Exchange;
var ss = require('socket.io-stream');

Server = module.exports = Class.extend({
   
   initialize: function(properties) {
      
      Object.assign(this, properties);
   },
   
   start: function(callback) {
      
      console.log('Starting server.');
		var Express = require('express');
		var express = Express();
		var server = null;
		if (true) {
			var directory = homedir() +  '/workspace/godsend-trust-output';
			extra.ensureDirSync(directory);
			var key = fs.readFileSync(path.join(directory, './server.key.private.pem'));
			var cert = fs.readFileSync(path.join(directory, './server.cert.pem'));
			console.log('key: ' + key);
			console.log('cert: ' + cert);
			server = require('https').createServer({
				key: fs.readFileSync(path.join(directory, './server.key.private.pem')),
				cert: fs.readFileSync(path.join(directory, './server.cert.pem')),
				requestCert: true
			}, express);
		} else {
			server = require('http').createServer(express);
		}
		server.listen(8080, process.env.IP);
      express.use('/', Express.static(path.join(process.env.PWD, './www')));
      express.use('/', Express.serveIndex(path.join(process.env.PWD, './www'), {
         'icons': true
      }));
		var io = require('socket.io').listen(server);
		io.on('connection', function(socket) {
			socket = ss(socket);
			socket.on('send', function() {
				console.log('send');
			}.bind(this));
		}.bind(this));
		io.on('error', function(socket) {
			console.log('error: ' + error);
		});
		callback();
   }
});
