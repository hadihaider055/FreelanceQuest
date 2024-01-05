import React, { useEffect, useState } from "react";

// Styled
import { MyJobWrapper, MyJobsContainerStyled } from "./styled";

// Components
import Container from "@/components/common/Container";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { getUserJobFeedThunk } from "@/store/thunks/jobThunk";
import { JobType } from "@/types/job";
import Link from "next/link";
import JobCard from "@/components/common/JobCard";

const MyJobsContainer = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const [jobs, setJobs] = useState<JobType[]>([]);

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
    <MyJobsContainerStyled>
      <Container>
        <MyJobWrapper className="mt-10 flex flex-col gap-5">
          {jobs?.map((job: JobType) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}/proposals`}
              className="shadow-md hover:shadow-xl rounded-xl transition-all duration-300 ease-in-out"
            >
              <JobCard isModal={false} {...job} />
            </Link>
          ))}
        </MyJobWrapper>
      </Container>
    </MyJobsContainerStyled>
  );
};

export default MyJobsContainer;
