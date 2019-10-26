import React, { memo, useCallback, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Input } from 'components/input';
import { WellFile } from 'components/well-file';
import { Loader } from 'components/loader';
import { Hint } from 'components/hint';
import { SearchResultItem } from 'models';
import './styles.css';

interface Props {
  onVizualize: () => void;
  onSetSearch: (value: string) => void;
  showWellFiles: (event: MouseEvent | FormEvent) => void;
  wellFiles: SearchResultItem[];
  searchValue: string;
  isLoaderShown: boolean;
}

const hintSubTitle = 'No data sets';

export const Search = memo(function Search({
  onVizualize,
  searchValue,
  onSetSearch,
  isLoaderShown,
  wellFiles,
  showWellFiles,
}: Props) {
  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onSetSearch(event.target.value);
    },
    [onSetSearch]
  );

  return (
    <div className="search">
      <form className="search__area" onSubmit={showWellFiles}>
        <Input
          type="text"
          className="search__text"
          placeholder="Enter well name"
          onChange={handleSearchChange}
          value={searchValue}
        />
        <Input className="search__submit" type="submit" value="Search" onClick={showWellFiles} />
      </form>
      <div className="search__well-area">
        {isLoaderShown ? (
          <Loader />
        ) : !wellFiles.length ? (
          <Hint subTitle={hintSubTitle} />
        ) : (
          wellFiles.map(well => (
            <WellFile
              key={well.filename}
              fileName={well.filename}
              fileType={well.srn}
              onVizualize={onVizualize}
            />
          ))
        )}
      </div>
    </div>
  );
});
