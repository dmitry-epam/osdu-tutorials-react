export interface SearchResult {
  'master-data/Well'?: SearchResultItem[];
  'work-product-component/WellLog'?: SearchResultItem[];
  'work-product-component/WellborePath'?: SearchResultItem[];
}

export interface SearchResultItem {
  filename: string;
  srn: string;
}
