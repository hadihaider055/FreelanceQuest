import React from "react";

// Next
import { useRouter } from "next/router";

// React Icons
import { SlLocationPin } from "react-icons/sl";
import { SiStarship } from "react-icons/si";

// Moment
import moment from "moment";

// Components
import Tag from "../Tag";
import JobModal from "@/containers/Modals/JobModal";

// Styled
import { JobCardStyled } from "./styled";

// Utils
import { convertToSentenceCase } from "@/utils/functions/toSentenceCase";
import { getProposalsText } from "@/utils/functions/getProposalsText";

// Types
import { JobType, JobTypeStatusEnum } from "@/types/job";

type JobCardProps = JobType & {
  isModal?: boolean;
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  category,
  price,
  proposalcount,
  createdAt,
  skills,
  id,
  type,
  address,
  featured,
  isModal = true,
}) => {
  const { query, push } = useRouter();

  const handleCloseModal = () => {
    delete query.id;

    push(
      {
        query,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleOpenModal = () => {
    if (!isModal) return;
    push(
      {
        query: { ...query, id },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  return (
    <>
      {query.id === id && (
        <JobModal
          onClose={handleCloseModal}
          data={{
            title,
            description,
            category,
            price,
            proposalcount,
            createdAt,
            skills,
            id,
            type,
            address,
            featured,
          }}
        />
      )}
      <JobCardStyled
        className="bg-white rounded-[10px] p-7 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex flex-col">
          {featured && (
            <div className="flex items-center gap-2">
              <SiStarship className="text-green-500" />
              <p className="text-green-500 text-[11px] font-inter">Featured</p>
            </div>
          )}
          <p className="text-neutral-500 text-xs font-inter mt-3">
            {moment(createdAt).startOf("hour").fromNow()}
          </p>
          <h3 className="text-black font-medium font-inter text-xl my-1">
            {title}
          </h3>
          <div className="flex items-center">
            <span className="text-neutral-400 text-[11px] font-inter font-medium flex items-center">
              {convertToSentenceCase(
                type === JobTypeStatusEnum.FIXED_PRICE ? "Fixed price" : type
              )}
              : ${price} - {category},{" "}
              <span className="flex items-center ml-1">
                <SlLocationPin />
                <span className="ml-[1px]">{address?.country}</span>
              </span>
            </span>
          </div>
          <p className="text-black text-base font-normal font-inter mt-3">
            {description}
          </p>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 flex-wrap">
            {skills.length &&
              skills?.map((skill, i) => (
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
    </>
  );
};

export default JobCard;
