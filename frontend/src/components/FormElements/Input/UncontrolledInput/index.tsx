import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";

// Styled
import { InputStyled } from "../BaseStyle/styled";

// Types
import { InputBaseProps } from "../BaseTypes";

const Input: React.FC<InputBaseProps> = ({
  id,
  placeholder,
  label,
  type = "text",
  mb = 0,
  preInputText,
  postInputText,
  error,
  required,
  helperText,
  lowercase,
  inputClass,
  disabled,
  button,
  ...props
}) => {
  const { register, setFocus } = useFormContext();

  const activeInput = () => {
    setFocus(id);
  };
  return (
    <InputStyled
      mb={mb}
      preInputText={preInputText}
      postInputText={postInputText}
      lowercase={lowercase}
      onClick={activeInput}
      disabled={disabled}
    >
      {label && <label id={id}>{label}</label>}
      <div
        className={`input-container ${error ? "border-error" : ""}`}
        tabIndex={1}
      >
        <input
          type={type}
          id={id}
          className={`input text-small-normal font-poppins text-sm font-normal text-[#5A5A5A]  ${
            inputClass || ""
          }`}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id)}
          {...props}
        />
        {preInputText && <span className="pre-input-text">{preInputText}</span>}
        {postInputText && (
          <span className="post-input-text">{postInputText}</span>
        )}
      </div>
      {!helperText && error && typeof error === "string" && (
        <p className="error  mt-1 font-inter text-xs font-light text-red-500">
          {error}
        </p>
      )}
      {helperText && <p className="mt-2 text-xs text-gray-800">{helperText}</p>}
      {button && <>{button}</>}
    </InputStyled>
  );
};

export default Input;
