import React from 'react';
import './SearchBar.css'
const SearchBar = ({inInputChange,onbuttonSubmit}) => {
    return (
        <div>
            <p className="f3">{'This will detect faces '}</p>
        <div className="flex justify-center ">
            <div className="form pa4 br3 shadow-5 flex justify-center">
                <input type="text" className="w-70 f4 center" onChange={inInputChange} />
                <button type="Search" className="tc w-30 grow link f4 ph3 dib white bg-light-purple" onClick={onbuttonSubmit}>Detect</button>
            </div>
        </div>
        </div>
    )
}

export default SearchBar