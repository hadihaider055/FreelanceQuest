import React from "react";
import { FieldError } from "react-hook-form";

export type InputBaseProps = React.HTMLProps<HTMLInputElement> & {
  id: string;
  placeholder?: string;
  label?: string;
  mb?: number;
  error?: FieldError | string | boolean;
  preInputText?: string | React.ReactNode;
  postInputText?: string | React.ReactNode;
  helperText?: string;
  lowercase?: boolean;
  inputClass?: string;
  required?: boolean;
  disabled?: boolean;
  button?: React.ReactNode;
};
