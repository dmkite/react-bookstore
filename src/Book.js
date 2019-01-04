import React from 'react'

export default function Book({title, price, description, author, inCart, addToCart, removeFromCart}){
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{author}</p>
                <p className="card-text">{description}</p>
                <p>${price}.00</p>
                {inCart 
                    ? <button className="removeBtn" onClick={removeFromCart}>Remove</button> 
                    : <button className="addBtn" onClick={addToCart}>Add to Cart</button>
                }
                
            </div>
        </div>
    )
}