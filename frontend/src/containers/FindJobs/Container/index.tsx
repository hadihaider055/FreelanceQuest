import React from "react";

// Styled
import { JobsContainerStyled } from "./styled";

// Components
import JobsLeft from "../JobsLeft";
import JobsRight from "../JobsRight";
import Container from "@/components/common/Container";

const JobsContainer = () => {
  return (
    <JobsContainerStyled className="bg-gray-100 min-h-screen pt-12">
      <Container>
        <article className="flex">
          <JobsRight />
          <JobsLeft />
        </article>
      </Container>
    </JobsContainerStyled>
  );
};

export default JobsContainer;
