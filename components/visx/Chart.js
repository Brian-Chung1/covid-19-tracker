import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { AreaClosed, LinePath, Bar, Line } from '@visx/shape';
import { withParentSize } from '@visx/responsive';
import { scaleTime, scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { PatternLines } from '@visx/pattern';
import { AxisBottom } from '@visx/axis';
import {
  Tooltip,
  useTooltip,
  defaultStyles,
  TooltipWithBounds,
} from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';

import Tooltips from './Tooltips';
import Hoverline from './Hoverline';
import MaxValue from './MaxValue';
import MinValue from './MinValue';

import { formatDate, formatNumber } from '../../utils/index';

const TooltipXStyles = {
  ...defaultStyles,
  minWidth: 72,
  textAlign: 'center',
  // transform: 'translateX(-50%)',
  // transition: 'all 0.3s ease-out',
};

const TooltipYStyles = {
  ...defaultStyles,
  background: '#5c77eb',
  border: '1px solid white',
  color: 'white',
  // transition: 'all 0.3s ease-out',
};

const Chart = ({ data, parentWidth, parentHeight, margin, hide }) => {
  if (hide) return null;
  if (parentWidth < 10 || data.length < 1) return null;

  //tooltip hook
  const {
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  //useCallback could be causing the width height changing to
  //not make the tooltips re calculate the position based on new view size
  const handleTooltip = useCallback(
    (event) => {
      const { x: xPoint } = localPoint(event) || { x: 0 };
      const x0 = xScale.invert(xPoint);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && x(d1)) {
        d =
          x0.valueOf() - x(d0).valueOf() > x(d1).valueOf() - x0.valueOf()
            ? d1
            : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: xScale(x(d)),
        tooltipTop: yScale(y(d)),
      });
    },
    [showTooltip, yScale, xScale]
  );

  //chart inner width & height
  const width = parentWidth - margin.left - margin.right;
  const height = parentHeight - margin.top - margin.bottom;

  //accessors
  const x = (d) => new Date(d.date);
  const y = (d) => d.data;
  const bisectDate = bisector((d) => x(d)).left;

  const firstPoint = data[0];
  const currentPoint = data[data.length - 1];

  const minValue = Math.min(...data.map(y));
  const maxValue = Math.max(...data.map(y));

  const firstValue = y(firstPoint);
  const currentValue = y(currentPoint);

  const maxTime = Math.max(...data.map(x));
  const minTime = Math.min(...data.map(x));

  const maxData = [
    { date: x(firstPoint), data: maxValue },
    { date: x(currentPoint), data: maxValue },
  ];
  const minData = [
    { date: x(firstPoint), data: minValue },
    { date: x(currentPoint), data: minValue },
  ];

  // scales
  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0, width],
        domain: [minTime, maxTime],
      }),
    [width, margin.left]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        domain: [minValue, maxValue],
      }),
    [margin.top, height]
  );

  return (
    <div style={{ position: 'relative' }}>
      <svg width={parentWidth} height={parentHeight}>
        <LinearGradient
          id="fill"
          from="#6086d6"
          to="#6086d6"
          fromOpacity={0.2}
          toOpacity={0}
        />
        <PatternLines
          id="dLines"
          height={6}
          width={6}
          stroke="#27273f"
          strokeWidth={1}
          orientation={['diagonal']}
        />
        <Group top={margin.top} left={margin.left}>
          <AxisBottom
            data={data}
            scale={xScale}
            x={x}
            top={height}
            left={-40}
            numTicks={3}
            hideAxisLine
            hideTicks
            tickLabelProps={() => ({
              fill: '#ffffff',
              fontSize: 14,
              textAnchor: 'middle',
            })}
          />
          <MaxValue
            data={maxData}
            yText={yScale(maxValue)}
            label={formatNumber(maxValue)}
            yScale={yScale}
            xScale={xScale}
            x={x}
            y={y}
          />
          <AreaClosed
            stroke="transparent"
            data={data}
            yScale={yScale}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            fill="url(#fill)"
          />
          <AreaClosed
            stroke="transparent"
            data={data}
            yScale={yScale}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            fill="url(#dLines)"
          />
          <LinePath
            data={data}
            x={(d) => xScale(x(d))}
            y={(d) => yScale(y(d))}
            stroke="#6086d6"
            strokeOpacity="0.8"
            strokeWidth={1}
          />
          <MinValue
            data={minData}
            yScale={yScale}
            xScale={xScale}
            y={y}
            x={x}
            yText={yScale(minValue)}
            label={formatNumber(minValue)}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={width}
            height={height}
            fill="transparent"
            onTouchStart={(event) => handleTooltip(event)}
            onTouchMove={(event) => handleTooltip(event)}
            onMouseMove={(event) => handleTooltip(event)}
            onMouseLeave={() => hideTooltip()}
            onTouchEnd={() => hideTooltip()}
          />
        </Group>
        {tooltipData && (
          <Hoverline
            from={{
              x: tooltipLeft,
              y: yScale(y(maxData[0])),
            }}
            to={{
              x: tooltipLeft,
              y: yScale(y(minData[0])),
            }}
            tooltipLeft={tooltipLeft}
            tooltipTop={tooltipTop}
          />
        )}
      </svg>
      {tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - 20}
            left={tooltipLeft + 12}
            style={TooltipYStyles}
            offsetTop={-10}
          >
            {formatNumber(y(tooltipData))}
          </TooltipWithBounds>
          <TooltipWithBounds
            key={Math.random() + Math.random()}
            top={height + margin.top - 14}
            // top={yScale(minValue)}
            left={tooltipLeft - 12}
            style={TooltipXStyles}
          >
            {formatDate(x(tooltipData))}
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default Chart;
