"use client";

import Image from "next/image";
import React, { useState } from "react";
import login from "@/public/register-login.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import {
  Field,
  FieldError,
} from "@/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, registerSchemaType } from "@/schema/register.schema";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: registerSchemaType) {
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((response) => {
        if (response.data.message === "success") {
          toast.success("Account successfully created!", {
            position: "top-center",
            duration: 3000,
            style: { backgroundColor: "#ffffff", color: "green" },
          });
          router.push("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message + "!", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "red" },
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 p-4 md:p-10 gap-8 md:gap-16">
      <div className="image-holder hidden lg:block lg:col-span-4">
        <Image src={login} alt="shopping" />
      </div>
      <div className="col-span-1 lg:col-span-2 py-10 md:py-12 flex flex-col gap-3 justify-center">
        <h1 className="font-semibold text-3xl">Create an account</h1>
        <p className="mb-5">Enter your details below</p>
        <form onSubmit={form.handleSubmit(handleRegister)}>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  data-invalid={fieldState.invalid}
                  placeholder="Name"
                  autoComplete="off"
                  className=" border-gray-400 data-[invalid=true]:border-red-500 data-[invalid=true]:m-0 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                  type="text"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 m-0"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="Email"
                  autoComplete="off"
                  data-invalid={fieldState.invalid}
                  aria-invalid={fieldState.invalid}
                  className="my-5 border-gray-400 data-[invalid=true]:border-red-500 data-[invalid=true]:my-2 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  data-invalid={fieldState.invalid}
                  placeholder="Password"
                  autoComplete="off"
                  className=" border-gray-400 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:mt-2 data-[invalid=true]:focus-visible:ring-red-500"
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  data-invalid={fieldState.invalid}
                  placeholder="Confirm Password"
                  autoComplete="off"
                  className=" border-gray-400 mt-5  data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                  type="password"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500"
                  />
                )}
              </Field>
            )}
          />
          {!isLoading ? (
            <Button
              variant="outline"
              className="bg-red-600/75 border-red-600/75 text-white w-full p-5 my-5 cursor-pointer"
              type="submit"
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant="outline"
              className=" border-red-600/75  px-10 py-5 my-5 cursor-pointer w-full"
              type="submit"
              disabled={true}
            >
              <span className="loader size-6!"></span>
            </Button>
          )}
        </form>
        <Button
          variant="outline"
          className="border-gray-400 w-full text-center p-5 cursor-pointer"
        >
          <FaGoogle />
          Sign Up with Google
        </Button>
        <div className="flex gap-2 text-gray-500 justify-center mt-3 text-[14px]">
          <p>Already have account?</p>
          <Link href={"/login"} className="text-red-600/75 hover:underline">
            Log in
          </Link>
        </div>
        
      </div>
    </div>
  );
}
