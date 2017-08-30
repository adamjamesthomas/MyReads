import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    onUpdateShelf: PropTypes.func.isRequired
}

updateQuery = (query) => {
    this.setState({ query: query.trim() })
}

clearQuery = () => {
    this.setState({ query: ''})
}

render() {

    const {books, title, className}=this.props

  return (
      
    <div className={className}>
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map((book) => (
                    <li key={book.id}>
                        <Book 
                        book={book}
                        bookID={book.id} 
                        imageURL={book.imageLinks.smallThumbnail}
                        shelf={0}
                        title={book.title}
                        authors={book.authors}
                        onUpdateShelf={(book, shelf) => this.props.onUpdateShelf(book, shelf)}
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