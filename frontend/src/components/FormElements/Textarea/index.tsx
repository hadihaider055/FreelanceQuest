import { useState } from "react";

import { useFormContext } from "react-hook-form";

// Styled
import { TextareaWrapper } from "./styled";

type TextareaProps = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  inputIcon?: React.ReactNode;
  inputInfo?: boolean;
  inputGuide?: string | React.ReactNode;
  onTextAreaChange?: (value: string) => void;
  maxLength?: number;
  defaultValue?: string;

  // Styling Props
  marginBottom?: number;
  height?: number;

  // disabled
  disabled?: boolean;

  // letter count
  count?: boolean;

  // Icon
  icon?: React.ReactNode;
};

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  required = false,
  error,
  inputIcon,
  inputInfo,
  inputGuide,
  onTextAreaChange,
  defaultValue,
  maxLength = 1000,

  // Styling Props
  marginBottom = 24,
  height = 116,

  // disabled
  disabled = false,

  // letter count
  count = true,
}) => {
  const { register } = useFormContext();
  const { onChange, ...restRegister } = register(id);
  const [value, setValue] = useState("");

  return (
    <TextareaWrapper
      marginBottom={marginBottom}
      height={height}
      disabled={disabled}
      className="textarea-wrapper font-inter text-sm"
    >
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        placeholder={placeholder}
        className="textarea text-md text-small-normal  text-sm font-normal text-[#5A5A5A]"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e);
          onTextAreaChange?.(value);
        }}
        {...restRegister}
        maxLength={maxLength}
        defaultValue={defaultValue}
      ></textarea>
      {error && <div className="error">{error}</div>}
      {count && <span className="bio-text text-sm">{value?.length}</span>}
    </TextareaWrapper>
  );
};

export default Textarea;
