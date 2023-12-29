import React from "react";

// Moment
import moment from "moment";

// Components
import Tag from "../Tag";

// Styled
import { JobCardStyled } from "./styled";

// Utils
import { getProposalsText } from "@/utils/functions/getProposalsText";
import Link from "next/link";

// Types
import { JobType } from "@/types/job";
import { convertToSentenceCase } from "@/utils/functions/toSentenceCase";

type JobCardProps = JobType;

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  category,
  price,
  proposalcount,
  createdAt,
  skills,
}) => {
  return (
    <Link href="/">
      <JobCardStyled className="bg-white rounded-[10px] p-7">
        <div className="flex flex-col">
          <p className="text-neutral-500 text-xs font-inter mt-3">
            {moment(createdAt).startOf("hour").fromNow()}
          </p>
          <h3 className="text-black font-medium font-inter text-xl my-1">
            {title}
          </h3>
          <div className="flex items-center">
            <span className="text-neutral-400 text-xs font-inter font-medium">
              {convertToSentenceCase(category)} - ${price}
            </span>
          </div>
          <p className="text-black text-base font-normal font-inter mt-3">
            {description}
          </p>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3">
            {skills?.map((skill, i) => (
              <Tag
                key={i}
                text={skill}
                bgColor="bg-stone-200"
                color="text-black"
                padding="px-3 py-2"
                rounded="rounded-[16px]"
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm font-normal font-poppins mt-3">
            <span className="font-semibold">Proposals: </span>{" "}
            {getProposalsText(Number(proposalcount))}
          </p>
        </div>
      </JobCardStyled>
    </Link>
  );
};

export default JobCard;
