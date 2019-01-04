import React from 'react'

export default function AdminBook(props){
    return (
        <div className="list-group-item">
            <div className="row adminBookRow">
                <div className="col-1">{props.id}</div>
                <div className="col-1">{props.title}</div>
                <div className="col-1">{props.subtitle}</div>
                <div className="col-1">{props.author}</div>
                <div className="col-1">{props.published}</div>
                <div className="col-1">{props.publisher}</div>
                <div className="col-1">{props.pages}</div>
                <div className="col-2">{props.description}</div>
                <div className="col-1">{props.price}</div>
                <div className="col-1">{props.website}</div>
                <div className="col-1">
                    <img className="actionIcon" src="delete.png" alt="delete icon" onClick={props.delBook}/>
                    <img className="actionIcon" src="edit.png" alt="edit icon" onClick={props.openEdit}/>
                </div>
            </div>
        </div>

    )
}