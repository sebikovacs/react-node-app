const Datastore = require( "nedb" );

module.exports = ( config ) => {
    const db = {};

    db.users = new Datastore( {
        filename: `${ config.dataDir }${ config.dbDir }/users.db`,
        autoload: true
    } );

    db.clients = new Datastore( {
        filename: `${ config.dataDir }${ config.dbDir }/clients.db`,
        autoload: true
    } );

    return {
        db
    };
};
