import { LinePath } from '@visx/shape';

const MaxValue = ({ data, label, yText, yScale, xScale, x, y }) => {
  return (
    <g>
      <LinePath
        data={data}
        y={(d) => yScale(y(d))}
        x={(d) => xScale(x(d))}
        stroke="#6086d6"
        strokeWidth={1}
        strokeDasharray="4,4"
        strokeOpacity=".8"
      />
      <text fill="#6086d6" y={yText} dy="1.3em" dx="10px" fontSize="15">
        {label}
      </text>
    </g>
  );
};

export default MaxValue;
