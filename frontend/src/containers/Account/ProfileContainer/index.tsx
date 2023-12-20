// Styled
import { ProfileContainerStyled, ProfileContainerWrapper } from "./styled";

// Components
import Container from "@/components/common/Container";

const ProfileContainer: React.FC = () => {
  return (
    <ProfileContainerStyled>
      <Container>
        <ProfileContainerWrapper>
          <div className="border-b-2 max-w-[145px]">
            <h1 className="font-poppins text-2xl font-bold text-slate-600 py-2">
              User Profile
            </h1>
          </div>
        </ProfileContainerWrapper>
      </Container>
    </ProfileContainerStyled>
  );
};

export default ProfileContainer;
