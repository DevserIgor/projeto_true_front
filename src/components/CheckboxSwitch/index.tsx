import React from 'react';

import { Container, SwitchSelection } from "./styles";


interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

interface ICheckedState {
  checked: boolean;
  onChange(): void;
}

const CheckBoxSwitch: React.FC<ICheckedState> = ({ checked, onChange }) => (
  <Container>
    <SwitchSelection
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
    />
  </Container>
);

export default CheckBoxSwitch;