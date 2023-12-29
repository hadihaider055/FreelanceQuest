import React from "react";

// Components
import useTabsWithQuery from "@/components/common/TabsWithQuery/useTabs";
import JobsRightHeader from "../Header";
import tabs from "../../Tabs/tabs";

// Styled
import { JobsRightStyled, JobsRightWrapper } from "./styled";

const JobsRight = () => {
  const queryTabs = useTabsWithQuery({ tabs });

  const { renderActiveComponent } = queryTabs;

  return (
    <JobsRightStyled className="w-full mr-10">
      <JobsRightWrapper>
        {/* Header Job Listing */}
        <JobsRightHeader controlTabs={queryTabs} />
        <div>{renderActiveComponent({ type: "recent-jobs" })}</div>
      </JobsRightWrapper>
    </JobsRightStyled>
  );
};

export default JobsRight;
