// Next
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// Styled
import Link from "next/link";

// Components
import { NavbarStyled, NavbarWrapper } from "./styled";

// Site Data
import { NavbarData } from "@/site-data/Navbar";

const Navbar: React.FC = () => {
  const { status } = useSession();

  const { push } = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
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
          {NavbarData.map((item, index) => (
            <div
              key={index}
              className="navbar-border-bottom mx-[8px] relative h-full"
            >
              <Link href={item.link} className="">
                {item.title}
              </Link>
            </div>
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
            <div
              className="bg-green-500 rounded-3xl p-2 w-36 flex items-center justify-center text-zinc-50 hover:shadow-lg transition-all ease-in-out duration-300 cursor-pointer"
              onClick={handleLogout}
            >
              Log out
            </div>
          )}
        </article>
      </NavbarWrapper>
    </NavbarStyled>
  );
};

export default Navbar;
