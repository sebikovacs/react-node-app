import { withRouter } from "react-router";
import React from "react";
import auth from "./auth";
import "./auth.css";

class Login extends React.Component {
    constructor () {
        super();
        this.state = {
            error: false
        };
    }

    handleSubmit = ( e ) => {
        e.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        auth.login( email, password, ( loggedIn ) => {
            if ( !loggedIn ) {
                return this.setState( { error: true } )
            }

            const { location } = this.props;

            // redirect user
            if ( location.state && location.state.nextPathname ) {
                this.props.router.replace( location.state.nextPathname )
            } else {
                this.props.router.replace( "/" );
            }
        } );
    }
    render() {
        return (
            <div>
                <div>Login </div>
                error: <span style={ { color: "red" } }> { this.state.error ? "true" : "false" }</span>
                <form action="" onSubmit={ this.handleSubmit }>
                    <label htmlFor="email">
                        email:
                        <input type="email" ref="email" id="email" required />
                    </label>
                    <label htmlFor="password">
                        password
                        <input type="password" ref="password" id="password" required /> (hint: password 1)
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default withRouter( Login );
