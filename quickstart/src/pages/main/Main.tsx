import React, {useState, memo, useCallback, FormEvent, MouseEvent} from 'react';
import papa from 'papaparse';
import {Search} from 'components/search/Search';
import {TrajectoryChart} from 'components/trajectory/Trajectory';
import {TrajectoryData} from 'lib/models/trajectory-data';
import {SearchResult, SearchResultItem} from 'models';
import {responseToTrajectoryPoints} from './jsonToDataPoints';
import './styles.css';

export const MainPage = memo(function MainPage() {
  const [visible, setVisible] = useState(false);
  const [chartData, setChartData] = useState<TrajectoryData>({points: []});
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

  const setChartVisible = useCallback(() => {
    fetch(`/fetch?srn=srn:file/csv:6dd13750df8611e9b5df4fa704076d5c:1`)
      .then(response => response.text())
      .then((data) => {
        const parsed: any = papa.parse(data, {header: true});
        const dataPoint: TrajectoryData = {
          points: responseToTrajectoryPoints(parsed.data)
        }
        setChartData(dataPoint);
        setVisible(true);
      });
  }, []);

  return (
    <div className="main">
      <div className="main__page">
        <Search
          onVizualize={setChartVisible}
          showWellFiles={showWellFiles}
          onSetSearch={setSearch}
          wellFiles={wellFiles}
          searchValue={search}
          isLoaderShown={isLoaderShown}
        />
        <div className="main__chart-area">
          <TrajectoryChart chartData={chartData} className={visible ? 'visible' : 'hidden'} />
        </div>
      </div>
    </div>
  );
});
