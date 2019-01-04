import React, { Component } from 'react'
import Books from './Books'
import Cart from './Cart'
import FilterSearch from './FilterSearch'

export default class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartItems: [{id:0, title:'placeholder', price:0, qty:0}]
        }
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

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                <main className="col-12 col-md-8">
                    <FilterSearch search={this.props.getBooks} filter={this.props.filterBooks}/>
                    <Books
                    catalogue={this.props.catalogue}
                    addToCart={this.addToCart}
                    />
                </main>
                <aside className="col-12 col-md-4">
                    <Cart cartItems={this.state.cartItems}/>
                </aside>
                </div>
            </div>
        )
    }
}