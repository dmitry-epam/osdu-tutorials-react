import React, {useState} from 'react';
import {Search} from '../../components/search';
import {TrajectoryChart} from '../../components/trajectory';
import './styles.css';


export const MainPage = () => {
  const [visible, setVisible] = useState(false);

  const setChartVisible = () => {
    setVisible(true);
  };

  return (
    <div className='main'>
      <div className='main__page'>
        <Search setVisibility={setChartVisible} />
        <TrajectoryChart modifier={visible ? 'visible' : 'hidden'} />
      </div>
    </div>
  );
};
