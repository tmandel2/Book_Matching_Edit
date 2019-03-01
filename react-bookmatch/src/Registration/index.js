import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        }
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/auth/registration`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
               this.setState({
                    message: 'This username is already taken!'
                })                
                throw Error(response.statusText);
            }
            const parsed = await response.json();
            if(parsed){
                this.setState({
                    message: ''
                })
                this.props.getUserInfo(parsed);
                this.props.history.push('/profile');
            }
        }catch(err){
            console.log(err);
            return err;
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        return(
            <div className="searchbar">
                <h2>Register</h2>
                {this.state.message}
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange} placeholder="Create a username" className="login-input"/>
                    <input type="password" name="password" onChange={this.handleChange} placeholder="Create a password" className="login-input"/>
                    <button type="submit">Register your account</button>
                </form>
            </div>
        )
    }
}

export default withRouter(Registration);