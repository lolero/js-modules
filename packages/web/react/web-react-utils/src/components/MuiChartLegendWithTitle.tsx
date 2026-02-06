import React from 'react';
import { ChartsLegend, ChartsLegendProps, useDrawingArea } from '@mui/x-charts';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type MuiChartLegendWithTitleProps = ChartsLegendProps & {
  title?: string;
};

export const MuiChartLegendWithTitle: React.FC<
  MuiChartLegendWithTitleProps
> = ({ title, ...legendProps }) => {
  const { left, width } = useDrawingArea();

  return (
    <g>
      {title && (
        <foreignObject x={left} y={0} width={width} height={18}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="subtitle2">{title}</Typography>
          </Box>
        </foreignObject>
      )}
      <g transform={title ? 'translate(0, 18)' : undefined}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ChartsLegend {...legendProps} />
      </g>
    </g>
  );
};
