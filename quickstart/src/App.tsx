import React, { useRef, useEffect } from 'react';
import { MainPage } from './pages/main';
import { createTrajectoryChart } from './lib/trajectory.chart';

import './App.css';

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      createTrajectoryChart(ref.current);
    }
  }, []);

  return <div className="App" ref={ref}></div>;

  // main component
  return (
    <div className="osdu-app">
      <MainPage />
    </div>
  );
};
