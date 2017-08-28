import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
//import serializeForm from 'form-serialize'

class Book extends Component {

static propTypes = {
    book: PropTypes.object.isRequired,
    bookID: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    shelf: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    onUpdateShelf: PropTypes.func.isRequired
}

handleChange = (e) => {
    var index = e.nativeEvent.target.selectedIndex;
    var indexToShelf = {0:"none", 1:"currentlyReading", 2:"wantToRead", 3:"read", 4:"none"}
    this.props.onUpdateShelf(this.props.book, indexToShelf[index]);
    //console.log(indexToShelf[index])

}

updateQuery = (query) => {
    this.setState({ query: query.trim() })
}

clearQuery = () => {
    this.setState({ query: ''})
}

render() {
    const {imageURL, title, bookID} = this.props
    var authors = this.props.authors
    //console.log(authors)
  
  return (

    <div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageURL})` }}></div>
        <div className="book-shelf-changer">
            <select defaultValue={this.props.book.shelf} onChange={this.handleChange}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
        </div>
        <div className="book-title">{this.props.title}</div>

         {authors
          ? authors.map((author, key) =>
              <div key={`${bookID}-${key}`} className="book-authors">
                {author}
              </div>,
            )
          : ''}
    </div>

    )
}
}

export default Book