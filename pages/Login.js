"use strict";

import React from 'react';
import {hashHistory} from 'react-router';

var Uris = require('../Uris');

var LoginForm = require('./LoginForm');
var authService = require('../AuthService');
var Events = require('../Events');

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {}};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        var $this = this;
        var user = $this.state.user || {};

        var style = {
            width: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '13%'
        };

        return (

            <div className="row">
                <div className="col-md-12">

                    <div className="panel panel-primary" style={style}>
                        <div className="panel-heading">
                            <h3 className="panel-title">Login</h3>
                        </div>
                        <div className="panel-body">

                            <LoginForm user={user} onChange={$this.onUserChange.bind($this)}
                                       onSubmit={$this.onUserFormSubmit.bind($this)}/>

                        </div>

                        <div className="panel-footer">
                            <span className="btn btn-primary" onClick={$this.onUserFormSubmit.bind($this)}>Login</span>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    onUserLoggedIn(user) {
        console.log(Events.USER_LOGGED_IN, JSON.stringify(user))
        hashHistory.push(Uris.SELL.CREATE);
    }

    onUserChange(e) {
        var user = this.state.user || {};
        user[e.target.name] = e.target.value;
        this.setState({
            user: user
        });
    }

    onUserFormSubmit() {
        var $this = this;
        var pp = authService.login($this.state.user || {})
                .then($this.onUserLoggedIn)
                .catch(e => {
                    try {
                        var rsp = JSON.parse(e.responseText);
                        alert(rsp.message);
                    } catch (err) {
                        alert("Server error.");
                    }
                    console.log("loginError", e);
                })
            ;
    }
}

module.exports = LoginPage;