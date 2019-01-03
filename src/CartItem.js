import React from 'react'

export default function CartItem({title, price, qty}){
    return (
        <div className="list-group">
            <div className="list-group-item">
                <div className="collection-item">
                    <div className="row">
                        <div className="col-6">{title}</div>
                        <div className="col-3">${price}.00</div>
                        <div className="col-3 qty">{qty}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}