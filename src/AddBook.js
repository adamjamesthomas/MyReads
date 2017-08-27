import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from './BooksAPI'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class AddBook extends Component {

  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
}

  state = 
  {
    books: []
  }
  getBooks(terms)
  {
    if (terms === ""){
      return
    }

    search(terms, 5).then((books) => {
      if (books !== undefined) {
      this.setState({books})
      //console.log(this.state.books)
      }
    })
      
  }
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search" 
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
            />
          </div>
        )
    }

}

export default AddBook
