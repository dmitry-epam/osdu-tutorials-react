import React, {useRef, useEffect} from 'react';
import {createTrajectoryChart} from '../../lib/trajectory.chart';
import './styles.css';

export const TrajectoryChart = ({modifier}: any) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      createTrajectoryChart(ref.current);
    }
  }, []);

  return <div className={`trajectory ${modifier}`} ref={ref} ></div>
};
