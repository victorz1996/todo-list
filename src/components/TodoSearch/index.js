import React from "react";
import './TodoSearch.css';

function TodoSearch({searchValue, setSearchValue}) {
    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value)
    }
    return (

        <input value={searchValue} className="TodoSearch" placeholder="Cebolla" onChange={onSearchValueChange}/>

    )
}

export {TodoSearch};