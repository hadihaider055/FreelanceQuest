import React from "react";

// Lottie
import HomeAnim from "../../../public/images/Home/hero-anim.json";

// Components
import Button from "@/components/common/Button";

// Styled
import { HomeContainerStyled } from "./styled";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player";

const HomeContainer: React.FC = () => {
  return (
    <HomeContainerStyled className="py-28">
      <div className="max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
        <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
          <h2 className="text-4xl text-gray-800 font-extrabold md:text-5xl font-poppins">
            Are you looking for freelancers?
          </h2>
          <p className="font-inter">
            Are you looking for Freelancers? Hire Great Freelancers, Fast.
            Spacelance helps you hire elite freelancers at a moment notice
          </p>
          <div className="items-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
            <Link href="/login">
              <Button size="md">Hire a freelancer</Button>
            </Link>
          </div>
        </div>
        <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
          <Player autoplay loop src={HomeAnim} />
        </div>
      </div>
    </HomeContainerStyled>
  );
};

export default HomeContainer;
