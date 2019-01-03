import React from 'react'
import SearchBar from './SearchBar'
import FilterBlock from './FilterBlock'

export default function FilterSearch(props){
    return (
        <div className="row filterSearch">
            <SearchBar search={props.search} />
            <FilterBlock filter={props.filter}/>
        </div>
    )
}