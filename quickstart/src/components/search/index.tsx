import React, {useState} from 'react';
import {Input} from '../input';
import {WellFile} from '../well-file/';
import './styles.css';

const data = [
  {
    "type": "work-product-component/WellLog",
    "name": "Filename1"
  },
  {
    "type": "work-product-component/WellborePath",
    "name": "Filename2"
  },
]

export const Search = ({setVisibility}: any) => {
  const [wellFiles, setWellFillesVisible] = useState([{type: '', name: ''}]);

  const showWellFiles = (event: any) => {
    event.preventDefault();
    setWellFillesVisible(data);
  };

  return (
    <div className='search'>
      <form
        className='search__area'
        onSubmit={showWellFiles}
      >
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
      </form>
      {
        wellFiles.map(well =>
          <WellFile
            key={well.type}
            name={well.name}
            type={well.type}
            setVisibility={setVisibility}
          />
        )}
    </div>
  );
};
