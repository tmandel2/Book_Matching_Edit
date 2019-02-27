import React, { Component } from 'react';

class BooksInDatabase extends Component{
    constructor(){
        super();
        this.state = {
            bookList: []
        }
    }
    getDbBooks = async ()=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/books`, {
                method: 'GET',
                credentials: 'include'
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsed = await response.json();
            this.setState({
                bookList: parsed
            })
        }catch(err){
            console.log(err);
            return err;
        }
    }
    addBook = async (data)=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/books`, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsed = await response.json();
        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteBook = async (id)=>{
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/books/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            await response;
            this.setState({
                bookList: this.state.bookList.filter(book => book.id !== id)
            })

        }catch(err){
            console.log(err);
            return err;
        }
    }
    componentDidMount(){
        this.getDbBooks();
    }
    render(){
        const books = this.state.bookList.map((book, i)=>{
            return(
                <li key={book.id}>
                    <img src={book.image === undefined ? null : book.image} alt={book.image}/>
                     <br/>
                    {book.title} <br/>
                    by: {book.author} <br/>
                    <button onClick={this.addBook.bind(null, book)} >Add book to favorites</button><br/>
                    <button onClick={this.deleteBook.bind(null, book.id)}>Delete book from database</button> 
                    
                </li>
            )
        })
        return(
            <div className="book-container">
                <h1>Books our Users have Loved!</h1>
                <ul>
                    {books}
                </ul>
            </div>
        )
    }
}
export default BooksInDatabase;