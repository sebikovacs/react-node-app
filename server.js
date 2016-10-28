#!/bin/env node
/* server
 */

module.exports = (function() {
    'use strict';

    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var jwt = require('jsonwebtoken');

    var config = {
      port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ipAddress: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
      env: (process.env.OPENSHIFT_NODEJS_IP) ? 'production' : 'development',
      dataDir: '../data',
      dbDir: '/db',
      secret: 'bookphonegaptreehugs'
    }

    if (config.env === 'production') {
        app.use(express.static(__dirname + '/client/build'));
    }

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // allow self-signed ssl
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // CORS headers
    app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
    });

    var datastore = require('./api/datastore.js');
    var db = datastore(config).db;

    var events = function (req, res) {
        res.status(200).send({
            message: 'allright'
        })
    }

    var users = function (req, res) {
        db.users.find({}, function ( err, users ) {
            res.send({
                users: users
            })
        })
    }

    var authenticate = function (req, res) {
        db.users.findOne({
            email: req.body.email
        }, function (err, user) {
            
            if (err) {
                throw err;
            }

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
                return;
            } else if (user) {
                if (user.password !== req.body.pass) {

                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });

                } else {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 1440 // 24 hours
                    });
                    res.send({
                        success: true,
                        message: 'Enjoy your token',
                        token: token
                    })
                }
            }
        })
    }

    app.get('/api/1/users', users)
    app.post('/api/1/authenticate', authenticate)

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
