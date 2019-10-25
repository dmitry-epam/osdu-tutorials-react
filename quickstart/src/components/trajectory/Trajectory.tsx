import React, { useRef, useEffect, memo } from 'react';
import { createTrajectoryChart } from 'lib/trajectory.chart';
import './styles.css';

interface Props {
  className?: string;
}

export const TrajectoryChart = memo(function TrajectoryChart({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      createTrajectoryChart(ref.current);
    }
  }, []);

  return <div className={`trajectory ${className}`} ref={ref}></div>;
});
