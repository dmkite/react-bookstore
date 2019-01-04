import React from 'react'

export default function CartItem({title, price}){
    return (
        <div className="list-group">
            <div className="list-group-item">
                <div className="collection-item">
                    <div className="row">
                        <div className="col-8">{title}</div>
                        <div className="col-4">${price}.00</div>
                    
                    </div>
                </div>
            </div>
        </div>

    )
}