import React, { useState } from "react";

// React Hot Toast
import toast, { Toaster } from "react-hot-toast";

// React Icons
import { LuClock } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

// React Hook Form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Styled
import { PostJobLeftStyled } from "./styled";

// Components
import Input from "@/components/FormElements/Input/UncontrolledInput";
import InputControlled from "@/components/FormElements/Input/ControlledInput";
import Textarea from "@/components/FormElements/Textarea";
import { DollarTagIcon } from "@/components/icons";
import Select from "@/components/FormElements/Select";
import Button from "@/components/common/Button";
import CheckboxSwitch from "@/components/FormElements/Switch";

// Schema
import { postJobSchema } from "./schema";

// Site data
import { JobCategoriesData } from "@/site-data/JobCategories";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { createJobThunk } from "@/store/thunks/jobThunk";
import { JobTypeStatusEnum } from "@/types/job";
import { useRouter } from "next/router";

type FormValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  type: string;
};

const PostJobLeft: React.FC = () => {
  const [featured, setFeatured] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");

  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.job.createJob);

  const form = useForm<FormValues>({
    resolver: yupResolver(postJobSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const res = await dispatch(
      createJobThunk({ ...values, featured, skills })
    ).unwrap();

    toast.success(res.message);

    setSkills([])

    form.reset();
  };
  const handleAddSkills = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === ",") {
      e.preventDefault();

      const inputValue = (e.target as HTMLInputElement).value.trim();

      if (inputValue === "") return;

      if (skills.length >= 30) return;
      if (skills.includes(inputValue)) return;

      setSkills((prev) => [...prev, inputValue]);
      setSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <PostJobLeftStyled className="w-full">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold font-montserrat leading-10 text-center mb-10">
          Create Job Post
        </h1>
      </div>
      <Toaster />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Input
              id="title"
              label="Title"
              required
              placeholder="Enter job title"
              mb={24}
              disabled={isLoading}
            />
          </div>
          <div>
            <Textarea
              id="description"
              label="Description"
              required
              placeholder="Enter job description"
              maxLength={5000}
            />
          </div>

          <div className="flex w-full justify-between gap-3">
            <article className="w-1/2">
              <h6 className="font-inter text-md mb-2">Type</h6>
              <div className="flex gap-3 flex-col">
                <div className="flex items-center gap-2">
                  <Input
                    id="type"
                    type="radio"
                    name="type"
                    value={JobTypeStatusEnum.HOURLY}
                    disabled={isLoading}
                  />
                  <span className="font-inter text-sm flex items-center gap-2">
                    Hourly rate
                    <i>
                      <LuClock />
                    </i>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    id="type"
                    type="radio"
                    name="type"
                    value={JobTypeStatusEnum.FIXED_PRICE}
                    disabled={isLoading}
                  />
                  <span className="font-inter text-sm flex items-center gap-2">
                    Fixed price
                    <i className="w-3">
                      <DollarTagIcon width={22} />
                    </i>
                  </span>
                </div>
              </div>
            </article>

            <article className="w-full">
              <Input
                id="price"
                label="Price"
                required
                placeholder="Enter Price"
                mb={24}
                type="number"
                disabled={isLoading}
              />
            </article>

            <article className="w-full">
              <Select
                id="category"
                required
                options={JobCategoriesData}
                disabled={false}
                label="Category"
              />
            </article>
          </div>

          <div>
            <InputControlled
              id="skill"
              label="Skill"
              required
              placeholder="Enter skill and press enter to add it"
              mb={24}
              onKeyDown={handleAddSkills}
              onChange={(e) => setSkill((e.target as HTMLInputElement).value)}
              value={skill}
            />
          </div>

          <div
            className={`w-full flex items-center gap-2 flex-wrap ${
              skills.length ? "block" : "hidden"
            }`}
          >
            {skills.map((skill, id) => (
              <div key={id} className="relative">
                <span className="bg-green-500 text-white font-inter text-sm py-1 px-4 rounded-full flex items-center gap-1">
                  {skill}
                </span>
                <span
                  className="cursor-pointer text-gray-900 absolute -top-1 -right-1 bg-stone-300 rounded-full p-[2px]"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  <IoMdClose fontSize={13} />
                </span>
              </div>
            ))}
          </div>

          <article className="flex flex-col gap-3 my-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className="text-[#384D6C]">
                  <IoDiamondOutline />
                </span>
                <p className="font-inter text-[#384D6C] text-md">
                  Boost your jobs visibility
                </p>
              </div>
              <p className="font-inter text-sm">
                We&apos;ll feature your job and promote it to top talent on the
                platform.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <CheckboxSwitch
                id="featured"
                checked={featured}
                checkedChanged={() => setFeatured(!featured)}
                disabled={isLoading}
              />
              <span className="font-inter text-sm">
                Feature this job for $16.99
              </span>
            </div>
          </article>

          <div>
            <Button
              variant="grey"
              size="md"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
            >
              Post Job
            </Button>
          </div>
        </form>
      </FormProvider>
    </PostJobLeftStyled>
  );
};

export default PostJobLeft;
