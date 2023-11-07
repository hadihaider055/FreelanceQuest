import React from "react";

// Styled
import {
  CheckboxSwitchInput,
  CheckboxSwitchLabel,
  CheckboxSwitchStyled,
} from "./styled";

type CheckboxProps = {
  id: string;

  // Controlled Props
  checked?: boolean;
  checkedChanged?: (newChecked: boolean) => void;
  disabled?: boolean;
};

const CheckboxSwitch: React.FC<CheckboxProps> = ({
  id,

  checked,
  checkedChanged,
  disabled = false,
}) => {
  return (
    <CheckboxSwitchStyled htmlFor={id} className={checked ? "active" : ""}>
      <CheckboxSwitchInput
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          if (!disabled) {
            checkedChanged?.(e.target.checked);
          }
        }}
        style={{ display: "none" }}
        id={id}
      />

      <CheckboxSwitchLabel
        className={checked ? "right-[2px]" : "left-[2px]"}
      ></CheckboxSwitchLabel>
    </CheckboxSwitchStyled>
  );
};

export default CheckboxSwitch;
