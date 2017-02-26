import React, { Component } from "react";
import { Link } from "react-router";
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
            <div>
                <h1>Homepage</h1>
                <nav>
                    <Link to="/logout">Logout</Link>
                    <Link to="/login">Login</Link>
                </nav>
                { this.state.loggedIn ? `Logged in ${ loggedIn }` : "Not Logged in" }
                { this.props.children }
            </div>
        );
    }
}

export default App;
