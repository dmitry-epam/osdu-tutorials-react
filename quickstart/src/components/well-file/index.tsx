import React, {memo} from 'react';
import {Input} from 'components/input';
import './styles.css';

interface Props {
  fileType: string;
  fileName: string;
  onVizualize: () => void;
}

export const WellFile = memo(function WellFile({fileType, fileName, onVizualize}: Props) {
  return (
    <div className="well">
      <div className="well__data">
        {fileName && (
          <div className="well__label">
            {fileName}
            <Input
              type="radio"
              value={fileName}
              name="radio"
              className="well__radio"
              isChecked={true}
            />
            <span className="well__checkmark"></span>
          </div>
        )}
        <button className="well__visualize" onClick={onVizualize}>
          Visualize
       </button>
      </div>
    </div>
  );
});
