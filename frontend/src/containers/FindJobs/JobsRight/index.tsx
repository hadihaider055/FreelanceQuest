import React, { useEffect, useState } from "react";

// Next
import Link from "next/link";

// React Icons
import { IoMdFlame } from "react-icons/io";

// Styled
import { JobsLeftStyled, JobsLeftWrapper } from "./styled";

// Components
import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSession } from "next-auth/react";
import { getSubmittedProposals } from "@/store/thunks/proposalThunk";

const JobsLeft = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [sticky, setSticky] = useState(false);
  const session = useSession();
  const dispatch = useAppDispatch();
  const [proposalsSubmitted, setProposalsSubmitted] = useState(0);

  const handleFetchProposals = async (userId: string) => {
    const res = await dispatch(getSubmittedProposals(userId));
    return res;
  };

  useEffect(() => {
    if (session?.data?.user.id) {
      handleFetchProposals(session.data.user.id).then((res) =>
        setProposalsSubmitted(res?.payload?.length)
      );
    }
  }, [session]);

  const handlePositionSticky = () => {
    if (window.scrollY > 110) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handlePositionSticky);
  }, []);

  return (
    <JobsLeftStyled className="relative">
      <JobsLeftWrapper
        className={`flex items-center gap-4 flex-col ${
          sticky ? "fixed top-5" : ""
        }`}
      >
        {/* Profile Section */}
        <article
          className={`w-[258px] bg-white rounded-[10px] flex items-center justify-center flex-col shadow-sm gap-4 p-6`}
        >
          <div className="w-[74px] h-[74px] rounded-full overflow-hidden">
            <img
              src={user?.profileImage || ""}
              alt={`${user?.firstName} ${user?.lastName} profile image`}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-inter text-xl font-semibold text-black">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="font-montserrat text-stone-400 text-center text-[11px]">
              {user?.category}
            </p>
          </div>

          <Link href="/account/profile" className="w-full">
            <Button variant="light-grey">Edit Profile</Button>
          </Link>
        </article>

        {/* Availability section */}
        <article className="w-[258px] p-6 bg-white rounded-[10px] flex flex-col gap-6">
          <div className="flex gap-2 flex-col">
            <h3 className="font-inter text-md font-medium text-black">
              Availability
            </h3>

            <div className="max-w-[155px]">
              <Tag text="Available for work" icon="🔥" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-inter text-md font-medium text-black">
              Proposals
            </h3>
            <Link href="/proposals">
              <p className="font-inter text-green-600 text-xs font-medium hover:underline">
                {proposalsSubmitted} Submitted Proposal
                {proposalsSubmitted > 1 && "s"}
              </p>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-inter text-md font-medium text-black">
              Skills and Expertise
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Tag
                text="UI Designer"
                bgColor="bg-stone-200"
                color="text-stone-500"
                rounded="rounded-[5px]"
                padding="p-2"
              />
              <Tag
                text="UX Designer"
                bgColor="bg-stone-200"
                color="text-stone-500"
                rounded="rounded-[5px]"
                padding="p-2"
              />
              <Tag
                text="UI Designer"
                bgColor="bg-stone-200"
                color="text-stone-500"
                rounded="rounded-[5px]"
                padding="p-2"
              />
            </div>
          </div>

          <div>
            <Link href="/account/profile">
              <Button variant="black">View Profile</Button>
            </Link>
          </div>
        </article>
      </JobsLeftWrapper>
    </JobsLeftStyled>
  );
};

export default JobsLeft;
