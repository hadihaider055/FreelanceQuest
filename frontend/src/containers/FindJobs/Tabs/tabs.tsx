import { Tab, TabTypes } from "@/components/common/TabsWithQuery";

// Tabs
import RecentJobs from "./RecentJobs";
import FeaturedJobs from "./FeaturedJobs";

const tabs: Tab[] = [
  {
    id: "recent-jobs",
    title: "Most Recent",
    type: TabTypes.TEXT,
    component: RecentJobs,
  },
  {
    id: "featured-jobs",
    title: "Featured",
    type: TabTypes.TEXT,
    component: FeaturedJobs,
  },
];

export default tabs;
