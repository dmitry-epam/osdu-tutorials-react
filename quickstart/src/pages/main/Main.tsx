import React, { useState, memo, useCallback } from 'react';
import { Search } from 'components/search/Search';
import { TrajectoryChart } from 'components/trajectory/Trajectory';
import './styles.css';

export const MainPage = memo(function MainPage() {
  const [visible, setVisible] = useState(false);

  const setChartVisible = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <div className="main">
      <div className="main__page">
        <Search onVizualize={setChartVisible} />
        <TrajectoryChart className={visible ? 'visible' : 'hidden'} />
      </div>
    </div>
  );
});
