import React from 'react'

export default function Book({title, price, description, author, addToCart}){
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p>{author}</p>
                <p className="card-text">{description}</p>
                <p>${price}.00</p>
                <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    )
}