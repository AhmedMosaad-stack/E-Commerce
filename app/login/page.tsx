"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import login from "@/public/register-login.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Field, FieldError } from "@/components/ui/field";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, loginSchemaType } from "@/schema/login.schema";

import { signIn } from "next-auth/react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: loginSchemaType) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      setIsLoading(false);
      toast.success("Successfully logged in!", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "green" },
      });
      window.location.href = "/";
    } else {
      setIsLoading(false);
      toast.error(response?.error + "!", {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    }
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 p-4 md:p-10 gap-8 md:gap-16">
      <div className="image-holder hidden lg:block lg:col-span-4">
        <Image src={login} alt="shopping" />
      </div>
      <div className="col-span-1 lg:col-span-2 py-10 md:py-12 flex flex-col gap-3 justify-center">
        <h1 className="font-semibold text-3xl">Log in to Exclusive</h1>
        <p className="mb-2">Enter your details below</p>
        <form onSubmit={form.handleSubmit(handleLogin)}>
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

          <div className="flex justify-between items-center">
            {!isLoading ? (
              <Button
                variant="outline"
                className="bg-red-600/75 border-red-600/75 text-white  px-12 py-4 my-5 cursor-pointer"
                type="submit"
              >
                Login
              </Button>
            ) : (
              <Button
                variant="outline"
                className=" border-red-600/75  px-10 py-5 my-5 cursor-pointer"
                type="submit"
                disabled={true}
              >
                <span className="loader size-6!"></span>
              </Button>
            )}
            <p className="text-[13px]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-red-600/75 hover:underline">
                Sign up now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
