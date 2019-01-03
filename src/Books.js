import React from 'react'
import Book from './Book'

export default function Books(props){
    return (
        <div className="row bookHolder">
            {props.catalogue.map(book => <Book
                {...book}
                key={book.id}
                addToCart={() => props.addToCart(book.id)}
            />
            )}
        </div>
    )
}