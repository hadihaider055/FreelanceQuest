import React from "react";

// Next
import Link from "next/link";

// Moment
import moment from "moment";

// React Icons
import { IoCloseOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { SiStarship } from "react-icons/si";

// Styled
import {
  JobModalBody,
  JobModalFooter,
  JobModalHeader,
  JobModalStyled,
} from "./styled";

// Components
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";

// Types
import { JobType } from "@/types/job";

// Utils
import { getProposalsText } from "@/utils/functions/getProposalsText";
import { convertToSentenceCase } from "@/utils/functions/toSentenceCase";

type JobModalProps = {
  onClose: () => void;
  data: Omit<JobType, "updatedAt" | "posted_by">; // JobType
};

const JobModal: React.FC<JobModalProps> = ({ onClose, data }) => {
  return (
    <Modal onClose={onClose}>
      <JobModalStyled className="flex flex-col gap-5">
        <JobModalHeader className="w-full border-b-[1px] border-stone-300 pb-3">
          {data.featured && (
            <div className="flex items-center gap-2">
              <SiStarship className="text-green-500" />
              <p className="text-green-500 text-[11px] font-inter">Featured</p>
            </div>
          )}
          <div className="w-full flex justify-between">
            <div className="max-w-[600px]">
              <p className="text-stone-400 text-[10px] font-inter mt-3">
                {moment(data.createdAt).startOf("hour").fromNow()}
              </p>
              <h3 className="font-inter text-xl font-semibold text-black">
                {data.title}
              </h3>
              <p className="font-montserrat text-neutral-500 text-[11px]">
                {data.category}
              </p>
            </div>

            <div
              className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-xl"
              onClick={onClose}
            >
              <IoCloseOutline fontSize={28} />
            </div>
          </div>
        </JobModalHeader>

        <JobModalBody>
          <p className="font-poppins text-md text-neutral-500">
            {data.description}
          </p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {data.skills.map((skill: string) => (
              <Tag
                key={skill}
                text={skill}
                bgColor="bg-green-500"
                color="text-white"
                padding="px-3 py-1"
              />
            ))}
          </div>
        </JobModalBody>

        <JobModalFooter className="border-t-[1px] border-stone-300 pt-3 text-stone-500 font-inter text-xs flex justify-between gap-1">
          <div className="flex items-center gap-2 detail-footer">
            <p>
              <span className="font-medium">Proposals: </span>
              {getProposalsText(Number(data.proposalcount))}
            </p>{" "}
            |
            <p>
              <span className="font-medium">
                {convertToSentenceCase(data.type)}:{" "}
              </span>
              ${data.price}
            </p>{" "}
            |{" "}
            <span className="flex items-center gap-1 tracking-tight">
              <SlLocationPin />
              <p>
                {data.address.city}, {data.address.country}
              </p>
            </span>
          </div>

          <div className="button">
            <Link href={`/proposal/submit?job_id=${data.id}`}>
              <Button variant="black">Apply Now</Button>
            </Link>
          </div>
        </JobModalFooter>
      </JobModalStyled>
    </Modal>
  );
};

export default JobModal;
