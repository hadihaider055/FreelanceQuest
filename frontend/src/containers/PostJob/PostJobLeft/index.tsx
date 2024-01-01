import React from "react";

// React Icons
import { LuClock } from "react-icons/lu";

// React Hook Form
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Styled
import { PostJobLeftStyled } from "./styled";

// Components
import Input from "@/components/FormElements/Input/UncontrolledInput";
import Textarea from "@/components/FormElements/Textarea";
import { DollarTagIcon } from "@/components/icons";
import Select from "@/components/FormElements/Select";
import Button from "@/components/common/Button";

// Schema
import { postJobSchema } from "./schema";

type FormValues = {
  title: string;
  description: string;
  price: number;
  category: string;
  featured: boolean;
  skills: string[];
  type: string;
  duration: number;
};

const PostJobLeft: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: yupResolver(postJobSchema),
  });
  return (
    <PostJobLeftStyled className="w-full">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-semibold font-montserrat leading-10 text-center mb-10">
          Create Job Post
        </h1>
      </div>
      <FormProvider {...form}>
        <form>
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

          <div>
            <Button variant="grey" size="md">
              Post Job
            </Button>
          </div>
        </form>
      </FormProvider>
    </PostJobLeftStyled>
  );
};

export default PostJobLeft;
