import React, { memo } from 'react';
import './styles.css';

export const Loader = memo(function Loader() {
  return (
    <div className="loader">
      <div className="loader__component"></div>
    </div>
  );
});
