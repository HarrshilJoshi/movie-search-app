import React from 'react'



const Search = ({searchTerm,setsearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="Search" />
            <input type="text"
            placeholder='Search Through 1000 of Movies'
            value={searchTerm}
            onChange={(e)=>setsearchTerm(e.target.value)}
             />
        </div>
        </div>
  ) 
}

export default Search
