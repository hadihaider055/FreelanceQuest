import styled from "styled-components";

export const UpdateProfileModalStyled = styled.div`
  width: 900px;
  background-color: #fff;
  padding: 30px;
  border-radius: 15px;
  overflow-y: scroll;

  @media (max-width: ${({ theme }) => theme.breakpoints.ipadpro - 1}px) {
    width: 100%;
  }
`;

export const UpdateProfileModalWrapper = styled.div``;
