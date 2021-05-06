import { LinePath } from '@visx/shape';

const MinValue = ({ data, yScale, xScale, yText, label, x, y }) => {
  return (
    <g>
      <LinePath
        data={data}
        x={(d) => xScale(x(d))}
        y={(d) => yScale(y(d))}
        stroke="#6086d6"
        strokeWidth={1}
        strokeDasharray="4,4"
        strokeOpacity=".8"
      />
      <text fill="#6086d6" y={yText} dy="-.5em" dx="10px" fontSize="15">
        {label}
      </text>
    </g>
  );
};

export default MinValue;
