import { FaArrowRightToBracket } from "react-icons/fa6";
import { TbSettingsCog } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";

export const NavbarData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Find Talent",
    link: "/freelancers",
  },
];

export const FreelancerNavbarData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Find Work",
    link: "/jobs?type=feed",
  },
  {
    title: "Find Talent",
    link: "/freelancers",
  },
  {
    title: "Proposals",
    link: "/proposals",
  },
];

export const ClientNavbarData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Post a Job",
    link: "/post-job",
  },
  {
    title: "My Jobs",
    link: "/my-jobs",
  },
  {
    title: "Find Talent",
    link: "/freelancers",
  },
];

export const NavbarDropdownData = [
  {
    title: "Profile",
    link: "/account/profile",
    icon: <VscAccount fontSize={14} />,
  },
  {
    title: "Settings",
    link: "/account/settings",
    icon: <TbSettingsCog fontSize={14} />,
  },
];
