import React from "react";

// Styled
import { JobsRightHeaderStyled } from "./styled";

// Components
import { UseTabsReturn } from "@/components/common/TabsWithQuery/useTabs";
import Tabs from "@/components/common/TabsWithQuery";
import tabs from "../../Tabs/tabs";

type JobsRightHeaderProps = {
  controlTabs: UseTabsReturn;
};

const JobsRightHeader: React.FC<JobsRightHeaderProps> = ({ controlTabs }) => {
  return (
    <JobsRightHeaderStyled className="bg-white rounded-[5px] py-2 px-7">
      <Tabs
        controlTabs={controlTabs}
        tabs={tabs}
        activeTabsBg={true}
        marginRight={15}
      />
    </JobsRightHeaderStyled>
  );
};

export default JobsRightHeader;
