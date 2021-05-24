import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const topoJSON =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';
const geoURL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
// const geoURL = 'http://localhost:3001/geoJSON';

const MapChart = ({ data, setTooltipData, resetTooltip, colorScale }) => {
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
                fill={state ? colorScale(state.cases) : '#EEE'}
                onMouseEnter={() => {
                  const cases = state ? state.cases : 'Loading...';
                  const deaths = state ? state.deaths : 'Loading...';
                  const recovered = state ? state.recovered : 'Loading...';
                  const tests = state ? state.tests : 'Loading...';
                  const vaccinated = state ? state.vaccinated : 'Loading...';
                  setTooltipData({
                    state: name,
                    cases,
                    vaccinated,
                    deaths,
                    recovered,
                    tests,
                  });
                }}
                onMouseLeave={() => {
                  resetTooltip();
                }}
                style={{
                  default: {
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

export default memo(MapChart);
