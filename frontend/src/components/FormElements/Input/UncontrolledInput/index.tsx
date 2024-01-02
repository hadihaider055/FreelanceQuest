import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

// React Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  maxLength,
  minLength,
  ...props
}) => {
  const { register, setFocus } = useFormContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      type={type}
    >
      {label && <label id={id}>{label}</label>}
      <div
        className={`input-container relative  ${error ? "border-error" : ""}`}
        tabIndex={1}
      >
        <input
          type={type === "password" && passwordVisible ? "text" : type}
          id={id}
          className={`input text-small-normal text-gray-900  ${
            type === "password" ? "pr-[45px] px-6 py-[19px]" : "px-6 py-[19px]"
          } ${inputClass || ""}`}
          disabled={disabled}
          placeholder={placeholder}
          {...register(id)}
          {...props}
        />
        {type === "password" && (
          <>
            {!passwordVisible ? (
              <span
                className="absolute right-[23px] top-1/2 -translate-y-1/2 w-5 flex items-center justify-center text-[#B8B8B8] cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <AiOutlineEyeInvisible fontSize={23} />
              </span>
            ) : (
              <span
                className="absolute right-[23px] top-1/2 -translate-y-1/2 w-5 flex items-center justify-center text-[#B8B8B8] cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <AiOutlineEye fontSize={23} />
              </span>
            )}
          </>
        )}
        {preInputText && <span className="pre-input-text">{preInputText}</span>}
      </div>
      {(postInputText || minLength || maxLength) && (
        <span className="post-input-text flex justify-end">
          {postInputText ||
            (minLength && `Min ${minLength}`) ||
            (maxLength && `Max ${maxLength}`)}
        </span>
      )}
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
