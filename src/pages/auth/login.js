import React, { Fragment } from 'react';
import logo from "../../assets/images/xplex.png";
import axios from 'axios';
import { remoteServer } from '../../variables';
import Cookies from 'universal-cookie';



class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };


        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        axios.post(`${remoteServer}/login`, data, {
            headers: { "Content-Type": "multipart/form-data", ctype: 'multipart/form-data' }
        })
            .then(function (response) {
                if (response.data.token) {
                    console.log(response.data)
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("user_id", response.data.id);
                    window.localStorage.setItem("name", response.data.name);
                    const cookies = new Cookies();
                    cookies.set('__session', response.data.token);
                    window.location = 'http://localhost:3000/films';
                }//
            })
            .catch(function (error) {
                alert(error);
            });

        this.setState({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''

        })


    }

    render() {
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="container-fluid">
                        {/* <!-- sign up page start--> */}
                        <div className="authentication-main">
                            <div className="row">
                                <div className="col-sm-12 p-0">
                                    <div className="auth-innerright">
                                        <div className="authentication-box">
                                            <div className="text-center"><img width="40%" src={logo} alt="" /></div>
                                            <div className="card mt-4 p-4">

                                                <h6 className="text-center">Enter your Name , Email and Password For Login</h6>
                                                <form onSubmit={this.handleSubmit} className="theme-form">
                                                    <div className="form-group">
                                                        <label className="col-form-label">Email</label>
                                                        <input className="form-control" type="email" placeholder="JohnDeo@gmail.com" value={this.state.email} onChange={this.handleEmail} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" placeholder="**********" value={this.state.password} onChange={this.handlePassword} required />
                                                    </div>


                                                    <div className="form-row">
                                                        <div className="col-sm-4">
                                                            <button className="btn btn-primary" type="submit">Login</button>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <div className="text-left mt-2 m-l-20">Don't have an account?  <a className="btn-link text-capitalize" href="/signup">Sign Up</a></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- sign up page ends--> */}
                    </div>
                </div>
            </Fragment>
        );
    }
}



export default Login;