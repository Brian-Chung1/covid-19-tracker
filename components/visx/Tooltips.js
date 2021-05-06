import { Tooltip, TooltipWithBounds } from '@visx/tooltip';

const Tooltips = ({
  yTop,
  yLeft,
  yLabel,
  xTop,
  xLeft,
  xLabel,
  xStyles,
  yStyles,
}) => {
  return (
    <div>
      <TooltipWithBounds
        key={Math.random()}
        top={yTop}
        left={yLeft}
        style={yStyles}
      >
        {yLabel}
      </TooltipWithBounds>
      <Tooltip top={xTop} left={xLeft} style={xStyles}>
        {xLabel}
      </Tooltip>
    </div>
  );
};

export default Tooltips;
