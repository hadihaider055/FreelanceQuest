import React from "react";

// Styled
import { JobsContainerStyled } from "./styled";

// Components
import JobsLeft from "../JobsRight";
import JobsRight from "../JobsLeft/Container";
import Container from "@/components/common/Container";

const JobsContainer = () => {
  return (
    <JobsContainerStyled className="bg-gray-100 min-h-screen pt-12">
      <Container size="sm">
        <article className="flex">
          <JobsRight />
          <div className="hidden md:block">
            <JobsLeft />
          </div>
        </article>
      </Container>
    </JobsContainerStyled>
  );
};

export default JobsContainer;
