import { useState } from "react";

// Next
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

// React Icons
import { FaPlay } from "react-icons/fa";
import { TbMessageBolt } from "react-icons/tb";
import { FaArrowRightToBracket } from "react-icons/fa6";

// Components
import PulseLoading from "../../PulseLoading";

// Styled
import {
  NavbarStyled,
  NavbarWrapper,
  NavbarSigninArrow,
  NavbarSigninArrowIcon,
  NavbarSigninDiv,
  NavbarSigninDropdown,
  NavbarSigninName,
  NavbarSigninProfile,
  NavbarSigninProfileImg,
  NavbarSigninProfilePic,
} from "./styled";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { UserRoleEnum } from "@/types/user";
import { logoutUser } from "@/store/slices/authSlice";

// Site Data
import {
  ClientNavbarData,
  FreelancerNavbarData,
  NavbarDropdownData,
} from "@/site-data/Navbar";

const Navbar: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user, login } = useAppSelector((state) => state.auth);
  const { status, data } = useSession();

  const dispatch = useAppDispatch();

  const { push } = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    dispatch(logoutUser());
    push("/");
  };

  return (
    <NavbarStyled>
      <NavbarWrapper>
        <article>
          <Link href="/">
            <Image
              src="/images/login/logo.svg"
              alt="FreelanceQuest"
              width={200}
              height={100}
            />
          </Link>
        </article>

        <article className="flex items-center gap-8 font-poppins text-lg text-black hover:text-gray-900">
          {(user?.role === UserRoleEnum.CLIENT
            ? ClientNavbarData
            : FreelancerNavbarData
          ).map((item, index) => (
            <Link href={item.link} className="" key={index}>
              <div className="navbar-border-bottom mx-[8px] relative h-full">
                {item.title}
              </div>
            </Link>
          ))}
        </article>

        <article className="flex items-center gap-5 font-poppins text-lg">
          {status === "unauthenticated" ? (
            <>
              <Link href="/login">
                <div className="text-black">Log in</div>
              </Link>

              <Link href="/signup">
                <div className="bg-green-500 rounded-3xl p-2 w-36 flex items-center justify-center text-zinc-50 hover:shadow-lg transition-all ease-in-out duration-300">
                  Sign up
                </div>
              </Link>
            </>
          ) : (
            <div>
              {user && (
                <NavbarSigninDiv>
                  <Link href="/messages">
                    <div>
                      <TbMessageBolt fontSize={26} />
                    </div>
                  </Link>
                  <NavbarSigninProfile onClick={() => setDropdown(!dropdown)}>
                    <NavbarSigninProfilePic>
                      <NavbarSigninProfileImg src={user?.profileImage} />
                    </NavbarSigninProfilePic>

                    {dropdown && (
                      <NavbarSigninDropdown>
                        <NavbarSigninArrowIcon>
                          <FaPlay color="var(--white)" />
                        </NavbarSigninArrowIcon>

                        <div className="flex flex-col gap-3">
                          {NavbarDropdownData.map((item, index) => (
                            <Link key={index} href={item.link}>
                              <div className="flex items-center gap-2">
                                <span className="w-5 flex items-center justify-center">
                                  {item.icon}
                                </span>
                                <p
                                  className={`cursor-pointer font-montserrat text-xs text-black60`}
                                >
                                  {item.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <div
                            className="flex items-center gap-2"
                            onClick={handleLogout}
                          >
                            <span className="w-5 flex items-center justify-center">
                              <FaArrowRightToBracket fontSize={14} />
                            </span>
                            <p
                              className={`cursor-pointer font-montserrat text-xs text-black60`}
                            >
                              Logout
                            </p>
                          </div>
                        </div>
                      </NavbarSigninDropdown>
                    )}
                  </NavbarSigninProfile>
                </NavbarSigninDiv>
              )}
              {login.isLoading && (
                <PulseLoading backgroundColor="var(--black60)" />
              )}
            </div>
          )}
        </article>
      </NavbarWrapper>
    </NavbarStyled>
  );
};

export default Navbar;
