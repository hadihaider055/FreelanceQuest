import { useRouter } from "next/router";
import React from "react";

// Styled
import { InputStyled } from "../BaseStyle/styled";

// Types
import { InputBaseProps } from "../BaseTypes";

type InputProps = InputBaseProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  queryName?: string;
};

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  label,
  type = "text",
  mb = 24,
  preInputText,
  postInputText,
  error,
  required,
  helperText,
  lowercase,
  value,
  onChange,
  queryName,
  inputClass,
  disabled,
  ...props
}) => {
  const router = useRouter();

  // this function will update the query params and will run on change but conditionally on the basis of, if queryName prop is coming
  const updatQuery = (
    __e: React.ChangeEvent<HTMLInputElement>,
    __queryName: string,
  ) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [__queryName]: __e.target.value },
    });
  };
  return (
    <InputStyled
      mb={mb}
      preInputText={preInputText}
      postInputText={postInputText}
      lowercase={lowercase}
      disabled={disabled}
    >
      {label && <label id={id}>{label}</label>}
      <div
        className={`input-container ${error ? "border-error" : ""} `}
        tabIndex={1}
      >
        {onChange ? (
          <input
            type={type}
            id={id}
            className={`input text-small-normal text-gray-900  ${inputClass}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e)}
            disabled={disabled}
            {...props}
          />
        ) : (
          queryName && (
            <input
              type={type}
              id={id}
              className={`input text-small-normal text-gray-900  ${inputClass}`}
              placeholder={placeholder}
              value={router.query[queryName]}
              onChange={(e) => updatQuery(e, queryName)}
              {...props}
            />
          )
        )}
        {preInputText && (
          <span className="pre-input-text text-small-normal-gray">
            {preInputText}
          </span>
        )}
        {postInputText && (
          <span className="post-input-text text-small-normal-gray">
            {postInputText}
          </span>
        )}{" "}
      </div>
      {!helperText && error && typeof error === "string" && (
        <p className="error ">{error}</p>
      )}
      {helperText && <p className="mt-2 text-xs text-gray-800">{helperText}</p>}
    </InputStyled>
  );
};

export default Input;
