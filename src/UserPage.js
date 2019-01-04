import React from 'react'
import Books from './Books'
import Cart from './Cart'
import FilterSearch from './FilterSearch'

export default function UserPage(props){
        return (
            <div className="container-fluid">
                <div className="row">
                <main className="col-12 col-md-8">
                    <FilterSearch search={props.getBooks} filter={props.filterBooks} />
                    <Books
                        catalogue={props.catalogue}
                        editCart={props.editCart}
                    />
                </main>
                <aside className="col-12 col-md-4">
                    <Cart cart={props.cart}/>
                </aside>
                </div>
            </div>
        )
}