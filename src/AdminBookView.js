import React from 'react'
import AdminBook from './AdminBook'

export default function AdminBookView(props){
    return (
        <div className="list-group adminBooks">
            <div className="list-group-item">
                <div className="row">
                    <div className="col-1">id</div>
                    <div className="col-1">Title</div>
                    <div className="col-1">Subtitle</div>
                    <div className="col-1">Author</div>
                    <div className="col-1">Pub Date</div>
                    <div className="col-1">Pub</div>
                    <div className="col-1">Pp</div>
                    <div className="col-2">Desc</div>
                    <div className="col-1">price</div>
                    <div className="col-1">Site</div>
                    <div className="col-1"></div>
                </div>
            </div>
            {props.catalogue.map(item => <AdminBook {...item} key={item.id} delBook={() => props.delBook(item.id)} openEdit={() => props.openEdit(item)}/>)}
        </div>
    )
}

 