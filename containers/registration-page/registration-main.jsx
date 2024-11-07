"use client";
import { Logo } from "@/components/icons/icons";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import {
  ChartNoAxesCombined,
  Check,
  Loader,
  Minus,
  Pencil,
  Plus,
  Upload,
  UtensilsCrossed,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "@/config/supabase";
import { uploadImageToCloudinary } from "@/utils/uplaodCloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";
import RegisterSuccess from "@/components/modal/Register-Success";

const OPENING_TIME = [
  {
    day: "Sunday",
    is_open: true,
    closing_time: "2024-08-20T17:33:38.211Z",
    opening_time: "2024-08-20T15:33:38.211Z",
  },
  {
    day: "Monday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
  {
    day: "Tuesday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
  {
    day: "Wednesday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
  {
    day: "Thursday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
  {
    day: "Friday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
  {
    day: "Saturday",
    is_open: true,
    closing_time: "2024-08-20 12:33:38.211889+00",
    opening_time: "2024-08-20 12:33:38.211889+00",
  },
];

const DATA = [
  {
    title: "Manage Your Tables",
    description:
      "Automatically assign new reservations to your tables, handle and identify waitlisted customers",
    icon: UtensilsCrossed,
  },
  {
    title: "Automate Your Operations",
    description:
      "Automatically assign new reservations to your tables, handle and identify waitlisted customers",
    icon: Workflow,
  },
  {
    title: "Automate Your Operations",
    description:
      "Automatically assign new reservations to your tables, handle and identify waitlisted customers",
    icon: ChartNoAxesCombined,
  },
];

const RegistrationMain = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const STEPS = [
    { name: "Owner", completed: currentStep > 1 },
    { name: "Restaurant", completed: currentStep > 2 },
    { name: "Upload", completed: currentStep > 3 },
  ];

  const handleLogoChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setFieldValue("logo", file);
    }
  };

  const handleBannerChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setFieldValue("banner", file);
    }
  };

  const step1ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
  });

  const step2ValidationSchema = Yup.object().shape({
    restaurantName: Yup.string().required("Restaurant name is required"),
    restaurantEmail: Yup.string()
      .email("Invalid email")
      .required("Restaurant email is required"),
    restaurantPhone: Yup.string().required(
      "Restaurant phone number is required"
    ),
    restaurantAddress: Yup.string().required("Restaurant address is required"),
    tables: Yup.number()
      .min(1, "Must have at least 1 table")
      .max(99, "Cannot exceed 99 tables")
      .required("Number of tables is required"),
    information: Yup.string().required("Restaurant information is required"),
  });

  //

  const handleNextStepChange = async (values, setTouched) => {
    if (currentStep === 1) {
      try {
        await step1ValidationSchema.validate(
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            address: values.address,
          },
          { abortEarly: false }
        );
        setCurrentStep(2);
      } catch (validationErrors) {
        setTouched({
          name: true,
          email: true,
          phone: true,
          password: true,
          address: true,
        });
      }
    } else if (currentStep === 2) {
      try {
        await step2ValidationSchema.validate(
          {
            restaurantName: values.restaurantName,
            restaurantEmail: values.restaurantEmail,
            restaurantPhone: values.restaurantPhone,
            restaurantAddress: values.restaurantAddress,
            tables: values.tables,
            information: values.information,
            logo: values.logo,
            banner: values.banner,
          },
          { abortEarly: false }
        );
        setCurrentStep(3);
      } catch (validationErrors) {
        setTouched({
          restaurantName: true,
          restaurantEmail: true,
          restaurantPhone: true,
          restaurantAddress: true,
          tables: true,
          information: true,
          logo: true,
          banner: true,
        });
      }
    }
  };

  const handlePrevStepChange = () => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleIncrement = (setFieldValue, values) => {
    if (values.tables < 99) {
      setFieldValue("tables", values.tables + 1);
    }
  };

  const handleDecrement = (setFieldValue, values) => {
    if (values.tables > 1) {
      setFieldValue("tables", values.tables - 1);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    restaurantName: Yup.string().required("Restaurant name is required"),
    restaurantEmail: Yup.string()
      .email("Invalid email")
      .required("Restaurant email is required"),
    restaurantPhone: Yup.string().required(
      "Restaurant phone number is required"
    ),
    restaurantAddress: Yup.string().required("Restaurant address is required"),
    tables: Yup.number()
      .min(1, "Must have at least 1 table")
      .max(99, "Cannot exceed 99 tables")
      .required("Number of tables is required"),
    information: Yup.string().required("Restaurant information is required"),
    logo: Yup.mixed().required("Logo is required"),
    banner: Yup.mixed().required("Banner is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    restaurantName: "",
    restaurantEmail: "",
    restaurantPhone: "",
    restaurantAddress: "",
    tables: 1,
    licensed: false,
    information: "",
    logo: null,
    banner: null,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          phone: values.phone,
          display_name: values.name,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        const resultFinal = await insertRestaurant(values, result.id);
        if (resultFinal) {
          setCurrentStep(1);
          setBannerPreview("");
          setLogoPreview("");
          resetForm();
          onOpen();
        }
      } else {
        if (result.error.code === "user_already_exists") {
          toast.warning(
            <div className="w-full pl-1">
              <h4 className="text-warning-500 font-semibold">
                Email already exist!
              </h4>
              <h4>Please use a different email.</h4>
            </div>
          );
          return;
        }
        toast.error("Something went wrong!");
        return;
      }
    } catch (error) {
      toast.error("Something went wrong!");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const insertRestaurant = async (values, id) => {
    const uniqueSlugName = slugify(values.restaurantName, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
    const logo = await uploadImageToCloudinary(values.logo);
    const banner = await uploadImageToCloudinary(values.banner);
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .insert([
          {
            owner_name: values.name,
            owner_email: values.email,
            owner_mobile: values.phone,
            owner_address: values.address,
            restaurant_name: values.restaurantName,
            admin_id: id,
            restaurant_information: values.information,
            restaurant_email: values.restaurantEmail,
            restaurant_mobile: values.restaurantPhone,
            restaurant_address: values.restaurantAddress,
            total_tables: values.tables,
            is_verified: false,
            is_subcription: false,
            licenced: values.licensed,
            is_open: true,
            opening_times: OPENING_TIME,
            unique_name: uniqueSlugName,
            logo: logo,
            background_image: banner,
          },
        ])
        .select("id");
      if (error) {
        toast.error("Something went wrong!");
        return;
      }
      if (data) {
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <section
      id="bookdemo_hero_section"
      className="flex items-center justify-center w-full min-h-screen relative overflow-hidden"
    >
      <ToastContainer draggable stacked />
      <div className="w-full h-full flex absolute top-0">
        <div className="w-1/2 h-full md:flex bg-primary-200 hidden" />
        <div className="md:w-1/2 h-full flex bg-primary/5 w-full" />
      </div>
      <div className="w-full h-full flex md:flex-row flex-col-reverse max-w-screen-xl  z-10 ">
        <div className="md:fixed flex xl:w-[580px] md:pl-6 px-6 md:w-[48%] w-full h-screen justify-center flex-col pr-5 xl:gap-16 gap-12 md:bg-transparent bg-primary-200">
          <Logo size={175} className="-mt-10" />
          {DATA.map((item, index) => (
            <div key={index} className="flex gap-5 items-center">
              <div className="flex xl:p-5 p-4 rounded-medium bg-primary">
                <item.icon size={36} className="text-white text-xs" />
              </div>
              <div className="w-full flex flex-col gap-1">
                <h3 className="xl:text-2xl text-xl font-medium">
                  {item.title}
                </h3>
                <h3 className="xl:text-large text-small font-normal text-default-600 leading-6">
                  {item.description}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="xl:w-[45%] md:pr-6 px-6 md:w-[48%] w-full h-full flex flex-col justify-center gap-8 ml-auto py-10">
          <div className="flex items-center justify-center gap-6">
            {STEPS.map((step, index) => {
              const isActive = currentStep === index + 1;
              const isCompleted = currentStep > index + 1;

              return (
                <React.Fragment key={index}>
                  <div className="flex items-center w-full justify-center">
                    <div className="flex flex-col w-fit justify-center items-center gap-1">
                      <div
                        className={`${
                          isCompleted
                            ? "bg-primary-500 text-white"
                            : isActive
                            ? "border-primary-500 text-primary-500"
                            : "border-gray-400 text-gray-400"
                        } flex items-center justify-center font-semibold w-8 h-8 border-2 rounded-full`}
                      >
                        {isCompleted ? <Check size={20} /> : index + 1}
                      </div>
                      <span
                        className={`font-medium ${
                          isCompleted || isActive
                            ? "text-primary-500"
                            : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <span
                      className={`w-full h-[2px] rounded-full ${
                        isCompleted ? "bg-primary-500" : "bg-gray-400"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
              setTouched,
            }) => {
              return (
                <Form className="w-full flex flex-col gap-5">
                  {currentStep === 1 && (
                    <>
                      <h4 className="text-2xl font-medium">
                        Provide Owner Information
                      </h4>
                      <Field name="name">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="text"
                            label="Name"
                            isInvalid={touched.name && errors.name}
                            errorMessage={touched.name && errors.name}
                          />
                        )}
                      </Field>

                      <Field name="phone">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="tel"
                            label="Contact Number"
                            isInvalid={touched.phone && errors.phone}
                            errorMessage={touched.phone && errors.phone}
                          />
                        )}
                      </Field>

                      <Field name="address">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="text"
                            label="Address"
                            isInvalid={touched.address && errors.address}
                            errorMessage={touched.address && errors.address}
                          />
                        )}
                      </Field>
                      <Field name="email">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="email"
                            label="Email Address"
                            isInvalid={touched.email && errors.email}
                            errorMessage={touched.email && errors.email}
                          />
                        )}
                      </Field>
                      <Field name="password">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="password"
                            label="Password"
                            isInvalid={touched.password && errors.password}
                            errorMessage={touched.password && errors.password}
                          />
                        )}
                      </Field>
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <h4 className="text-2xl font-medium">
                        Provide Restaurant Information
                      </h4>
                      <Field name="restaurantName">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="text"
                            label="Restaurant Name"
                            isInvalid={
                              touched.restaurantName && errors.restaurantName
                            }
                            errorMessage={
                              touched.restaurantName && errors.restaurantName
                            }
                          />
                        )}
                      </Field>
                      <div className="w-full flex gap-4 lg:flex-row flex-col">
                        <Field name="restaurantEmail">
                          {({ field }) => (
                            <Input
                              {...field}
                              variant="faded"
                              type="email"
                              label="Restaurant Email Address"
                              isInvalid={
                                touched.restaurantEmail &&
                                errors.restaurantEmail
                              }
                              errorMessage={
                                touched.restaurantEmail &&
                                errors.restaurantEmail
                              }
                            />
                          )}
                        </Field>
                        <Field name="restaurantPhone">
                          {({ field }) => (
                            <Input
                              {...field}
                              variant="faded"
                              type="tel"
                              label="Restaurant Contact Number"
                              isInvalid={
                                touched.restaurantPhone &&
                                errors.restaurantPhone
                              }
                              errorMessage={
                                touched.restaurantPhone &&
                                errors.restaurantPhone
                              }
                            />
                          )}
                        </Field>
                      </div>
                      <Field name="restaurantAddress">
                        {({ field }) => (
                          <Input
                            {...field}
                            variant="faded"
                            type="text"
                            label="Restaurant Address"
                            isInvalid={
                              touched.restaurantAddress &&
                              errors.restaurantAddress
                            }
                            errorMessage={
                              touched.restaurantAddress &&
                              errors.restaurantAddress
                            }
                          />
                        )}
                      </Field>
                      <div className="w-full flex gap-4 justify-between lg:flex-row flex-col">
                        <div className="flex gap-2 items-center">
                          <h3>Total Tables</h3>
                          <Button
                            isDisabled={values.tables === 1}
                            onClick={() =>
                              handleDecrement(setFieldValue, values)
                            }
                            size="sm"
                            variant="flat"
                            isIconOnly
                          >
                            <Minus size={18} />
                          </Button>
                          <Field name="tables">
                            {({ field }) => (
                              <Input
                                {...field}
                                size="sm"
                                variant="faded"
                                type="number"
                                className="w-16"
                                min="1"
                                max="99"
                                value={values.tables}
                                onChange={(e) =>
                                  setFieldValue(
                                    "tables",
                                    Number(e.target.value)
                                  )
                                }
                                isInvalid={touched.tables && errors.tables}
                              />
                            )}
                          </Field>
                          <Button
                            isDisabled={values.tables === 99}
                            onClick={() =>
                              handleIncrement(setFieldValue, values)
                            }
                            size="sm"
                            variant="flat"
                            isIconOnly
                          >
                            <Plus size={18} />
                          </Button>
                        </div>
                        <Field name="licensed">
                          {({ field }) => (
                            <Checkbox {...field} size="lg">
                              fssai licence
                            </Checkbox>
                          )}
                        </Field>
                      </div>
                      <Field name="information">
                        {({ field }) => (
                          <Textarea
                            {...field}
                            variant="faded"
                            rows={5}
                            label="Restaurant Information"
                            className="w-full"
                            isInvalid={
                              touched.information && errors.information
                            }
                            errorMessage={
                              touched.information && errors.information
                            }
                          />
                        )}
                      </Field>
                    </>
                  )}

                  {currentStep === 3 && (
                    <>
                      <h4 className="text-2xl font-medium">
                        Upload Your Restaurant Logo And Banner
                      </h4>
                      <div className="w-full flex flex-col justify-center items-center gap-5">
                        <input
                          id="logo"
                          name="logo"
                          type="file"
                          onChange={(e) => handleLogoChange(e, setFieldValue)}
                          className="hidden"
                        />
                        {!logoPreview ? (
                          <label
                            htmlFor="logo"
                            className="cursor-pointer flex justify-center flex-col items-center w-40 h-40 rounded-large bg-default-100 border-2 gap-3 border-dashed border-default-300"
                          >
                            <Upload size={20} className="text-default-600" />
                            <h4 className="text-sm text-default-600">
                              Upload Logo
                            </h4>
                          </label>
                        ) : (
                          <div className="w-40 h-40 flex relative rounded-large">
                            <Image
                              src={logoPreview}
                              alt="Logo preview"
                              width={520}
                              height={520}
                              className="aspect-square rounded-large object-cover w-40 h-auto"
                            />
                            <Button
                              isIconOnly
                              size="sm"
                              color="primary"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                document.getElementById("logo").click()
                              }
                            >
                              <Pencil size={18} />
                            </Button>
                          </div>
                        )}
                        {touched.logo && errors.logo && (
                          <div className="text-red-500 text-sm">
                            {errors.logo}
                          </div>
                        )}
                      </div>
                      <div className="w-full flex flex-col justify-center items-center gap-5">
                        <input
                          id="banner"
                          name="banner"
                          type="file"
                          onChange={(e) => handleBannerChange(e, setFieldValue)}
                          className="hidden"
                        />
                        {!bannerPreview ? (
                          <label
                            htmlFor="banner"
                            className="cursor-pointer flex justify-center flex-col items-center w-full h-40 rounded-large bg-default-100 border-2 gap-3 border-dashed border-default-300"
                          >
                            <Upload size={20} className="text-default-600" />
                            <h4 className="text-sm text-default-600">
                              Upload a Banner
                            </h4>
                          </label>
                        ) : (
                          <div className="w-full h-40 flex relative rounded-large">
                            <Image
                              src={bannerPreview}
                              alt="Banner preview"
                              width={520}
                              height={520}
                              className="aspect-square rounded-large object-cover w-full h-auto"
                            />
                            <Button
                              isIconOnly
                              size="sm"
                              color="primary"
                              className="absolute top-2 right-2"
                              onClick={() =>
                                document.getElementById("banner").click()
                              }
                            >
                              <Pencil size={18} />
                            </Button>
                          </div>
                        )}
                        {touched.banner && errors.banner && (
                          <div className="text-red-500 text-sm">
                            {errors.banner}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="w-full flex justify-between mt-6">
                    <Button
                      isDisabled={currentStep === 1}
                      size="lg"
                      className="w-fit self-start"
                      color="default"
                      onClick={handlePrevStepChange}
                      type="button"
                    >
                      Prev
                    </Button>
                    {currentStep !== 3 && (
                      <Button
                        onClick={() =>
                          handleNextStepChange(
                            values,
                            setTouched,
                            validationSchema
                          )
                        }
                        size="lg"
                        className="w-fit self-end"
                        color="primary"
                        type="button"
                      >
                        Next
                      </Button>
                    )}
                    {currentStep === 3 && (
                      <Button
                        spinner={<Loader size={20} className="animate-spin" />}
                        size="lg"
                        className="w-fit self-end"
                        color="primary"
                        type="submit"
                        isLoading={isSubmitting}
                      >
                        Submit Now
                      </Button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <RegisterSuccess isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default RegistrationMain;
