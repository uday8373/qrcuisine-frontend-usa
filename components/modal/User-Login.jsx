import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { ChevronsRight, Eye, EyeOff, Loader, Phone } from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CryptoJS from "crypto-js";
import { siteConfig } from "@/config/site";

export default function UserLoginModal({ isOpen, onOpenChange }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Mobile number must be digits only")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    mobile: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: values.mobile,
          password: values.password,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        const encryptedToken = CryptoJS.AES.encrypt(
          result.userId,
          siteConfig.cryptoSecret
        ).toString();
        localStorage.setItem("userToken", encryptedToken);

        onOpenChange(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Claim Your Reward
            </ModalHeader>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <ModalBody>
                    <Field name="mobile">
                      {({ field }) => (
                        <Input
                          autoFocus
                          {...field}
                          endContent={
                            <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                          }
                          label="Mobile"
                          placeholder="Enter your mobile number"
                          variant="faded"
                          isRequired
                          type="tel"
                          errorMessage={
                            errors.mobile && touched.mobile ? errors.mobile : ""
                          }
                          isInvalid={errors.mobile ? true : false}
                        />
                      )}
                    </Field>

                    <Field name="password">
                      {({ field }) => (
                        <Input
                          {...field}
                          endContent={
                            showPassword ? (
                              <Eye
                                className="text-2xl text-default-400 cursor-pointer"
                                onClick={() => setShowPassword(false)}
                              />
                            ) : (
                              <EyeOff
                                className="text-2xl text-default-400 cursor-pointer"
                                onClick={() => setShowPassword(true)}
                              />
                            )
                          }
                          label="Password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          variant="faded"
                          isRequired
                          isInvalid={errors.password ? true : false}
                          errorMessage={
                            errors.password && touched.password
                              ? errors.password
                              : ""
                          }
                        />
                      )}
                    </Field>
                    <p className="text-sm text-danger">{error}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      spinner={<Loader size={20} className="animate-spin" />}
                      isLoading={loading}
                      endContent={<ChevronsRight size={18} />}
                      fullWidth
                      size="lg"
                      color="primary"
                      type="submit"
                    >
                      Log In
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
