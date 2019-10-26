import React, { memo, useCallback } from 'react';
import './styles.css';

interface Props {
  srn: string;
  fileName: string;
  onVizualize: (srn: string) => void;
}

export const WellFile = memo(function WellFile({ srn, fileName, onVizualize }: Props) {
  const handleClick = useCallback(() => {
    onVizualize(srn);
  }, [onVizualize, srn]);

  return (
    <div className="well">
      {fileName && (
        <div className="well__controls">
          <label className="well__label">{fileName}</label>
          <button className="well__vizualize" onClick={handleClick}>
            Vizualize
          </button>
        </div>
      )}
    </div>
  );
});
