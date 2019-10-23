import React, { useState, memo, useCallback, ChangeEvent, FormEvent } from 'react';
import { Input } from 'components/input';
import { WellFile } from 'components/well-file';
import { SearchResult, SearchResultItem } from 'models';
import './styles.css';

interface Props {
  onVizualize: () => void;
}

export const Search = memo(function Search({ onVizualize }: Props) {
  const [wellFiles, setWellFillesVisible] = useState<SearchResultItem[]>([]);
  const [search, setSearch] = useState('A05-01');

  const showWellFiles = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      fetch(`/find?wellname=${search}`)
        .then(response => response.json())
        .then((data: SearchResult) => {
          setWellFillesVisible(data['work-product-component/WellborePath'] || []);
        });
    },
    [search]
  );

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  return (
    <div className="search">
      <form className="search__area" onSubmit={showWellFiles}>
        <Input
          type="text"
          className="search__text"
          placeholder="Enter well name"
          onChange={handleSearchChange}
          value={search}
        />
      </form>
      {wellFiles.map(well => (
        <WellFile
          key={well.filename}
          fileName={well.filename}
          fileType={well.srn}
          onVizualize={onVizualize}
        />
      ))}
    </div>
  );
});
