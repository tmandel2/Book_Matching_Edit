import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import EditUser from '../EditUser';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.user.username,
            newUsername: '',
            user: this.props.user,
            userData: '',
            showModal: false,
            message: ''
        }
    }
    getUser = async (id)=>{
        try{
            const foundUser = await fetch(`${process.env.REACT_APP_BACKEND}/users/${id}`, {
            method: 'GET',
            credentials: 'include'
            })
            if(!foundUser.ok){
                // throw Error(foundUser.statusText);
            }
            const parsed = await foundUser.json();
            this.setState({
                userData: {
                    user: parsed.user,
                    likedBooks: parsed.books
                }
            })
        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteUser = async (id)=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            this.props.history.push('/')
        }catch(err){
            console.log(err);
            return err;
        }
    }
    showModal = (e)=>{
        this.setState({
            showModal: true,
            newUsername: this.state.username
        })
    }
    handleEditInput = (e)=>{
        this.setState({
            newUsername: e.target.value
        })
    }
    editUser = async (data, e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/${this.state.user.id}`, {
                method: 'PUT',
                credentials: 'include',
                body: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsed = await response.json();
            if(parsed.code && parsed.code === 11000){
                this.setState({
                    message: 'This username is already taken! Try again.'
                })
            }
            this.props.getUserInfo(parsed);
            this.setState({
                showModal: false,
                username: parsed.username,
                message: ''
            })

        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteBook = async (id)=>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/users/books/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if(!response.ok){
            throw Error(response.statusText);
        }
        const parsed = await response.json();
        this.setState({
            user: parsed
        })
        this.getUser(this.state.user.id);
    }
    componentDidMount(){
        this.getUser(this.state.user.id);
    }
    render(){
        const likedBooks = this.state.userData.likedBooks ? this.state.userData.likedBooks.map((book)=>{
            return(
                <li key={book.id} className="liked-books">
                    <img className="book-image" src={book.image} alt={book.image}/>
                    <div className="title-author">
                        <div className="book-title">{book.title}</div>
                        <small>by: {book.author}</small><br/>
                    </div>
                    <button onClick={this.deleteBook.bind(null, book.id)}>Remove from Favorites</button>
                </li>
            )
        }) : 'None';
        return(
            <div className="profile-page">
                <h2>{this.state.username}'s Profile</h2>
                {this.state.showModal ? <EditUser editUser={this.editUser} handleEditInput={this.handleEditInput} username={this.state.username} newUsername={this.state.newUsername}/> : <button onClick={this.showModal} >Edit Profile</button>}
                <button onClick={this.deleteUser.bind(null, this.state.user.id)} >Delete your Account</button>
                {this.state.message}
                <h3>Your Favorite Books</h3>
                <ul>
                    {likedBooks}
                </ul>
                
                

            </div>
        )
    }
}
export default withRouter(Profile);