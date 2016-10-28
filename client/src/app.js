import React, { Component } from 'react';
import { Link } from 'react-router';
import './app.css';
import xhr from 'xhr';
import auth from './auth'

class App extends Component {
    constructor () {
        super()
        this.state = {
            loggedIn: auth.loggedIn()
        }
    }

    updateAuth = (loggedIn) => {
        this.setState({
            loggedIn
        })
    }

    componentWillMount() {
        auth.onChange = this.updateAuth;
        auth.login()
    }

    componentDidMount( ) {
        var url = '/api/1/events';
        xhr({
            url
        }, (err, data) => {
            // var body = JSON.parse(data.body)
            // console.log(body)
        })
    }
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <nav>
                    <Link to="/logout">Logout</Link>
                    <Link to="/login">Login</Link>
                </nav>
                { this.state.loggedIn ? 'Logged in' + JSON.stringify(this.state.loggedIn) : 'Not Logged in' }
                { this.props.children }
            </div>
        );
    }
}

export default App;
