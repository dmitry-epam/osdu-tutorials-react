import React, { memo } from 'react';
import './styles.css';

interface Props {
  title?: string;
  subTitle?: string;
}

export const Hint = memo(function Hint({ title, subTitle }: Props) {
  return (
    <div className="hint">
      <div className="message title">{title}</div>
      <div className="message sub-title">{subTitle}</div>
    </div>
  );
});
