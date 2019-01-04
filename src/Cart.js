import React from 'react'
import CartItem from './CartItem'

export default function Cart(props){
    return (
        <div className="container">
            <h1>Items</h1>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-8">Book</div>
                        <div className="col-4">Price</div>
                    </div>
                </div>
                {props.cart.map(book => <CartItem
                    key={book.id}
                    {...book}
                />)}
                <div className="list-group-item">
                    <div className="row total">
                        <div className="col-8"><b>Total</b></div>
                        <div className="col-4">
                            <b>
                            ${props.cart.reduce((acc, item) => {
                                acc += item.price
                                return acc
                            }, 0)}.00
                            </b>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

