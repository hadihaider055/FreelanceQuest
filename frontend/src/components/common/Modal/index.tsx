import React from "react";

// Styled
import { ModalBackdrop, ModalStyled, ModalWrapper } from "./styled";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <ModalStyled>
      <ModalBackdrop onClick={onClose}></ModalBackdrop>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalStyled>
  );
};

export default Modal;
