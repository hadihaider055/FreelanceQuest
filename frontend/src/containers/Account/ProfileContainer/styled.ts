import styled from "styled-components";

export const ProfileContainerStyled = styled.section`
  margin-top: 50px;
  padding: 20px 0;
`;

export const ProfileContainerWrapper = styled.div``;

export const ProfileContainerContent = styled.article`
  margin-top: 61px;

  .shadow-profile-image {
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  }

  .btns {
    width: 196px;

    button {
      width: 196px;
      height: 60px;
    }
  }
`;

export const ProfileContentPartition = styled.article``;

export const ProfileContentLeft = styled.div`
  border: 2px solid rgb(214 211 209 / 1);
  border-top: none;
  border-right: none;
  padding: 30px 0;
`;

export const ProfileContentRight = styled.div`
  border: 2px solid rgb(214 211 209 / 1);
  border-top: none;
`;

export const ProfileContentRightInfo = styled.div`
  padding: 30px 20px;
`;

export const ProfileContentRightHistory = styled.div`
  border-top: 2px solid rgb(214 211 209 / 1);
  padding: 30px 20px 0 20px;
`;

export const UploadProfilePictureLabelStyled = styled.label`
  cursor: pointer;
  position: relative;
  transition: ease-out all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 10px;
  gap: 8px;
  width: 100%;
  color: white;
  border: none;
  white-space: nowrap;
  height: 60px;
  position: relative;

  button {
    position: absolute;
    z-index: -1;
  }
`;
