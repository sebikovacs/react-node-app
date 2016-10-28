#!/bin/env node
/* server
 */

module.exports = (function() {
    'use strict';

    var express = require('express');
    var app = express();

    var config = {
      port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ipAddress: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
      env: (process.env.OPENSHIFT_NODEJS_IP) ? 'production' : 'development'
    }

    if (config.env === 'production') {
        app.use(express.static(__dirname + '/client/build'));
    }

    // allow self-signed ssl
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // CORS headers
    app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
    });

    var events = function (req, res) {
        res.status(200).send({
            message: 'allright'
        })
    }
    app.get('/api/1/events', events)

    // start express server
    app.listen(config.port, config.ipAddress, function() {
    console.log(
      '%s: Node server started on %s:%d ...',
      Date(Date.now()),
      config.ipAddress,
      config.port
    );
    });

  return app;
}());
