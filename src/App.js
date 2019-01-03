import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Header from './Header'
import Books from './Books'
import Cart from './Cart'
import FilterSearch from './FilterSearch'
import SideBar from './SideBar'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      catalogue: [{id:0, title:'placeholder', author:'placeholder', pages:'0', inCart:false}],
      cartItems: [{id:0, title:'placeholder', price:0, qty:0}],
      isAdmin: false,
      openLogin: false
    }
  }
  
  getBooks = async(filter = false) =>{
    try {
      const response = await axios.get('http://localhost:8082/api/books')
      if(!filter ) this.setState({ catalogue: response.data})
      else{
        const filteredCatalogue = response.data.reduce((acc, book) => {
          const vals = Object.values(book)
          const includes = vals.some(val => {
            val = val.toString().toLowerCase()
            filter = filter.toString().toLowerCase()
            return val.includes(filter)
          })
          if(includes) acc.push(book)
          return acc
        }, [])

       this.setState({
         catalogue: filteredCatalogue
       })
      }
      
    } catch (err) { console.error(err) }
  }
  
  componentDidMount(){
    this.getBooks()
  }

  filterBooks = (filterType) =>{
    const filteredCatalogue = this.state.catalogue.sort((a, b) => {
      if (a[filterType].toLowerCase() < b[filterType].toLowerCase()) return -1;
      if (a[filterType].toLowerCase() > b[filterType].toLowerCase()) return 1;
      return 0;
    })
    this.setState({
      catalogue: filteredCatalogue
    })
  }

  addToCart = (id) => {
    const { title, price } = this.state.catalogue.find(item => item.id === id)
    const inCartAlready = this.state.cartItems.find(item => item.title === title)
    const newCartItems = this.state.cartItems.reduce((acc, item) => {
      if (item.title === title) item.qty++
      acc.push(item)
      return acc
    }, [])

    if (!inCartAlready) {
      const newCartItem = {
        id: Number(this.state.cartItems.length) + 1,
        title,
        price,
        qty: 1
      }
      newCartItems.push(newCartItem)
    }
    this.setState({
      cartItems: newCartItems
    })
  }

  adminCheck = () => {
    this.setState({
      openLogin: !this.state.openLogin
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      isAdmin:true
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

  render() {
    return (
      <div className="wrapper">
        <Header adminCheck={this.adminCheck}/>
        <div className="container-fluid">
        <div className="row">
          <main className="col-12 col-md-8">
            <FilterSearch search={this.getBooks} filter={this.filterBooks}/>
            <Books
              catalogue={this.state.catalogue}
              addToCart={this.addToCart}
            />
          </main>
          <aside className="col-12 col-md-4">
            <Cart cartItems={this.state.cartItems}/>
          </aside>
          </div>
        </div>
        {this.state.openLogin ? <SideBar handleSubmit={this.handleSubmit} handleClick={this.handleClick}/> : ''}
      </div>
      )
  }
}

export default App;
