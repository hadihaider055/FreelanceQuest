import styled from "styled-components";

export const CheckboxSwitchStyled = styled.label`
  width: 40px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 50px;
  padding: 2px;
  position: relative;
  cursor: pointer;

  &.active {
    background: #5a5a5a;
  }
`;

export const CheckboxSwitchInput = styled.input``;

export const CheckboxSwitchLabel = styled.div`
  width: 16px;
  height: 16px;
  background: white;
  border: 1px solid #c9c9c9;
  border-radius: 50%;
  position: absolute;
  box-shadow: 1px 1px 2px -1px rgba(51, 51, 51, 0.3);
`;
