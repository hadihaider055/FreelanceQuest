import React from "react";

// Styled
import { JobsContainerStyled } from "./styled";

// Components
import JobsLeft from "../JobsRight";
import JobsRight from "../JobsLeft/Container";
import Container from "@/components/common/Container";

const JobsContainer = () => {
  return (
    <JobsContainerStyled className="bg-gray-100 min-h-screen pt-12 relative">
      <Container size="sm">
        <article className="flex relative">
          <div className="max-w-[1022px] w-full  mr-10">
            <JobsRight />
          </div>
          <div className="hidden md:block">
            <JobsLeft />
          </div>
        </article>
      </Container>
    </JobsContainerStyled>
  );
};

export default JobsContainer;
