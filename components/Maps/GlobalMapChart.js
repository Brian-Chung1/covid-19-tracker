import React, { memo } from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + 'Bn';
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + 'M';
  } else {
    return Math.round(num / 100) / 10 + 'K';
  }
};

const GlobalMapChart = ({ data, setTooltipData, resetTooltip, colorScale }) => {
  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{ scale: 200 }}
        // style={{ border: '4px solid #001529' }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { NAME, POP_EST } = geo.properties;
                const country = data[NAME];

                return (
                  <Geography
                    stroke="#FFF"
                    key={geo.rsmKey}
                    geography={geo}
                    fill={country ? colorScale(country.TotalConfirmed) : '#EEE'}
                    onMouseEnter={() => {
                      const cases = country ? country.TotalConfirmed : 'N/A';
                      const deaths = country ? country.TotalDeaths : 'N/A';
                      const recovered = country
                        ? country.TotalRecovered
                        : 'N/A';
                      const date = country ? country.Date.slice(0, 10) : 'N/A';

                      setTooltipData({
                        country: NAME,
                        population: rounded(POP_EST),
                        cases,
                        deaths,
                        recovered,
                        date,
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
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(GlobalMapChart);
