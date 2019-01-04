import React from 'react'

export default function Sidebar(props){
        return(
            <div className="sideBar">
                <span onClick={(e) => props.handleClick(e) }>x</span>
                <h2>Admin login</h2>
                <form onSubmit={function (e) { props.handleSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" placeholder="You can put anything here..." required/>
                    </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Any old thing will do..." required/>
                    </div>
                    <button className="btn btn-primary" >Log In</button>
                </form>
                <p>Not an admin? <a href="#" onClick={props.signout}>Sign out</a></p>
            </div>
        )
    }