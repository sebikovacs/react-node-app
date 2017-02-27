import React, { Component } from "react";
import { Link } from "react-router";
import "./skeleton.css";
import "./app.css";
import auth from "./auth";

class App extends Component {
    constructor () {
        super();
        this.state = {
            loggedIn: auth.loggedIn()
        };
    }

    componentWillMount() {
        auth.onChange = this.updateAuth;
        auth.login();
    }

    componentDidMount() {
        // const url = "/api/1/events";
        // xhr({
        //     url
        // }, (err, data) => {
        //     // const body = JSON.parse(data.body)
        //     // console.log(body)
        // })
    }

    updateAuth = ( loggedIn ) => {
        this.setState( {
            loggedIn
        } );
    }

    render() {
        const loggedIn = JSON.stringify( this.state.loggedIn );
        return (
            <div className="row">
                <div className="four columns offset-by-four">
                    <h1>HEADER { loggedIn }</h1>
                    <nav>
                        { this.state.loggedIn ? <Link className="button" to="/logout">Logout</Link> : <Link className="button" to="/login">Login</Link> }
                        <Link className="button" to="/register">Register</Link>
                    </nav>

                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default App;
