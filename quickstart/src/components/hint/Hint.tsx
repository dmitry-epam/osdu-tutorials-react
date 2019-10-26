import React, { memo } from 'react';
import './styles.css';

export const Hint = memo(function Hint() {
  return (
    <div className="hint">
      <div className="message title">No Trajectory to display</div>
      <div className="message sub-title">Find well and click visualize to appropriate data set</div>
    </div>
  );
});
