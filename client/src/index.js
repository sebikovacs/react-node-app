// lib components
import React from "react";
import { Router, Route, browserHistory } from "react-router";
import ReactDOM from "react-dom";

// local components
import App from "./app";
import Login from "./login";
import Logout from "./logout";
import About from "./about";
import Dashboard from "./dashboard";
import Register from "./register";
import auth from "./auth";
import "./index.css";

const requireAuth = ( nextState, replace ) => {
    if ( !auth.loggedIn( ) ) {
        replace( {
            pathname: "/login",
            state: { nextPathname: nextState.location.pathname }
        } );
    }
};

ReactDOM.render(
    <Router history={ browserHistory }>
        <Route path="/" component={ App }>
            <Route path="login" component={ Login } />
            <Route path="register" component={ Register } />
            <Route path="logout" component={ Logout } />
            <Route path="about" component={ About } />
            <Route path="dashboard" component={ Dashboard } onEnter={ requireAuth } />
        </Route>
    </Router>,
    document.getElementById( "root" )
 );
