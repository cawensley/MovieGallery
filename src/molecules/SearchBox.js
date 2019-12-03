import React from 'react';

const SearchBox = ({ searchChange }) => {
    return (
        <div className='p-2 text-center'>
            <input
                className='p-2'
                type='search'
                placeholder='Search Movies'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;