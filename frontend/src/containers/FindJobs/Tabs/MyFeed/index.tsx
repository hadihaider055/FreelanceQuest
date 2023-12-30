import React, { useMemo, useState, useEffect } from "react";

// Lottie
import { Player } from "@lottiefiles/react-lottie-player";

// Components
import LoaderComponent from "@/components/common/LoaderComponent";

// Styled
import { MyFeedStyled } from "./styled";
import JobCard from "@/components/common/JobCard";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { getUserJobFeedThunk } from "@/store/thunks/jobThunk";

// Types
import { JobType } from "@/types/job";

const MyFeed: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { isLoading } = useAppSelector((state) => state.job.getAllJobs);

  const handleFetchJobs = async () => {
    const res = await dispatch(
      getUserJobFeedThunk({ user: user?.id || "" })
    ).unwrap();

    setJobs(res);
  };

  useEffect(() => {
    handleFetchJobs();
  }, []);

  return (
    <MyFeedStyled className="my-10 flex flex-col gap-7">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          {jobs.length > 0 && !isLoading ? (
            jobs?.map((proposal: JobType, _id) => (
              <React.Fragment key={_id}>
                <JobCard {...proposal} />
              </React.Fragment>
            ))
          ) : (
            <div className="flex items-center justify-center flex-col">
              <Player
                src="/images/job/searching.json"
                className="player"
                loop
                autoplay
              />
              <h2 className="text-black font-semibold font-montserrat text-xl my-1 text-center">
                No jobs found
                <br />
                Check back later..
              </h2>
            </div>
          )}
        </>
      )}
    </MyFeedStyled>
  );
};

export default MyFeed;
