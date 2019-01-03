import React, { Component } from 'react';

const DEFAULT_OPTION = 'Sort by...'

export default class FilterBlock extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: DEFAULT_OPTION
        }
    }

    onChange = (e) => {
        e.target.value === 'Title alphabetical' ? this.props.filter('title') : this.props.filter('author') 
    }

    render(){
    return(
        <div className="col-6">
            <select className="custom-select custom-select-lg mb-3" id="products" name="product" defaultValue={DEFAULT_OPTION} onChange={this.onChange}>
                <option>{DEFAULT_OPTION}</option>
                <option name="title">Title alphabetical</option>
                <option name="author">Author alphabetical</option>
            </select>
        </div>
    )}
    
}