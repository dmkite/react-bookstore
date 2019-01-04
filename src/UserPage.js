import React, { Component } from 'react'
import Books from './Books'
import Cart from './Cart'
import FilterSearch from './FilterSearch'

export default class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            // cartItems: [{id:0, title:'placeholder', price:0, qty:0}]
        }
    }
    
    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                <main className="col-12 col-md-8">
                    <FilterSearch search={this.props.getBooks} filter={this.props.filterBooks} />
                    <Books
                        catalogue={this.props.catalogue}
                        editCart={this.props.editCart}
                    />
                </main>
                <aside className="col-12 col-md-4">
                    <Cart cart={this.props.cart}/>
                </aside>
                </div>
            </div>
        )
    }
}