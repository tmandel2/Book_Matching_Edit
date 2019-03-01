import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import BookListing from '../BookListing';
// const convert = require('xml-js');
// const https = require('https');


const googleApiKey = `${process.env.REACT_APP_GOOGLEKEY}`;

class BookContainer extends Component{
    constructor(){
        super();
        this.state = {
            searchTerm: '',
            searchGenre: '',
            bookList: [],
            titleOrAuthor: ''
        }
    }
    getGoogleBooks = async (state)=>{
        const genre = state.searchGenre.length > 0 ? `+subject:${state.searchGenre}` : '';
        const searchTerm = state.titleOrAuthor === 'title' ? state.searchTerm : `inauthor:${state.searchTerm}`;
        try{
            const foundBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${genre}&key=${googleApiKey}&country=US`)
            if(!foundBook.ok){
                throw Error(foundBook.statusText);
            }

            const parsed = await foundBook.json();
            this.setState({
                bookList: parsed.items,
                searchTerm: searchTerm,
                searchGenre: genre,
                titleOrAuthor: state.titleOrAuthor
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
            const deletedBook = await fetch(`${process.env.REACT_APP_BACKEND}/books/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })

            if(!deletedBook.ok){
                throw Error(deletedBook.statusText);
            }
            const parsed = await deletedBook.json();
        }catch(err){
            console.log(err);
            return err;
        }
    }
    render(){
        const bookArray = this.state.bookList === undefined ? <h1>Oops! That book title wasn't found...</h1> : this.state.bookList.map((book, i)=>{
            return(
                <li key={book.id}>
                    <BookListing addBook={this.addBook} book={book}/>
                </li>
            )
        })
        
        return(
            <div className="book-container">
                <SearchBar getBooks={this.getGoogleBooks} />
                {this.state.bookList.length > 0 ? <h1>Search Results {this.state.titleOrAuthor}</h1> : null}
                <ul>
                    {bookArray}
                </ul>
            </div>
        )
    }
}



export default BookContainer;