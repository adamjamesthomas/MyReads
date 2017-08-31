import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search, getAll } from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class AddBook extends Component {

  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired
}

  state = {
    books: []
  }

  handleExit(){
    this.props.onExit();
  }
  
  getBooks(terms){
    if (terms === ""){
      this.setState({books: []})
      return;
    }
    
    //Use search terms to get list of book results
    search(terms, 5).then((books) => {
      //initialize bookResults as empty array
      let bookResults = [];
      
      if(!books.error){
        bookResults = books;
        //get all books on a shelf
        let shelfBooks = [];
        getAll().then((books) => {
          shelfBooks = books;
        });
        //update shelves for book results already on shelves
        books.map((book) => {
        let shelfBook=shelfBooks.find(sb => sb.id === book.id);
        book.shelf="none"
        if (shelfBook!==undefined){
          book.shelf=shelfBook.shelf;
        }
        return books;
        })
      }
      if (bookResults!==undefined) {
      this.setState({books: bookResults});
      }
    })
      
  }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search" 
                onClick={this.handleExit}
                to="/"
                >
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input type="text" 
                  placeholder="Search by title or author"
                  onChange={event => this.getBooks(event.target.value)}/>
                
              </div>
            </div>
            <BookShelf 
            books={this.state.books}
            title="Search Results"
            className="books-grid"
            onUpdateShelf={(book, shelf) => this.props.onUpdateShelf(book, shelf)}
            />
          </div>
        )
    }

}

export default AddBook
