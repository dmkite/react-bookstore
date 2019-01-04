import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Header from './Header'
import UserPage from './UserPage'
import SideBar from './SideBar'
import AdminPage from './AdminPage'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAdmin: true,
      openLogin: false,
      catalogue: [{ id: 0, title: 'placeholder', author: 'placeholder', pages: '0', inCart: false }]
    }
  }
  
  adminCheck = () => {
    this.setState({
      openLogin: !this.state.openLogin
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      isAdmin:true,
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
      if (!filter) this.setState({ catalogue: response.data })
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
          catalogue: filteredCatalogue
        })
      }

    } catch (err) { console.error(err) }
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
      const newCatalogue = this.state.catalogue.filter( book => book.id != response.data.id)
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
        catalogue:newCatalogue
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
        <Header adminCheck={this.adminCheck}/>
        {this.state.isAdmin 
        ? <AdminPage 
            getBooks={this.getBooks} 
            catalogue={this.state.catalogue}
            delBook={this.delBook}
            editBook={this.editBook}
            addBook={this.addBook}
          /> 
        : <UserPage getBooks={this.getBooks} catalogue={this.state.catalogue} filterBooks={this.filterBooks}/>}
        {this.state.openLogin ? <SideBar handleSubmit={this.handleSubmit} handleClick={this.handleClick}/> : ''}
      </div>
      )
  }
}

export default App;
