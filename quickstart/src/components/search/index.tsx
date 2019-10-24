import React, {useState, memo, useCallback, ChangeEvent, FormEvent, MouseEvent} from 'react';
import {Input} from 'components/input';
import {WellFile} from 'components/well-file';
import {Loader} from 'components/loader';
import {SearchResult, SearchResultItem} from 'models';
import './styles.css';

interface Props {
  onVizualize: () => void;
}

export const Search = memo(function Search({onVizualize}: Props) {
  const [wellFiles, setWellFillesVisible] = useState<SearchResultItem[]>([]);
  const [search, setSearch] = useState('A05-01');
  const [isLoaderShown, showLoader] = useState(false);

  const showWellFiles = useCallback(
    (event: FormEvent | MouseEvent) => {
      event.preventDefault();
      showLoader(true);
      fetch(`/find?wellname=${search}`)
        .then(response => response.json())
        .then((data: SearchResult) => {
          setWellFillesVisible(data['work-product-component/WellborePath'] || []);
          showLoader(false);
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
        <Input className="search__submit" type="submit" value="Search" onClick={showWellFiles} />
      </form>
      <div className="search__well-area">
        {isLoaderShown ? <Loader /> : wellFiles.map(well => (
          <WellFile
            key={well.filename}
            fileName={well.filename}
            fileType={well.srn}
            onVizualize={onVizualize}
          />
        ))}
      </div>
    </div>
  );
});
