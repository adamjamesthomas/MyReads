import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class BookShelf extends Component {

static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string
}

state = {
    query: ''
}

updateQuery = (query) => {
    this.setState({ query: query.trim() })
}

clearQuery = () => {
    this.setState({ query: ''})
}

render() {

    const {books, title, className} = this.props
    const {query} = this.state

  return (
      
    <div className={className}>
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map((book) => (
                    <li key={book.id}>
                        <Book 
                        bookID={book.id} 
                        imageURL={book.imageLinks.smallThumbnail}
                        shelf={0}
                        title={book.title}
                        authors={book.authors}
                        />
                    </li>
                ))}
        </ol>
        </div>
    </div>

    )
}
}

export default BookShelf