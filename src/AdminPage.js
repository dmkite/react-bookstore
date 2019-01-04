import React, { Component } from 'react'
import AdminBookView from './AdminBookView'
import EditForm from './EditForm'
import AddForm from './AddForm'

export default class AdminPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            openEdit: false,
            editing: {},
            openAdd: false
        }
    }

    openEdit = (item) => {
        this.setState({
            openEdit:true,
            editing: item
        })
    }

    closeEdit = () => {
        this.setState({
            openEdit:false,
            editing:{}
        })
    }

    handleClick = () => {
        this.setState({
            openAdd: !this.state.openAdd
        })
    }

    render(){
        return(
            <div className="container-fluid adminPage">
                <AdminBookView 
                    catalogue={this.props.catalogue} 
                    delBook={this.props.delBook}
                    openEdit={this.openEdit}
                />
                {this.state.openEdit ? <EditForm {...this.state.editing} handleEdit={this.handleEdit} closeEdit={this.closeEdit} editBook={this.props.editBook}/> : ''}
                <span className="addBook" onClick={this.handleClick}>+</span>
                {this.state.openAdd ? <AddForm addBook={this.props.addBook} closeAdd={this.closeAdd} handleClick={this.handleClick}/> : ''}
            </div> 
        )
    }
}