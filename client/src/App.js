import React, { Component } from 'react';
import './App.css';
import xhr from 'xhr';

class App extends Component {
    componentDidMount( ) {
        var url = '/api/1/events';
        xhr({
            url
        }, (err, data) => {
            var body = JSON.parse(data.body)
            console.log(body)
        })
    }
    render() {
        return (
            <div>
                <h1>App</h1>
            </div>
        );
    }
}

export default App;
