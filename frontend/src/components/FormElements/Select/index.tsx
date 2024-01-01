import { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// React Icons
import { IoChevronDownOutline } from "react-icons/io5";

// Styled
import {
  SelectWrapper,
  SelectButtonStyled,
  SelectStyled,
  SelectContainerStyled,
} from "./styled";

export type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: Option[];
  error?: string;
  initialValue?: string;
  onChange?: (option: Option) => void;
  onToggle?: (open: boolean) => void;

  // Styling Props
  marginBottom?: number;

  // disabled
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  id,
  label,
  required = false,
  options,
  error,
  initialValue,

  // Styling Props
  marginBottom = 24,

  // disabled
  disabled = true,
}) => {
  const {
    setValue,
    getValues,
    formState: { isSubmitted },
  } = useFormContext();

  const values = getValues();
  const myValue = values[id];

  const [activeValue, setActiveValue] = useState<string>(
    initialValue || options[0]?.value || ""
  );
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  const onBlurHandler = () => {
    setTimeout(() => {
      const newActiveElement = document.activeElement;
      if (newActiveElement?.id !== `${id}-option`) {
        setDropOpen(false);
      }
    }, 10);
  };

  useEffect(() => {
    setValue(id, activeValue, {
      shouldValidate: isSubmitted,
    });
  }, [activeValue, isSubmitted]);

  useEffect(() => {
    const exists = options.find((opt) => opt.value === myValue);
    if (exists && myValue !== activeValue) {
      setActiveValue(myValue);
    }
  }, [myValue]);

  const activeOption = options.find((opt) => opt.value === activeValue);

  return (
    <SelectContainerStyled>
      {label && (
        <label htmlFor={id} className="label">
          <span className="font-inter text-md">{label}</span>
        </label>
      )}
      <SelectWrapper
        marginBottom={marginBottom}
        className="text-small-normal font-inter text-sm font-normal"
      >
        <SelectButtonStyled
          className="text-small-normal font-inter text-sm font-normal text-[#5A5A5A]"
          onClick={() => setDropOpen((prev) => !prev)}
          onBlur={onBlurHandler}
          type="button"
          disabled={disabled}
        >
          <span className="text">{activeOption?.label || initialValue}</span>
          <i className="icon">
            <IoChevronDownOutline />
          </i>
        </SelectButtonStyled>
        <SelectStyled
          className={`drop-down-container ${dropOpen ? "open" : ""}`}
        >
          {dropOpen && (
            <div className="drop-down shadow-2xl">
              {options.map((opt) => {
                return (
                  <div
                    className="item text-md"
                    onClick={() => {
                      setActiveValue(opt.value);
                      setDropOpen(false);
                    }}
                    id={`${id}-option`}
                    tabIndex={0}
                    key={opt.value}
                  >
                    {opt.label}
                  </div>
                );
              })}
            </div>
          )}
        </SelectStyled>
        {error && <div className="error ">{error}</div>}
      </SelectWrapper>
    </SelectContainerStyled>
  );
};

export default Select;
