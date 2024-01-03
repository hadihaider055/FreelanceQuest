import React, { useState } from "react";

// Next
import { useSession } from "next-auth/react";

// React Hot Toast
import toast, { Toaster } from "react-hot-toast";

// React Hook Form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// React Icons
import { IoMdClose } from "react-icons/io";

// Styled
import { UpdateProfileModalStyled, UpdateProfileModalWrapper } from "./styled";

// Components
import Textarea from "@/components/FormElements/Textarea";
import Modal from "@/components/common/Modal";
import Input from "@/components/FormElements/Input/UncontrolledInput";
import InputControlled from "@/components/FormElements/Input/ControlledInput";
import Button from "@/components/common/Button";

// Schema
import updateProfileSchema from "./schema";
import Select from "@/components/FormElements/Select";

// Site data
import { JobCategoriesData } from "@/site-data/JobCategories";
import { LanguagesData } from "@/site-data/Profile";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { updateUserProfileThunk } from "@/store/thunks/authThunk";

type FormValues = {
  title: string;
  description: string;
  hourlyRate: number;
  category: string;
  languages: string;
};

type UpdateProfileModalProps = {
  onClose?: () => void;
};

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ onClose }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");

  const session = useSession();

  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector((state) => state.auth.updateUserProfile);

  const form = useForm<FormValues>({
    resolver: yupResolver(updateProfileSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = form;

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

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const res = await dispatch(
      updateUserProfileThunk({
        ...values,
        skills,
        languages: [values.languages],
      })
    ).unwrap();

    toast.success(res.message);

    if (res) {
      session.update(
        "user",
        (user) =>
          (user = {
            ...user,
            title: values.title,
            description: values.description,
            hourlyRate: values.hourlyRate,
            category: values.category,
            languages: values.languages,
          })
      );

      return;
    }

    form.reset();
  };
  return (
    <Modal onClose={() => {}}>
      <UpdateProfileModalStyled>
        <Toaster />
        <UpdateProfileModalWrapper className="w-full flex items-center justify-center flex-col">
          <article className="border-b-2 w-full">
            <h1 className="font-poppins text-2xl font-bold text-slate-600 pb-4 pt-2 text-center">
              Update Profile
            </h1>
          </article>

          <FormProvider {...form}>
            <form
              className="mt-10 w-full font-inter"
              onSubmit={handleSubmit(onSubmit)}
            >
              <article>
                <div>
                  <Input
                    id="title"
                    required
                    placeholder="Enter title"
                    mb={24}
                    disabled={isLoading}
                    error={errors.title?.message}
                  />
                </div>

                <div>
                  <Select
                    id="category"
                    required
                    options={JobCategoriesData}
                    disabled={isLoading}
                    error={errors.category?.message}
                  />
                </div>

                <div>
                  <Input
                    id="hourlyRate"
                    required
                    placeholder="Enter Price"
                    mb={24}
                    type="number"
                    disabled={isLoading}
                    error={errors.hourlyRate?.message}
                  />
                </div>

                <div>
                  <Select
                    id="languages"
                    required
                    options={LanguagesData}
                    disabled={false}
                    error={errors.languages?.message}
                  />
                </div>

                <div>
                  <InputControlled
                    id="skill"
                    required
                    placeholder="Enter skill and press enter to add it"
                    mb={24}
                    onKeyDown={handleAddSkills}
                    onChange={(e) =>
                      setSkill((e.target as HTMLInputElement).value)
                    }
                    disabled={isLoading}
                    value={skill}
                  />
                </div>

                <div
                  className={`w-full flex items-center gap-2 mb-5 flex-wrap ${
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

                <div>
                  <Textarea
                    id="description"
                    required
                    placeholder="Enter description"
                    maxLength={5000}
                    error={errors.description?.message}
                    disabled={isLoading}
                  />
                </div>
              </article>

              <article className="border-t-2 pt-5">
                <Button
                  type="submit"
                  variant="grey"
                  size="md"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Update Profile
                </Button>
              </article>
            </form>
          </FormProvider>
        </UpdateProfileModalWrapper>
      </UpdateProfileModalStyled>
    </Modal>
  );
};

export default UpdateProfileModal;
