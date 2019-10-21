import React from 'react';
import './styles.css';

export const WellFile = ({type, name, setVisibility}: any) => {
  return (
    <div className='well'>
      <div className='well__data'>
        <div className='well__filetype'>
          {type}
        </div>
        {name &&
          <div className='well__filename'>
            {name}
            <button
              className='well__visualize'
              onClick={setVisibility}
            >
              Visualize
            </button>
          </div>
        }
      </div>
    </div>
  );
};
