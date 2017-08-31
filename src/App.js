import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import AddBook from './AddBook'
import BookShelf from './BookShelf'
import './App.css'

class BooksApp extends React.Component {
  state={
    showSearchPage: true,
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  }
  onUpdateShelf(book, shelf) {
    BooksAPI.update(book, shelf);
    this.setState((state)=> {})
  }

  setBooksState() {
    BooksAPI.getAll().then((books)=> {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/AddBook" render={()=> (
          <AddBook onUpdateShelf={(book, shelf)=> this.onUpdateShelf(book, shelf)} 
            onExit={()=> this.setBooksState}
            />
        )}/>
          
        <Route exact path="/" render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf 
                books={this.state.books.filter((book)=> 
                  book.shelf==="currentlyReading"
                )}
                title="Currently Reading"
                className="bookshelf"
                onUpdateShelf={(book, shelf)=> this.onUpdateShelf(book, shelf)}
                />
                <BookShelf 
                books={this.state.books.filter((book)=> 
                  book.shelf==="wantToRead"
                )}
                title="Want To Read"
                className="bookshelf"
                onUpdateShelf={(book, shelf)=> this.onUpdateShelf(book, shelf)}
                />
               <BookShelf 
                books={this.state.books.filter((book)=> 
                  book.shelf==="read"
                )}
                title="Read"
                className="bookshelf"
                onUpdateShelf={(book, shelf)=> this.onUpdateShelf(book, shelf)}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="AddBook" >Add a book</Link>
            </div>
          </div>
         )}/>
      </div>
    )
  }
}

export default BooksApp
