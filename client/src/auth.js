import axios from "axios";

module.exports = {
    login( email, pass, cb ) {
        if ( localStorage.token ) {
            if ( cb ) cb( true );
            return this.onChange( true );
        }

        const url = "/api/1/authenticate";
        const self = this;
        const body = {
            email,
            pass
        };

        axios.post( url, body ).then( ( res ) => {
            const data = res.data;
            if ( res.data.success ) {
                localStorage.token = data.token;

                if ( cb ) {
                    cb( true );
                }

                self.onChange( true );
            } else {
                if ( cb ) {
                    cb( false );
                }

                self.onChange( false );
            }
        } );
    },

    register( email, pass, cb ) {
        // do register
    },

    getToken() {
        return localStorage.token;
    },

    logout( cb ) {
        delete localStorage.token;
        if ( cb ) {
            cb();
        }
        this.onChange( false );
    },

    loggedIn: () => localStorage.token,

    onChange () {}
};
