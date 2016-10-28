import axios from 'axios';

module.exports = {
    login( email, pass, cb ) {

        cb = arguments[arguments.length - 1];

        if (localStorage.token) {
          if (cb) cb(true);
          this.onChange(true);
          return;
        }

        var url = '/api/1/authenticate';
        var self = this;
        var body = {
            email: email,
            pass: pass
        };

        axios.post(url, body).then(function (res) {
            var data = res.data
            if (res.data.success) {
                localStorage.token = data.token

                if (cb) {
                    cb(true)
                }

                self.onChange(true)
            } else {
                if (cb) {
                    cb(false)
                }

                self.onChange(false)
            }
        })
    },
    getToken() {
        return localStorage.token
    },
    logout(cb) {
        delete localStorage.token
        if (cb) cb()
        this.onChange(false)
    },
    loggedIn: () => {
        return localStorage.token;
    },
    onChange () {}
}
