import React, { useMemo, useState, useEffect } from "react";

// Lottie
import { Player } from "@lottiefiles/react-lottie-player";

// Components
import LoaderComponent from "@/components/common/LoaderComponent";

// Styled
import { RecentJobsStyled } from "./styled";
import JobCard from "@/components/common/JobCard";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { getAllJobsThunk } from "@/store/thunks/jobThunk";

// Types
import { JobType } from "@/types/job";

const RecentJobs: React.FC = () => {
  const [jobs, setJobs] = useState([]);
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.job.getAllJobs);

  const handleFetchJobs = async () => {
    const res = await dispatch(getAllJobsThunk({})).unwrap();

    setJobs(res);
  };

  useEffect(() => {
    handleFetchJobs();
  }, []);

  return (
    <RecentJobsStyled className="my-10 flex flex-col gap-7">
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
    </RecentJobsStyled>
  );
};

export default RecentJobs;
