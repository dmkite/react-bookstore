import React, {Component} from 'react'

const DEFAULT_STRING = 'Search...'

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            query: DEFAULT_STRING
        }
    }

    handleChange(e){
        const filter = e.target.value
        this.props.search(filter)
    }

    render(){
        return (
            <div className="col-6">
            <input className="form-control" type="text" placeholder={DEFAULT_STRING} aria-label="Search" onChange={(e) => this.handleChange(e)}></input>
            </div>
        )
    }
}

export default SearchBar