import React from "react";

// Components
import Container from "@/components/common/Container";

// Styled
import { SettingsContainerStyled, SettingsContainerWrapper } from "./styled";

const SettingsContainer: React.FC = () => {
  return (
    <SettingsContainerStyled>
      <Container>
        <SettingsContainerWrapper>
          <div className="border-b-2 max-w-[205px]">
            <h1 className="font-poppins text-2xl font-bold text-slate-600 py-2">
              Account Settings
            </h1>
          </div>
        </SettingsContainerWrapper>
      </Container>
    </SettingsContainerStyled>
  );
};

export default SettingsContainer;
