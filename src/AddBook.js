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

  state = 
  {
    books: []
  }
  handleExit()
  {
    this.props.onExit();
  }
  getBooks(terms)
  {
    if (terms === ""){
      return
    }
    var shelfBooks
    getAll().then((books) => 
    {
      shelfBooks = books
    });
    search(terms, 5).then((books) => {
      books.map((book) => 
    {
      let shelfBook=shelfBooks.find(sb => sb.id === book.id);
      book.shelf="none"
      if (shelfBook!==undefined){
        book.shelf=shelfBook.shelf
      }
      return books
    })
      if (books!==undefined) {
      this.setState({books})
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
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
