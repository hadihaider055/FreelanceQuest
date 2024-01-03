import React, { useState } from "react";

// React Hook Form
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import Input from "@/components/FormElements/Input/UncontrolledInput";
import Button from "@/components/common/Button";
import Select from "@/components/FormElements/Select";

// Styled
import { SignupStyled } from "./styled";

// Schema
import signupSchema from "./schema";

// Utils
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { signupThunk, loginThunk } from "@/store/thunks/authThunk";
import { UserRoleEnum } from "@/types/user";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: UserRoleEnum;
};

const SignupContainer = () => {
  const [remember, SetRemember] = useState(false);
  const [role, setRole] = useState("");

  const { push, asPath, pathname, query } = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth.signup);

  const form = useForm<FormValues>({
    resolver: yupResolver(signupSchema),
  });

  const {
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (values: FormValues) => {
    const res = await dispatch(
      signupThunk({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        role: values.role,
      })
    ).unwrap();

    push("/account/profile");
  };

  return (
    <SignupStyled className="w-screen bg-gray-100 login-container h-full overflow-hidden">
      <div className="block lg:flex w-screen h-full">
        {/* Design Section */}
        <section className="relative none hidden lg:block lg:w-1/2 max-h-screen">
          <img
            src="/images/login/cover-image.png"
            alt="Cover Image"
            className="w-full object-cover"
          />
        </section>

        {/* Form Section */}
        <section className="pt-10 px-14 w-full lg:w-1/2 flex flex-col gap-28">
          <header className="flex items-center justify-between flex-col sm:flex-row">
            <div>
              <Link href="/">
                <Image
                  src="/images/login/logo.svg"
                  alt="FreelanceQuest"
                  width={169}
                  height={42}
                />
              </Link>
            </div>

            <div className="font-poppins text-sm font-medium flex items-center gap-1 whitespace-nowrap">
              <p>Already have an account?</p>
              <Link href="/login">
                <p className="text-green-500 hover:underline">Login!</p>
              </Link>
            </div>
          </header>

          <article className="flex flex-col gap-10 items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-2">
              <h1 className="text-3xl font-semibold font-poppins leading-10 text-center">
                Get Started With FreelanceQuest
              </h1>
              <h6 className="text-md font-normal font-poppins leading-7 text-[#7E7E7E]">
                Create an Account to cash your skills
              </h6>
            </div>

            <div className="flex items-center gap-4">
              <button className="w-32 h-11 bg-white rounded border border-neutral-200 hover:border-green-500 hover:shadow-md cursor-pointer flex items-center justify-center gap-3 ease-in-out duration-300 transition-all">
                <span>
                  <GoogleIcon />
                </span>
                <p className="text-black text-xs font-semibold font-poppins leading-10">
                  Google
                </p>
              </button>
              <button className="w-32 h-11 bg-white rounded border border-neutral-200 hover:border-green-500 hover:shadow-md cursor-pointer flex items-center justify-center gap-3 ease-in-out duration-300 transition-all">
                <span>
                  <FacebookIcon />
                </span>
                <p className="text-black text-xs font-semibold font-poppins leading-10">
                  Facebook
                </p>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <hr className="bg-[#dbdbdb] border-none h-[1px] w-[140px]" />
              <p className="text-black text-xs font-medium font-poppins leading-none whitespace-nowrap">
                Or continue with
              </p>
              <hr className="bg-[#dbdbdb] border-none h-[1px] w-[140px]" />
            </div>

            <FormProvider {...form}>
              <form
                className="max-w-[400px] w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex gap-2">
                  <div>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      type="text"
                      required
                      disabled={isLoading}
                      mb={21}
                      error={errors?.firstName?.message}
                    />
                  </div>
                  <div>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      type="text"
                      required
                      disabled={isLoading}
                      mb={21}
                      error={errors?.lastName?.message}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    required
                    disabled={isLoading}
                    mb={21}
                    error={errors?.email?.message}
                  />
                </div>
                <div className="w-full">
                  <Select
                    id="role"
                    options={[
                      {
                        label: "Freelancer",
                        value: UserRoleEnum.FREELANCER,
                      },
                      {
                        label: "Client",
                        value: UserRoleEnum.CLIENT,
                      },
                    ]}
                    initialValue={UserRoleEnum.FREELANCER}
                    disabled={false}
                    required
                    marginBottom={21}
                  />
                </div>
                <div>
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    required
                    mb={21}
                    disabled={isLoading}
                    error={errors?.password?.message}
                  />
                </div>
                <div>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    mb={21}
                    disabled={isLoading}
                    error={errors?.confirmPassword?.message}
                  />
                </div>

                <Button
                  type="submit"
                  size="md"
                  variant="grey-transparent"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  Create Account
                </Button>
              </form>
            </FormProvider>

            <p className="text-zinc-600 text-sm font-light font-poppins">
              By continuing you indicate that you read and agreed to the Terms
              of Use
            </p>
          </article>
        </section>
      </div>
    </SignupStyled>
  );
};

export default SignupContainer;
