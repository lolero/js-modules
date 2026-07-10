import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ChartsLegendProps } from '@mui/x-charts';
import { ChartsLegend, useDrawingArea } from '@mui/x-charts';
import type React from 'react';

export type MuiChartLegendWithTitleProps = ChartsLegendProps & {
  title?: string;
};

/**
 * Renders an `@mui/x-charts` legend with an optional centered title above it,
 * as an SVG group positioned within the chart's drawing area.
 * @param props - Component props.
 * @param props.title - Optional title rendered centered above the legend.
 * @returns Chart legend with optional title.
 */
export function MuiChartLegendWithTitle({
  title,
  ...legendProps
}: MuiChartLegendWithTitleProps): React.ReactNode {
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
        <ChartsLegend {...legendProps} />
      </g>
    </g>
  );
}
