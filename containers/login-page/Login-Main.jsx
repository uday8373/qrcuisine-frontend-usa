"use client";
import { LogoShort } from "@/components/icons/icons";
import PhoneInput from "@/components/input/Phone-Input";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { siteConfig } from "@/config/site";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";

const LoginMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();
  const [isLogin, setIsLogin] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Formik for Sign-Up form
  const formikSignUp = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string().required("Phone number is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("/api/user/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          const encryptedToken = CryptoJS.AES.encrypt(
            data.userId,
            siteConfig.cryptoSecret
          ).toString();
          localStorage.setItem("userToken", encryptedToken);
          toast.success("Sign-up successful!");
          router.back();
        } else {
          toast.warning(data.error);
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error during sign-up", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Formik for Sign-In form
  const formikSignIn = useFormik({
    initialValues: {
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      mobile: Yup.string().required("Phone number is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await fetch("/api/user/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          const encryptedToken = CryptoJS.AES.encrypt(
            data.userId,
            siteConfig.cryptoSecret
          ).toString();
          localStorage.setItem("userToken", encryptedToken);
          toast.success("Sign-in successful!");
          router.back();
        } else {
          toast.warning(data.error);
        }
      } catch (error) {
        console.error("Error during sign-in", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const switchTab = (login) => {
    setIsLogin(login);

    // Reset forms when switching tabs
    formikSignUp.resetForm();
    formikSignIn.resetForm();
  };

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  return (
    <section
      id="login"
      className="w-full flex flex-col px-6 py-5 items-center bg-primary-300/5 min-h-svh"
    >
      <div className="w-full flex">
        <Button
          onClick={() => {
            router.push("/");
          }}
          isIconOnly
          variant="faded"
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="p-5 bg-primary-500/20 rounded-2xl mt-3 mb-5">
        <LogoShort />
      </div>

      <div className="w-full flex flex-col gap-2">
        <h1 className="text-center text-default-800 font-medium text-2xl">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <h2 className="text-center text-default-500 font-normal text-small">
          {isLogin ? (
            "Hi! Welcome back, you've been missed."
          ) : (
            <>
              Fill your information below or register
              <br />
              your social account.
            </>
          )}
        </h2>
      </div>

      {isLogin ? (
        <form
          onSubmit={formikSignIn.handleSubmit}
          className="flex flex-col w-full mt-6 gap-4"
        >
          <div className="flex gap-1 flex-col h-[90px]">
            <label className="text-medium text-default-700 font-medium">
              Phone Number
            </label>
            <PhoneInput
              name="mobile"
              value={formikSignIn.values.mobile}
              onChange={formikSignIn.handleChange}
              onBlur={formikSignIn.handleBlur}
              isRequired
              isInvalid={formikSignIn.errors.mobile ? true : false}
              errorMessage={formikSignIn.errors.mobile}
            />
          </div>
          <div className="flex gap-1 flex-col h-[90px]">
            <label className="text-medium text-default-700 font-medium">
              Password
            </label>
            <Input
              name="password"
              value={formikSignIn.values.password}
              onChange={formikSignIn.handleChange}
              onBlur={formikSignIn.handleBlur}
              classNames={{ inputWrapper: "h-14" }}
              type={isPasswordVisible ? "text" : "password"}
              variant="faded"
              size="lg"
              placeholder="Enter your password"
              isRequired
              isInvalid={formikSignIn.errors.password ? true : false}
              errorMessage={formikSignIn.errors.password}
              endContent={
                <span
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <Eye className="text-default-500" />
                  ) : (
                    <EyeOff className="text-default-500" />
                  )}
                </span>
              }
            />
          </div>

          {/* <h3 className="text-medium text-primary underline w-full text-right">
            Forget Password?
          </h3> */}

          <Button
            type="submit"
            size="lg"
            color="primary"
            className="mt-3 h-14 font-semibold"
            disabled={formikSignIn.isSubmitting}
            isLoading={formikSignIn.isSubmitting}
            spinner={<Loader size={20} className="animate-spin" />}
          >
            Sign In
          </Button>
        </form>
      ) : (
        <form
          onSubmit={formikSignUp.handleSubmit}
          className="flex flex-col w-full mt-6 gap-4"
        >
          <div className="flex gap-1 flex-col h-[90px]">
            <label className="text-medium text-default-700 font-medium">
              Name
            </label>
            <Input
              name="name"
              value={formikSignUp.values.name}
              onChange={formikSignUp.handleChange}
              onBlur={formikSignUp.handleBlur}
              isRequired
              isInvalid={formikSignUp.errors.name ? true : false}
              errorMessage={formikSignUp.errors.name}
              classNames={{ inputWrapper: "h-14" }}
              type="text"
              variant="faded"
              size="lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex gap-1 flex-col h-[90px]">
            <label className="text-medium text-default-700 font-medium">
              Phone Number
            </label>
            <PhoneInput
              name="mobile"
              value={formikSignUp.values.mobile}
              onChange={formikSignUp.handleChange}
              onBlur={formikSignUp.handleBlur}
              isRequired
              isInvalid={formikSignUp.errors.mobile ? true : false}
              errorMessage={formikSignUp.errors.mobile}
            />
          </div>
          <div className="flex gap-1 flex-col h-[90px]">
            <label className="text-medium text-default-700 font-medium">
              Password
            </label>
            <Input
              name="password"
              value={formikSignUp.values.password}
              onChange={formikSignUp.handleChange}
              onBlur={formikSignUp.handleBlur}
              classNames={{ inputWrapper: "h-14" }}
              labelPlacement="outside"
              type={isPasswordVisible ? "text" : "password"}
              variant="faded"
              size="lg"
              placeholder="Enter your password"
              isRequired
              isInvalid={formikSignUp.errors.password ? true : false}
              errorMessage={formikSignUp.errors.password}
              endContent={
                <span
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <Eye className="text-default-500" />
                  ) : (
                    <EyeOff className="text-default-500" />
                  )}
                </span>
              }
            />
          </div>
          {/* <Checkbox isSelected size="lg">
            <h3 className="text-medium">
              Agree with{" "}
              <span className="text-medium text-primary underline">
                Terms & Condition
              </span>
            </h3>
          </Checkbox> */}
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="mt-3 h-14 font-semibold"
            disabled={formikSignUp.isSubmitting}
            isLoading={formikSignUp.isSubmitting}
            spinner={<Loader size={20} className="animate-spin" />}
          >
            Sign Up
          </Button>
        </form>
      )}

      {isLogin ? (
        <h4 className="mt-5 text-default-600 text-medium select-none">
          {`Don't have an account?`}{" "}
          <span
            onClick={() => {
              switchTab(false);
            }}
            className="text-primary underline cursor-pointer"
          >
            Sign Up
          </span>
        </h4>
      ) : (
        <h4 className="mt-5 text-default-600 text-medium select-none">
          {`Already have an account?`}{" "}
          <span
            onClick={() => {
              switchTab(true);
            }}
            className="text-primary underline cursor-pointer"
          >
            Sign In
          </span>
        </h4>
      )}
    </section>
  );
};

export default LoginMain;
