import React from "react";

// Styled
import { TabsStyled } from "./styled";

//
import { UseTabsReturn } from "./useTabs";

export enum TabTypes {
  TEXT = "TEXT",
  SPACER = "SPACER",
}

export type Tab = {
  id: string;
  title: React.ReactNode | string;
  type: TabTypes;
  component: React.FC;
  buttonClass?: string;
  mainRoute?: string;
};

type TabsProps = {
  tabs: Tab[];
  controlTabs: UseTabsReturn;
  activeTabsBg?: boolean;
  marginRight?: number;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  controlTabs,
  activeTabsBg = false,
  marginRight = 60,
}) => {
  return (
    <TabsStyled activeTabsBg={activeTabsBg} marginRight={marginRight}>
      {tabs?.map((tab) => {
        const isActive = tab.id === controlTabs.activeTabId;
        return (
          <React.Fragment key={tab.id}>
            {tab.type === TabTypes.TEXT && (
              <li className={`${isActive ? "active" : ""}`}>
                <button
                  onClick={() => controlTabs.switchTab(tab.id)}
                  className={`text-md ${tab.buttonClass} font-inter`}
                >
                  {tab.title}
                </button>
              </li>
            )}
            {tab.type === TabTypes.SPACER && <li className="spacer"></li>}
          </React.Fragment>
        );
      })}
    </TabsStyled>
  );
};

export default Tabs;
