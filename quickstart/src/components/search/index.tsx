import React, { useState, memo, useCallback, ChangeEvent } from 'react';
import { Input } from 'components/input';
import { WellFile } from 'components/well-file';
import { SearchResult, SearchResultItem } from 'models';
import './styles.css';

interface Props {
  onVizualize: () => void;
}

const API_HOST = process.env.REACT_APP_API_HOST || '';

export const Search = memo(function Search({ onVizualize }: Props) {
  const [wellFiles, setWellFillesVisible] = useState<SearchResultItem[]>([]);
  const [search, setSearch] = useState('A05-01');

  const showWellFiles = useCallback(() => {
    fetch(`${API_HOST}/find?wellname=${search}`)
      .then(response => response.json())
      .then((data: SearchResult) => {
        setWellFillesVisible(data['work-product-component/WellborePath'] || []);
      });
  }, [search]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return (
    <div className="search">
      <div className="search__area">
        <Input
          type="text"
          className="search__text"
          placeholder="Enter well name"
          onChange={handleSearchChange}
          value={search}
        />
        <Input className="search__submit" type="submit" value="Search" onClick={showWellFiles} />
      </div>
      {wellFiles.map(well => (
        <WellFile
          key={well.filename}
          name={well.filename}
          type={well.srn}
          onVizualize={onVizualize}
        />
      ))}
    </div>
  );
});
