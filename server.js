#!/bin/env node
/* server
 */
const express = require( "express" );
const bodyParser = require( "body-parser" );
const jwt = require( "jsonwebtoken" );
const datastore = require( "./api/datastore.js" );

module.exports = ( function() {
    const app = express();
    const oneDay = 1440;

    const config = {
        port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
        ipAddress: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
        env: ( process.env.OPENSHIFT_NODEJS_IP ) ? "production" : "development",
        dataDir: "../data",
        dbDir: "/db",
        secret: "bookphonegaptreehugs"
    };

    if ( config.env === "production" ) {
        app.use( express.static( `${ __dirname }/client/build` ) );
    }

    app.use( bodyParser.urlencoded( { extended: false } ) );
    app.use( bodyParser.json() );

    // allow self-signed ssl
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    // CORS headers
    app.all( "*", ( req, res, next ) => {
        res.header( "Access-Control-Allow-Origin", "*" );
        res.header( "Access-Control-Allow-Headers", "X-Requested-With, Content-Type" );
        next();
    } );

    const db = datastore( config ).db;

    const users = ( req, res ) => {
        db.users.find( {}, ( err, allUsers ) => {
            res.send( {
                users: allUsers
            } );
        } );
    };

    const authenticate = ( req, res ) => {
        db.users.findOne( {
            email: req.body.email
        }, ( err, user ) => {
            if ( err ) {
                throw err;
            }

            if ( !user ) {
                return res.json( {
                    success: false,
                    message: "Authentication failed. User not found." }
                );
            }

            if ( user.password !== req.body.pass ) {
                return res.json( {
                    success: false,
                    message: "Authentication failed. Wrong password."
                } );
            }

            const token = jwt.sign( user, config.secret, {
                expiresIn: oneDay
            } );

            return res.send( {
                success: true,
                message: "Enjoy your token",
                token
            } );
        } );
    };

    app.get( "/api/1/users", users );
    app.post( "/api/1/authenticate", authenticate );

    // start express server
    app.listen( config.port, config.ipAddress, () => {
        console.log(
            "%s: Node server started on %s:%d ...",
            Date( Date.now() ),
            config.ipAddress,
            config.port
        );
    } );

    return app;
}() );
