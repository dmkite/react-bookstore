import React, { Component } from 'react'

export default class EditForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            formVals: {...props}
        }
    }

    handleChange = (e) => {
        this.setState({
            formVals: {...this.state.formVals,
                [e.target.id]: e.target.value
            }
        }) 
    }

    handleSubmit = () => {
        let body = Object.assign(this.state.formVals)
        delete body.editBook
        delete body.closeEdit
        delete body.handleEdit
        this.props.editBook(body)
        this.props.closeEdit()
    }

    render(){
        return (
            <div className="editForm">
                <span className="closeBtn" onClick={this.props.closeEdit}>x</span>
                <h2>Editing {this.props.title}</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="title" aria-describedby="title" placeholder="Title" required defaultValue={this.props.title} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="subtitle" aria-describedby="subtitle" placeholder="Subtitle" required defaultValue={this.props.subtitle} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="author" aria-describedby="author" placeholder="Author" required defaultValue={this.props.author} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="published" aria-describedby="published" placeholder="Published" required defaultValue={this.props.published} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="publisher" aria-describedby="publisher" placeholder="Publisher" required defaultValue={this.props.publisher} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="number" min="1" max="5000" className="form-control" id="pages" aria-describedby="title" placeholder="Pages" required defaultValue={this.props.pages} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <textarea className="form-control" id="description" aria-describedby="description" placeholder="Description" required defaultValue={this.props.description} onChange={(e) => {this.handleChange(e)}}></textarea>
                    </div>

                    <div className="form-group">
                        <input type="number" min="1" max="1000" className="form-control" id="price" aria-describedby="price" placeholder="Price" required defaultValue={this.props.price} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <div className="form-group">
                        <input type="text" className="form-control" id="website" aria-describedby="website" placeholder="Website" required defaultValue={this.props.website} onChange={(e) => {this.handleChange(e)}}/>
                    </div>

                    <button className="btn btn-primary">Edit</button>
                </form>
            </div>
        )
    }
}