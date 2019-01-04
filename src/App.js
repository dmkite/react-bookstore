import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Header from './Header'
import UserPage from './UserPage'
import SideBar from './SideBar'
import AdminPage from './AdminPage'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdmin: false,
      openLogin: false,
      catalogue: [{ id: 0, title: 'placeholder', author: 'placeholder', pages: '0', inCart: false }],
      cart: [{ id: 0, title: 'placeholder', price: 0, qty: 0 }]
    }
  }

  adminCheck = () => {
    this.setState({
      openLogin: !this.state.openLogin
    })
  }

  signout = () => {
    this.setState({
      isAdmin: false
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      isAdmin: true,
      openLogin: false
    })
  }

  handleClick = (e) => {
    const sidebar = e.target.parentElement
    const adminCheck = this.adminCheck

    setTimeout(function () {
      sidebar.style.animation = 'flipOut .5s ease-out'
      setTimeout(() => {
        adminCheck()
      }, 480)
    }, 0)
  }

  getBooks = async (filter = false) => {
    try {
      const response = await axios.get('http://localhost:8082/api/books')
      if (!filter) this.setState({ catalogue: response.data, cart: response.data.filter(item => item.inCart === true) })
      else {
        const filteredCatalogue = response.data.reduce((acc, book) => {
          const vals = Object.values(book)
          const includes = vals.some(val => {
            val = val.toString().toLowerCase()
            filter = filter.toString().toLowerCase()
            return val.includes(filter)
          })
          if (includes) acc.push(book)
          return acc
        }, [])

        this.setState({
          catalogue: filteredCatalogue,
          cart: response.data.filter(item => item.inCart === true)
        })
      }

    } catch (err) { console.error(err) }
  }

  editCart = async (type, id) => {
    try{
      const response = await axios.patch(`http://localhost:8082/api/books/cart/${type}/${id}`)
      const newCatalogue = [...this.state.catalogue]
      const idx = newCatalogue.findIndex(item => item.id === id)
      newCatalogue.splice(idx, 1, response.data)
      this.setState({
        catalogue: newCatalogue,
        cart: newCatalogue.filter(item => item.inCart === true)
      })
    }catch(err){  
      console.error(err)
    }
  }

  componentDidMount() {
    this.getBooks()
  }

  filterBooks = (filterType) => {
    const filteredCatalogue = this.state.catalogue.sort((a, b) => {
      if (a[filterType].toLowerCase() < b[filterType].toLowerCase()) return -1;
      if (a[filterType].toLowerCase() > b[filterType].toLowerCase()) return 1;
      return 0;
    })
    this.setState({
      catalogue: filteredCatalogue
    })
  }

  delBook = (id) => {
    return axios.delete(`http://localhost:8082/api/books/${id}`)
      .then(response => {
        const newCatalogue = this.state.catalogue.filter(book => book.id != response.data.id)
        this.setState({
          catalogue: newCatalogue
        })
      })
  }

  editBook = (body) => {
    return axios.put(`http://localhost:8082/api/books/${body.id}`, body)
      .then(response => {
        const idx = this.state.catalogue.findIndex(book => book.id === response.data.id)
        const newCatalogue = [...this.state.catalogue]
        newCatalogue.splice(idx, 1, body)
        this.setState({
          catalogue: newCatalogue
        })
      })
  }

  addBook = (body) => {
    return axios.post(`http://localhost:8082/api/books/`, body)
      .then(response => {
        const newCatalogue = [...this.state.catalogue, response.data]
        this.setState({
          catalogue: newCatalogue
        })
      })
  }




  render() {
    return (
      <div className="wrapper">
        <Header adminCheck={this.adminCheck} />
        {this.state.isAdmin
          ? <AdminPage
            getBooks={this.getBooks}
            catalogue={this.state.catalogue}
            delBook={this.delBook}
            editBook={this.editBook}
            addBook={this.addBook}
          />
          : <UserPage
            getBooks={this.getBooks}
            catalogue={this.state.catalogue}
            filterBooks={this.filterBooks}
            cart={this.state.cart}
            editCart={this.editCart}
          />}
        {this.state.openLogin ? <SideBar handleSubmit={this.handleSubmit} handleClick={this.handleClick} signout={this.signout} /> : ''}
      </div>
    )
  }
}

export default App;
