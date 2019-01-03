import React from 'react'
import CartItem from './CartItem'

function Cart(props){
    return (
        <div className="container">
            <h1>Items</h1>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <div className="col-6">Book</div>
                        <div className="col-3">Price</div>
                        <div className="col-3 qty">Qty</div>
                    </div>
                </div>
                {props.cartItems.map(book => <CartItem
                    key={book.id}
                    {...book}
                />)}
                <div className="list-group-item">
                    <div className="row total">
                        <div className="col-6"><b>Total</b></div>
                        <div className="col-3">
                            <b>
                            ${props.cartItems.reduce((acc, item) => {
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

export default Cart