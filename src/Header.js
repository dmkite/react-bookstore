import React from 'react'

function Header(props){
    return (
        <nav className="navbar navbar-dark bg-dark">
            
            <img src="icon.png" className="img-responsive icon" alt="Shelf Esteem icon"/>
            
            <h1>Shelf Esteem</h1>
            <a href="#" onClick={props.adminCheck}>admin</a>
        </nav>
    )
}

export default Header