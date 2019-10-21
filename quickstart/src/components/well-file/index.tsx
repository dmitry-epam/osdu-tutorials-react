import React, { memo } from 'react';
import './styles.css';

interface Props {
  type: string;
  name: string;
  onVizualize: () => void;
}

export const WellFile = memo(function WellFile({ type, name, onVizualize }: Props) {
  return (
    <div className="well">
      <div className="well__data">
        <div className="well__filetype">{type}</div>
        {name && (
          <div className="well__filename">
            {name}
            <button className="well__visualize" onClick={onVizualize}>
              Visualize
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
