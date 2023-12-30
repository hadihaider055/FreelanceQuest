import styled from "styled-components";

export const NavbarStyled = styled.section`
  height: 80px;
  background-color: var(--white);
  display: flex;
  padding: 0 20px;
  position: relative;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid var(--grey30);
  overflow: hidden;
`;

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 132px;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;

  .navbar-border-bottom {
    display: inline-block;
    margin: 0;
    right: 0;
    height: 80px;
    margin-top: 58px;
    z-index: 1;
  }

  .navbar-border-bottom::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #20db49;
    transition: width 0.3s;
    position: absolute;
    bottom: 30px;
    left: 0;
  }

  .navbar-border-bottom:hover::after {
    width: 100%;
  }
`;

export const NavbarProfileImage = styled.img`
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
  border-radius: 100%;
  margin-left: 10px;
  cursor: pointer;
`;
