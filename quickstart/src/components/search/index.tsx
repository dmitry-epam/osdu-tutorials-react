import React from 'react';
import {Input} from "../input";
import './styles.css';

export const Search = () => {
  return (
    <div className='search'>
      <div className='search__area'>
        <Input
          type='text'
          className='search__text'
          placeholder='Enter well name'
        />
        <Input
          className='search__submit'
          type='submit'
          value='Search'
        />
      </div>
    </div>
  );
};
