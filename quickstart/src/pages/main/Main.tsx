import React, { useState, memo, useCallback, FormEvent, MouseEvent } from 'react';
import { Search } from 'components/search';
import { TrajectoryChart } from 'components/trajectory';
import { Hint } from 'components/hint';
import { Loader } from 'components/loader';
import { TrajectoryData, TrajectoryPoint } from 'lib/models/trajectory-data';
import { SearchResultItem } from 'models';
import { findWell, fetchTrajectory } from 'api';
import { responseToTrajectoryPoints } from './jsonToDataPoints';
import { parseScv } from './parseScv';
import './styles.css';

const hintTitle = 'No Trajectory to display';
const hintSubTitle = 'Find well and click visualize to appropriate data set';

export const MainPage = memo(function MainPage() {
  const [chartData, setChartData] = useState<TrajectoryData>({ points: [] });
  const [wellFiles, setWellFillesVisible] = useState<SearchResultItem[]>([]);
  const [search, setSearch] = useState('A05-01');
  const [isLoaderShown, showLoader] = useState(false);
  const [trajectoryLoading, setTrajectoryLoading] = useState(false);

  const handleShowWellFiles = useCallback(
    (event: FormEvent | MouseEvent) => {
      event.preventDefault();
      showLoader(true);
      findWell(search).then(data => {
        setWellFillesVisible(data['work-product-component/WellborePath'] || []);
        showLoader(false);
      });
    },
    [search]
  );

  const handleVizualize = useCallback((srn: string) => {
    setTrajectoryLoading(true);
    fetchTrajectory(srn).then(data => {
      const points = parseScv<TrajectoryPoint>(data);
      const dataPoint = { points: responseToTrajectoryPoints(points) };
      setChartData(dataPoint);
      setTrajectoryLoading(false);
    });
  }, []);

  return (
    <div className="main">
      <div className="main__page">
        <Search
          onVizualize={handleVizualize}
          showWellFiles={handleShowWellFiles}
          onSetSearch={setSearch}
          wellFiles={wellFiles}
          searchValue={search}
          isLoaderShown={isLoaderShown}
        />
        <div className="main__chart-area">
          {trajectoryLoading ? (
            <Loader />
          ) : !chartData.points.length ? (
            <Hint title={hintTitle} subTitle={hintSubTitle} />
          ) : (
            <TrajectoryChart chartData={chartData} />
          )}
        </div>
      </div>
    </div>
  );
});
