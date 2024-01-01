import { FaArrowRightToBracket } from "react-icons/fa6";
import { TbSettingsCog } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";

export const FreelancerNavbarData = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Find Work",
    link: "/jobs",
  },
  {
    title: "Find Talent",
    link: "/freelancers",
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
    link: "/client/my-jobs",
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
    link: "/settings",
    icon: <TbSettingsCog fontSize={14} />,
  },
];
