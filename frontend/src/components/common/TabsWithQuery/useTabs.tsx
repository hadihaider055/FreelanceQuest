import React, { useEffect, useState } from "react";
import { Tab } from ".";
import { useRouter } from "next/router";

type UseTabsArgs = {
  tabs: Tab[];
};

// Function Types
export type SwitchTab = (tabId: string) => void;
export type RenderActiveComponent = (props: any) => React.ReactNode;

export type UseTabsReturn = {
  activeTabId: string;
  switchTab: SwitchTab;
  renderActiveComponent: RenderActiveComponent;
  tabs: Tab[];
};

const useTabs = ({ tabs }: UseTabsArgs): UseTabsReturn => {
  const router = useRouter();
  let activeTabId = router.query.type;

  useEffect(() => {
    if (!activeTabId && router.isReady) {
      const firstTab = tabs[0];
      if (firstTab) {
        switchTab(firstTab.id);
      }
    }
  }, [activeTabId]);

  const switchTab: SwitchTab = (tabId) => {
    const tabExists = tabs.find((tab) => tab.id === tabId);
    router.push({
      pathname: tabExists?.mainRoute,
      query: { type: tabId },
    });
    if (tabExists) {
      activeTabId = tabId;
    }
  };

  const renderActiveComponent: RenderActiveComponent = (props = {}) => {
    if (!activeTabId) return null;
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    if (!activeTab) {
      return null;
    }
    const Component = activeTab.component;

    return <Component {...props} />;
  };

  return {
    activeTabId: activeTabId as string,
    switchTab,
    renderActiveComponent,
    tabs,
  };
};

export default useTabs;
