import React from 'react';
import './styles.css';

export const Search = ({placeholder, value}: any) => {
  return (
    <div className='search'>
      <div className='search__area'>
        <input
          type='text'
          className='search__input'
          placeholder={placeholder}
        />
        <input
          className='search__submit'
          type='submit'
          value={value}
        />
      </div>
    </div>
  );
};
