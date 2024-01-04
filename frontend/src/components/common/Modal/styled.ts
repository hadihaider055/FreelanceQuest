import styled from "styled-components";

export const ModalStyled = styled.article`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  overflow: hidden;
  z-index: 2;
`;

export const ModalBackdrop = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: absolute;
  top: 0;
`;
