import React from "react";

// Styled
import { PostJobContainerStyled, PostJobWrapper } from "./styled";

// Components
import Container from "@/components/common/Container";
import PostJobRight from "../PostJobRight";
import PostJobLeft from "../PostJobLeft";

const PostJobContainer: React.FC = () => {
  return (
    <PostJobContainerStyled className="bg-gray-100 min-h-screen pt-12 relative">
      <Container size="xs">
        <PostJobWrapper className="flex justify-between gap-10">
          <PostJobLeft />
          <PostJobRight />
        </PostJobWrapper>
      </Container>
    </PostJobContainerStyled>
  );
};

export default PostJobContainer;
