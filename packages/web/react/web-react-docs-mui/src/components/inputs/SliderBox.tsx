import type React from 'react';
import ColorSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/ColorSlider';
import ContinuousSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/ContinuousSlider';
import DiscreteSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/DiscreteSlider';
import DiscreteSliderLabel from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/DiscreteSliderLabel';
import DiscreteSliderMarks from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/DiscreteSliderMarks';
import DiscreteSliderSteps from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/DiscreteSliderSteps';
import NonLinearSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/NonLinearSlider';
import RangeSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/RangeSlider';
import SliderSizes from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/SliderSizes';
import TrackFalseSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/TrackFalseSlider';
import TrackInvertedSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/TrackInvertedSlider';
import VerticalSlider from '../../_docsExamplesCopy-DO-NOT-EDIT/mui/slider/VerticalSlider';
import { DocsMuiSubModuleBox } from '../DocsMuiSubModuleBox';
import type { SubModuleBoxExample } from '../DocsMuiSubModuleBox';

const examples: SubModuleBoxExample[] = [
  {
    name: 'Continuous',
    url: 'https://mui.com/material-ui/react-slider/#continuous-sliders',
    example: <ContinuousSlider />,
  },
  {
    name: 'Discrete',
    url: 'https://mui.com/material-ui/react-slider/#discrete-sliders',
    example: <DiscreteSlider />,
  },
  {
    name: 'Vertical',
    url: 'https://mui.com/material-ui/react-slider/#vertical-sliders',
    example: <VerticalSlider />,
  },
  {
    name: 'Size',
    url: 'https://mui.com/material-ui/react-slider/#sizes',
    example: <SliderSizes />,
  },
  {
    name: 'Color',
    url: 'https://mui.com/material-ui/react-slider/#color',
    example: <ColorSlider />,
  },
  {
    name: 'Range',
    url: 'https://mui.com/material-ui/react-slider/#range-slider',
    example: <RangeSlider />,
  },
  {
    name: 'Track',
    url: 'https://mui.com/material-ui/react-slider/#removed-track',
    example: <TrackFalseSlider />,
  },
  {
    name: 'Track inverted',
    url: 'https://mui.com/material-ui/react-slider/#inverted-track',
    example: <TrackInvertedSlider />,
  },
  {
    name: 'Small steps',
    url: 'https://mui.com/material-ui/react-slider/#small-steps',
    example: <DiscreteSliderSteps />,
  },
  {
    name: 'Custom marks',
    url: 'https://mui.com/material-ui/react-slider/#custom-marks',
    example: <DiscreteSliderMarks />,
  },
  {
    name: 'Label always visible',
    url: 'https://mui.com/material-ui/react-slider/#label-always-visible',
    example: <DiscreteSliderLabel />,
  },
  {
    name: 'Non-linear scale',
    url: 'https://mui.com/material-ui/react-slider/#non-linear-scale',
    example: <NonLinearSlider />,
  },
];

export function SliderBox(): React.ReactNode {
  return <DocsMuiSubModuleBox examples={examples} />;
}
