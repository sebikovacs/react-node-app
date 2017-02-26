const Datastore = require( "nedb" );

module.exports = ( config ) => {
    const db = {};

    db.users = new Datastore( {
        filename: `${ config.dataDir }${ config.dbDir }/users.db`,
        autoload: true
    } );

    return {
        db
    };
};
