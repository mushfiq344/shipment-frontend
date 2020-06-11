import React, { Fragment } from 'react';
import logo from "../../assets/images/xplex.png";
import axios from 'axios';

import Cookies from 'universal-cookie';



class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", email: "", password: "", password_confirmation: "" };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword_confirmation = this.handlePassword_confirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleName(event) {

        this.setState({ name: event.target.value });
    }
    handleEmail(event) {
        this.setState({ email: event.target.value });
    }
    handlePassword(event) {
        this.setState({ password: event.target.value });
    }


    handlePassword_confirmation(event) {
        this.setState({ password_confirmation: event.target.value });
    }




    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.name);
        const data = new FormData();
        data.append('name', this.state.name)
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('password_confirmation', this.state.password_confirmation)


        axios.post('http://127.0.0.1:8000/api/register', data, {
            headers: { "Content-Type": "multipart/form-data", ctype: 'multipart/form-data' }
        })
            .then(function (response) {

                if (response.data.token) {
                    console.log(response.data)
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("user_id", response.data.user.id);
                    window.localStorage.setItem("name", response.data.user.name);
                    const cookies = new Cookies();
                    cookies.set('__session', response.data.token);

                    window.location = 'http://localhost:3000/films';
                }
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
                                                <h4 className="text-center">NEW USER</h4>
                                                <h6 className="text-center">Enter your Name , Email and Password For Signup</h6>
                                                <form onSubmit={this.handleSubmit} className="theme-form">
                                                    <div className="form-row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label className="col-form-label">Name</label>
                                                                <input className="form-control" type="text" placeholder="John" value={this.state.name} onChange={this.handleName} required />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Email</label>
                                                        <input className="form-control" type="email" placeholder="JohnDeo@gmail.com" value={this.state.email} onChange={this.handleEmail} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Password</label>
                                                        <input className="form-control" type="password" placeholder="**********" value={this.state.password} onChange={this.handlePassword} required />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="col-form-label">Confirm Password</label>
                                                        <input className="form-control" type="password" placeholder="**********" value={this.state.password_confirmation} onChange={this.handlePassword_confirmation} required />
                                                    </div>

                                                    <div className="form-row">
                                                        <div className="col-sm-4">
                                                            <button className="btn btn-primary" type="submit">Sign Up</button>
                                                        </div>
                                                        <div className="col-sm-8">
                                                            <div className="text-left mt-2 m-l-20">Are you already user?  <a className="btn-link text-capitalize" href="/login">Login</a></div>
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



export default Signup;