import styled from "styled-components";

export const NavbarStyled = styled.section`
  height: 80px;
  background-color: var(--white);
  display: flex;
  padding: 0 20px;
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
    bottom: 29.5px;
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

export const NavbarSigninDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${(p) => p.theme.breakpoints.ipadpro - 1}px) {
    display: none;
  }
`;

export const NavbarSigninProfile = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

export const NavbarSigninProfilePic = styled.span`
  width: 40px;
  height: 40px;
  border: 1px solid #004a83;
  overflow: hidden;
  border-radius: 50%;
`;

export const NavbarSigninProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const NavbarSigninName = styled.h4``;

export const NavbarSigninArrow = styled.i``;

export const NavbarSigninDropdown = styled.div`
  position: absolute;
  z-index: 1;
  background-color: var(--white);
  box-shadow: 0px 5px 15px #20202080;
  border-radius: 5px;
  padding: 24px 29px;
  top: 7.5%;
  gap: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: -45px;

  a {
    height: 17px;
    margin: 0;
  }
`;

export const NavbarSigninArrowIcon = styled.i`
  font-size: 30px;
  position: absolute;
  top: -13px;
  z-index: -1;
  rotate: -90deg;
`;
