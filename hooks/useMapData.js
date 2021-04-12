import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const jsonURL =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';

export const useMapData = () => {
  const [data, setData] = useState(null);

  // console.log(data);

  useEffect(() => {
    json(jsonURL).then((topoJSON) => {
      console.log(topoJSON);
      setData(feature(topoJSON)); //Converting TopoJSON data to GeoJSON data
    });
  }, []);

  return data;
};
