import React, { Component } from 'react';

const genreList = ['fiction', 'historical fiction', 'sci fi', 'romance', 'fantasy', 'nonfiction', 'foreign']

class SearchBar extends Component{
    constructor(){
        super();
        this.state = {
            searchTerm: '',
            searchGenre: '',
            titleOrAuthor: ''
        }
    }
    handleChange = (e)=>{
        const searchTerm = e.target.value;
        const regex = / /gi;
        searchTerm.replace(regex, '+');
        this.setState({
            searchTerm: searchTerm
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.getBooks(this.state);
    }
    handleGenre = (e)=>{
        let genre = e.target.value;
        genre = genre.replace(/ /gi, '+');
        this.setState({
            searchGenre: genre
        })
    }
    handleRadio = (e)=>{
        document.getElementById('searchTerm').placeholder = `Search by ${e.target.value}`
        this.setState({
            titleOrAuthor: e.target.value
        })
    }
    render(){
        const genreOptions = genreList.map((genre, i)=>{
            return(
                <option value={genre} key={i}>{genre}</option>
            )
        })
        return(
            <div className="searchbar">
                <h2>Search for a book</h2>
                <form className="searchbar-form" onSubmit={this.handleSubmit}>
                    <div className="searchbar-radios">
                        <div className="searchbar-title">
                            <input type="radio" name="titleOrAuthor" value="title" onChange={this.handleRadio}/>
                            Title
                        </div>
                        <div className="searchbar-author">
                            <input type="radio" name="titleOrAuthor" value="author" onChange={this.handleRadio}/>
                            Author
                        </div>
                    </div>
                    <input id="searchTerm" type="text" name="searchTerm" onChange={this.handleChange} placeholder="Title or Author"/>
                    <select className="search-select" name="searchGenre" onChange={this.handleGenre} >
                        <option disabled>----select a genre----</option>
                        <option value=''>all genres</option>
                        {genreOptions}
                    </select>
                    <br/>
                    <button>Search</button>
                </form>
            </div>
            
        )
    }
}
export default SearchBar;