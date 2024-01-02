import React, { useState } from "react";

// React Icons
import { LuClock } from "react-icons/lu";
import { IoDiamondOutline } from "react-icons/io5";

// React Hook Form
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Styled
import { PostJobLeftStyled } from "./styled";

// Components
import Input from "@/components/FormElements/Input/UncontrolledInput";
import Textarea from "@/components/FormElements/Textarea";
import { DollarTagIcon } from "@/components/icons";
import Select from "@/components/FormElements/Select";
import Button from "@/components/common/Button";
import CheckboxSwitch from "@/components/FormElements/Switch";

// Schema
import { postJobSchema } from "./schema";

type FormValues = {
  title: string;
  description: string;
  price: string;
  category: string;
  skills: string[];
  type: string;
};

const PostJobLeft: React.FC = () => {
  const [featured, setFeatured] = useState(false);

  const form = useForm<FormValues>({
    resolver: yupResolver(postJobSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);
  };
  return (
    <PostJobLeftStyled className="w-full">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold font-montserrat leading-10 text-center mb-10">
          Create Job Post
        </h1>
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Input
              id="title"
              label="Title"
              required
              placeholder="Enter job title"
              mb={24}
            />
          </div>
          <div>
            <Textarea
              id="description"
              label="Description"
              required
              placeholder="Enter job title"
              maxLength={5000}
            />
          </div>

          <div className="flex w-full justify-between gap-3">
            <article className="w-1/2">
              <h6 className="font-inter text-md mb-2">Type</h6>
              <div className="flex gap-3 flex-col">
                <div className="flex items-center gap-2">
                  <Input id="type" type="radio" name="type" />
                  <span className="font-inter text-sm flex items-center gap-2">
                    Hourly rate
                    <i>
                      <LuClock />
                    </i>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input id="type" type="radio" name="type" />
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
              />
            </article>

            <article className="w-full">
              <Select
                id="category"
                required
                options={[
                  { value: "web-dev", label: "Web Development" },
                  { value: "mobile-dev", label: "Mobile Development" },
                  { value: "design", label: "Design" },
                  { value: "marketing", label: "Marketing" },
                  { value: "sales", label: "Sales" },
                  { value: "customer-support", label: "Customer Support" },
                  { value: "writing", label: "Writing" },
                  { value: "it-networking", label: "IT & Networking" },
                  { value: "accounting", label: "Accounting" },
                  { value: "legal", label: "Legal" },
                ]}
                disabled={false}
                label="Category"
              />
            </article>
          </div>

          <div>
            <Input
              id="skills"
              label="Skills"
              required
              placeholder="Enter skills"
              mb={24}
            />
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
              />
              <span className="font-inter text-sm">
                Feature this job for $16.99
              </span>
            </div>
          </article>

          <div>
            <Button variant="grey" size="md" type="submit">
              Post Job
            </Button>
          </div>
        </form>
      </FormProvider>
    </PostJobLeftStyled>
  );
};

export default PostJobLeft;
