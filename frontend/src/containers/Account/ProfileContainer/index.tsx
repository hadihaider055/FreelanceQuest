// @ts-nocheck

import { useState } from "react";

// Next
import Image from "next/image";
import { useSession } from "next-auth/react";

// React Icons
import { FaPen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

// Styled
import {
  ProfileContainerContent,
  ProfileContainerStyled,
  ProfileContainerWrapper,
  ProfileContentLeft,
  ProfileContentPartition,
  ProfileContentRight,
  ProfileContentRightHistory,
  ProfileContentRightInfo,
  UploadProfilePictureLabelStyled,
} from "./styled";

// Components
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import ReviewCard from "@/components/common/ReviewCard";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import {
  deleteProfilePictureThunk,
  updateProfilePictureThunk,
} from "@/store/thunks/authThunk";
import Link from "next/link";
import UpdateProfileModal from "@/containers/Modals/UpdateProfileModal";
import { UserRoleEnum } from "@/types/user";

const ProfileContainer: React.FC = () => {
  const [lineClamp, setLineClamp] = useState(8);

  const session = useSession();
  const dispatch = useAppDispatch();

  const { user, updateProfilePicture, deleteProfilePicture } = useAppSelector(
    (state) => state.auth
  );

  const uploadProfilePicture = async (e) => {
    const fileInput = e.target;
    const file = fileInput.files[0];

    if (file && session.data) {
      const res = await dispatch(
        updateProfilePictureThunk({
          userId: session.data.user.id,
          profile_image: file,
        })
      ).unwrap();

      session.update(
        "user",
        (user) =>
          (user = {
            ...user,
            profileImage: res.profileImage,
          })
      );
    }
  };

  const handleDeleteProfilePicture = async () => {
    if (session?.data) {
      const updated = await dispatch(
        deleteProfilePictureThunk({ userId: session.data.user.id })
      ).unwrap();

      session.update(
        "user",
        (user) =>
          (user = {
            ...user,
            profileImage: updated?.profileImage,
          })
      );
    }
  };

  return (
    <ProfileContainerStyled>
      <Container>
        <ProfileContainerWrapper>
          <div className="border-b-2 max-w-[145px]">
            <h1 className="font-poppins text-2xl font-bold text-slate-600 py-2">
              User Profile
            </h1>
          </div>

          <ProfileContainerContent>
            <div className="flex items-center justify-between border-b-2 pb-16 border-stone-300">
              <div className="flex items-center gap-[18px]">
                <div className="w-[190px] h-[190px] rounded-[50%] overflow-hidden flex items-center justify-center bg-slate-200 shadow-profile-image">
                  <Image
                    src={user?.profileImage || ""}
                    alt="Dummy"
                    className="w-[170px] h-[170px] object-cover rounded-[50%]"
                    width={170}
                    height={170}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="font-montserrat text-2xl font-bold text-slate-600">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <h6 className="font-montserrat text-xl text-slate-600">
                    {user?.category}
                  </h6>
                  <p className="text-gray-500 text-lg font-normal font-montserrat">
                    Eastern European Time (EET), Cairo UTC +3
                  </p>
                  {user?.role === UserRoleEnum.FREELANCER && (
                    <div className="flex items-center gap-4">
                      <p className="text-gray-500 text-lg font-medium font-montserrat">
                        ${user?.hourlyRate}/hr
                      </p>
                      {/* <i className="cursor-pointer text-green-500">
                      <FaPen />
                    </i> */}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-14">
                <div className="btns">
                  {!updateProfilePicture?.isLoading && (
                    <input
                      id="profile-picture-input"
                      onChange={uploadProfilePicture}
                      style={{ display: "none" }}
                      type="file"
                    />
                  )}
                  <UploadProfilePictureLabelStyled
                    for="profile-picture-input"
                    className={
                      updateProfilePicture?.isLoading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  >
                    <Button
                      isLoading={updateProfilePicture?.isLoading}
                      disabled={updateProfilePicture?.isLoading}
                      variant="grey"
                      size="md"
                    >
                      Upload New Photo
                    </Button>
                  </UploadProfilePictureLabelStyled>
                </div>
                <div className="btns">
                  <Button
                    variant="grey-transparent"
                    onClick={handleDeleteProfilePicture}
                    disabled={deleteProfilePicture?.isLoading}
                    isLoading={deleteProfilePicture?.isLoading}
                    size="md"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            <ProfileContentPartition className="flex">
              {user?.role === UserRoleEnum.FREELANCER && (
                <ProfileContentLeft className="w-1/3 h-full">
                  <div className="flex items-center justify-around  border-b-2 border-stone-300 w-full px-4 pb-4">
                    <div className="flex items-center flex-col">
                      <h3 className="font-montserrat font-medium text-2xl text-black">
                        $0
                      </h3>
                      <p className="text-black text-lg font-base font-montserrat">
                        Total earnings
                      </p>
                    </div>
                    <div className="flex items-center flex-col">
                      <h3 className="font-montserrat font-medium text-2xl text-black">
                        0
                      </h3>
                      <p className="text-black text-lg font-base font-montserrat">
                        Total jobs
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col w-full px-4 pt-4">
                    <h3 className="font-montserrat font-medium text-2xl text-black text-left">
                      Languages
                    </h3>

                    <ul className="mt-4 flex flex-col gap-2">
                      {user?.languages?.map((language, _index) => (
                        <li key={_index}>
                          <p className="text-black text-lg font-normal font-montserrat">
                            {language}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ProfileContentLeft>
              )}

              <ProfileContentRight className="w-full">
                {user?.role === UserRoleEnum.FREELANCER && (
                  <ProfileContentRightInfo>
                    <div>
                      <h2
                        className="font-poppins text-3xl font-bold text-slate-600"
                        style={{ marginBottom: "1.5rem" }}
                      >
                        {user?.title}
                      </h2>
                    </div>
                    <div>
                      <p
                        className={`font-montserrat text-lg text-slate-600`}
                        style={{
                          WebkitLineClamp: lineClamp,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          display: "-webkit-box",
                          lineClamp: lineClamp,
                        }}
                      >
                        {user?.description}
                      </p>

                      <span
                        className="cursor-pointer font-montserrat text-lg font-medium text-green-500 underline"
                        onClick={() => setLineClamp(lineClamp === 0 ? 8 : 0)}
                      >
                        {lineClamp === 0 ? "less" : "more"}
                      </span>
                    </div>
                  </ProfileContentRightInfo>
                )}

                <ProfileContentRightHistory>
                  <h2
                    className="font-poppins text-3xl font-bold text-slate-600 border-b-2 max-w-[190px] pb-3"
                    style={{ marginBottom: "1.5rem" }}
                  >
                    Work history
                  </h2>

                  <div className="flex items-center gap-3">
                    <p className="font-poppins text-lg text-gray-500  font-bold">
                      0 reviews
                    </p>
                    <div className="flex items-center gap-2">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <i
                            className={
                              i < 0 ? "text-green-500" : "text-stone-300"
                            }
                            key={i}
                          >
                            <FaStar />
                          </i>
                        ))}
                      <p className="font-poppins text-lg text-gray-500  font-bold">
                        (0)
                      </p>
                    </div>
                  </div>

                  <hr className="my-5 text-grey-800 h-1" />

                  {/* {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <ReviewCard key={i} />
                    ))} */}

                  <div className="flex items-center justify-center flex-col my-11 gap-3">
                    <p className="font-inter text-xl text-gray-500  font-semibold">
                      No reviews yet
                    </p>

                    <Link href="/jobs">
                      <Button variant="grey">Find work</Button>
                    </Link>
                  </div>
                </ProfileContentRightHistory>
              </ProfileContentRight>
            </ProfileContentPartition>
          </ProfileContainerContent>
        </ProfileContainerWrapper>
      </Container>
    </ProfileContainerStyled>
  );
};

export default ProfileContainer;
