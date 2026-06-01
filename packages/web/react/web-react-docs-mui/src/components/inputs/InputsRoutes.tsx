import type React from 'react';
import {
  WebModules,
  WebSubModulesInputs,
} from '../../constants/modules.constants';
import { DocsMuiModuleRoutes } from '../DocsMuiModuleRoutes';
import { AutocompleteBox } from './AutocompleteBox';
import { ButtonBox } from './ButtonBox';
import { ButtonGroupBox } from './ButtonGroupBox';
import { CheckboxBox } from './CheckboxBox';
import { FloatingActionButtonBox } from './FloatingActionButtonBox';
import { NumberFieldBox } from './NumberFieldBox';
import { RadioGroupBox } from './RadioGroupBox';
import { RatingBox } from './RatingBox';
import { SelectBox } from './SelectBox';
import { SliderBox } from './SliderBox';
import { SwitchBox } from './SwitchBox';
import { TextFieldBox } from './TextFieldBox';
import { ToggleButtonBox } from './ToggleButtonBox';
import { TransferListBox } from './TransferListBox';

const subModuleBoxes: Record<WebSubModulesInputs, React.ReactNode> = {
  [WebSubModulesInputs.autocomplete]: <AutocompleteBox />,
  [WebSubModulesInputs.button]: <ButtonBox />,
  [WebSubModulesInputs.buttonGroup]: <ButtonGroupBox />,
  [WebSubModulesInputs.checkbox]: <CheckboxBox />,
  [WebSubModulesInputs.floatingActionButton]: <FloatingActionButtonBox />,
  [WebSubModulesInputs.numberField]: <NumberFieldBox />,
  [WebSubModulesInputs.radioGroup]: <RadioGroupBox />,
  [WebSubModulesInputs.rating]: <RatingBox />,
  [WebSubModulesInputs.select]: <SelectBox />,
  [WebSubModulesInputs.slider]: <SliderBox />,
  [WebSubModulesInputs.switch]: <SwitchBox />,
  [WebSubModulesInputs.textField]: <TextFieldBox />,
  [WebSubModulesInputs.transferList]: <TransferListBox />,
  [WebSubModulesInputs.toggleButton]: <ToggleButtonBox />,
};

export function InputsRoutes(): React.ReactNode {
  return (
    <DocsMuiModuleRoutes
      webModule={WebModules.inputs}
      subModuleBoxes={subModuleBoxes}
    />
  );
}
