import React, {useRef, useEffect, memo} from 'react';
import {createTrajectoryChart} from 'lib/trajectory.chart';

import './styles.css';
import {TrajectoryData} from 'lib/models/trajectory-data';

interface Props {
  className?: string;
  chartData: TrajectoryData
}

export const TrajectoryChart = memo(function TrajectoryChart({className, chartData}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataExists = chartData && chartData.points && chartData.points.length > 0;
    if (ref.current && dataExists !== false) {
      createTrajectoryChart(ref.current, chartData);
    }
  }, [chartData]);

  return <div className={`trajectory ${className}`} ref={ref}></div>;
});
