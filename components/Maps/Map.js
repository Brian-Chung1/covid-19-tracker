import React, { useState } from 'react';
import MapChart from './MapChart';
import VaccineMapChart from './VaccineMapChart';
import Tooltip from './Tooltip';
import VaccineTooltip from './VaccineTooltip';
import GlobalTooltip from './GlobalTooltip';
import Skeleton from '@material-ui/lab/Skeleton';
import GlobalMapChart from './GlobalMapChart';

export const SkeletonMap = () => {
  return <Skeleton variant="rect" height={500} />;
};

const Map = ({ data, isVaccineMap, isGlobalMap, colorScale }) => {
  const [tooltipData, setTooltipData] = useState(null);

  const resetTooltip = () => {
    setTooltipData(null);
  };

  if (isGlobalMap) {
    return (
      <>
        <GlobalMapChart
          data={data}
          setTooltipData={setTooltipData}
          resetTooltip={resetTooltip}
          colorScale={colorScale}
        />
        {tooltipData && <GlobalTooltip data={tooltipData} />}
      </>
    );
  }

  if (isVaccineMap) {
    return (
      <>
        <VaccineMapChart
          data={data}
          setTooltipData={setTooltipData}
          resetTooltip={resetTooltip}
          colorScale={colorScale}
        />
        {tooltipData && <VaccineTooltip data={tooltipData} />}
      </>
    );
  }

  return (
    <>
      <MapChart
        data={data}
        setTooltipData={setTooltipData}
        resetTooltip={resetTooltip}
        colorScale={colorScale}
      />
      {tooltipData && <Tooltip data={tooltipData} />}
    </>
  );
};

export default Map;
