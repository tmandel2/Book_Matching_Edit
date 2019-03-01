import React, { Component } from 'react';
import Registration from '../Registration';
import { withRouter } from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            showRegistration: false
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND}/auth/login`, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!loginResponse.ok){
                this.setState({
                    message: "Incorrect username or password"
                })
                throw Error(loginResponse.statusText);
            }
            const parsed = await loginResponse.json();
            if(parsed){
                this.setState({
                    message: ''
                })
                this.props.getUserInfo(parsed);
                this.props.history.push('/profile');
            }
        }catch(err){
            console.log(err);
            return(err);
        }
    }
    showRegistration = () => {
        this.setState({
            showRegistration: true
        })
    }
    render(){
        return(
            <div className="searchbar">
                <h2>Log in</h2>
                {this.state.message}
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} className="login-input"/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} className="login-input"/>
                    <button>Log In</button>
                </form>
                {this.state.showRegistration ? <Registration history={this.props.history} getUserInfo={this.props.getUserInfo}/> : <button className="register-button" onClick={this.showRegistration}>Need to Register?</button>}
            </div>
        )
    }
}

export default withRouter(Login);