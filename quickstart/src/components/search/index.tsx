import React, { useState, memo, FormEvent, useCallback } from 'react';
import { Input } from 'components/input';
import { WellFile } from 'components/well-file';
import './styles.css';

const data = [
  {
    type: 'work-product-component/WellLog',
    name: 'Filename1',
  },
  {
    type: 'work-product-component/WellborePath',
    name: 'Filename2',
  },
];

interface Props {
  onVizualize: () => void;
}

export const Search = memo(function Search({ onVizualize }: Props) {
  const [wellFiles, setWellFillesVisible] = useState([{ type: '', name: '' }]);

  const showWellFiles = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWellFillesVisible(data);
  }, []);

  return (
    <div className="search">
      <form className="search__area" onSubmit={showWellFiles}>
        <Input type="text" className="search__text" placeholder="Enter well name" />
        <Input className="search__submit" type="submit" value="Search" />
      </form>
      {wellFiles.map(well => (
        <WellFile key={well.type} name={well.name} type={well.type} onVizualize={onVizualize} />
      ))}
    </div>
  );
});
