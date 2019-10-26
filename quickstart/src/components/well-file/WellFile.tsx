import React, { memo } from 'react';
import './styles.css';

interface Props {
  fileType: string;
  fileName: string;
  onVizualize: () => void;
}

export const WellFile = memo(function WellFile({ fileName, onVizualize }: Props) {
  return (
    <div className="well">
      {fileName && (
        <div className="well__controls">
          <label className="well__label">{fileName}</label>
          <button className="well__vizualize" onClick={onVizualize}>
            Vizualize
          </button>
        </div>
      )}
    </div>
  );
});
