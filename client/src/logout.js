import React from "react";
import auth from "./auth";

class Logout extends React.Component {
    componentDidMount () {
        auth.logout()
    }
    render() {
        return (
            <div>logout</div>
        )
    }
}

export default Logout;
