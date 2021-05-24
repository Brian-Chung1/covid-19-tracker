import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const topoJSON =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';
const geoURL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
// const geoURL = 'http://localhost:3001/geoJSON';

const VaccineMapChart = ({
  data,
  setTooltipData,
  resetTooltip,
  colorScale,
}) => {
  return (
    <ComposableMap
      width={1260}
      height={490}
      data-tip=""
      projection="geoAlbersUsa"
      className="map"
    >
      <Geographies geography={geoURL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const { name } = geo.properties;
            const state = data[name];
            return (
              <Geography
                stroke="#FFF"
                key={geo.rsmKey}
                geography={geo}
                fill={state ? colorScale(state.Doses_admin) : '#EEE'}
                onMouseEnter={() => {
                  const type = state ? state.Vaccine_Type : 'Loading...';
                  const date = state ? state.Date : 'Loading...';
                  const admin = state ? state.Doses_admin : 'Loading...';
                  const alloc = state ? state.Doses_alloc : 'Loading...';
                  const shipped = state ? state.Doses_shipped : 'Loading...';
                  const stageOne = state ? state.Stage_One_Doses : 'Loading...';
                  const stageTwo = state ? state.Stage_Two_Doses : 'Loading...';

                  setTooltipData({
                    state: name,
                    type,
                    date,
                    admin,
                    alloc,
                    shipped,
                    stageOne,
                    stageTwo,
                  });
                }}
                onMouseLeave={() => {
                  resetTooltip();
                }}
                style={{
                  default: {
                    // fill: '#D6D6DA',
                    outline: 'none',
                  },
                  hover: {
                    fill: '#f3cf7a',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default memo(VaccineMapChart);
