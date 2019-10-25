import React, {memo} from 'react';
import {Input} from 'components/input/Input';
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
          <div>
            <label className="well__label">
              {fileName}
              <Input
                type="radio"
                value={fileName}
                name="radio"
                className="well__radio"
                onClick={onVizualize}
              />
              <span className="well__checkmark"></span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
});
