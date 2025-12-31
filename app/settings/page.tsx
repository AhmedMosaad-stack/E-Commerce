"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePassSchema,
  changePassSchemaType,
} from "@/schema/changePass.schema";
import changePass from "@/lib/services/changePass";
import { Field, FieldError } from "@/components/ui/field";
import { toast } from "sonner";
import {
  changeUserDataSchema,
  changeUserDataSchemaType,
} from "@/schema/changeUserData.schema";
import changeUserData from "@/lib/services/changeUserData";
import ScrollAnimation from "../_components/ScrollAnimation";

export default function Settings() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [activeSection, setActiveSection] = useState<"profile" | "password">("profile");
  
  const form = useForm<changePassSchemaType>({
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(changePassSchema),
  });

  const userDataForm = useForm<changeUserDataSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
    mode: "onBlur",
    resolver: zodResolver(changeUserDataSchema),
  });

  async function handleChangeUserData(values: changeUserDataSchemaType) {
    setIsLoadingUserData(true);
    try {
      const res = await changeUserData(values);
      if (res.message === "success") {
        toast.success("Profile updated successfully! Logging out...", {
          position: "top-center",
          duration: 2000,
          style: { backgroundColor: "#ffffff", color: "green" },
        });
        userDataForm.reset();

        // Logout after 2 seconds
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);
      } else {
        toast.error(res.message || "Failed to update profile!", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "red" },
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    } finally {
      setIsLoadingUserData(false);
    }
  }
  async function handleChangePassword(values: changePassSchemaType) {
    setIsLoading(true);
    try {
      const res = await changePass(values);
      if (res.message === "success") {
        toast.success("Password changed successfully! Logging out...", {
          position: "top-center",
          duration: 2000,
          style: { backgroundColor: "#ffffff", color: "green" },
        });
        form.reset();

        // Logout after 2 seconds
        setTimeout(() => {
          signOut({ callbackUrl: "/login" });
        }, 2000);
      } else {

        toast.error(res.errors.msg || "Failed to change password!", {
          position: "top-center",
          duration: 3000,
          style: { backgroundColor: "#ffffff", color: "red" },
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-[90%] mx-auto py-10 pb-20 mb-16">
      <ScrollAnimation />
      {/* Breadcrumb and Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-16">
        <div className="text-sm text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>{" "}
          / My Account
        </div>
        <div className="text-sm">
          Welcome!{" "}
          <span className="text-[#DB4444]">
            {session?.user?.name || "User"}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="scroll-section flex flex-col lg:flex-row gap-8 lg:gap-20">
        {/* Left Sidebar */}
        <div className="w-full lg:w-56 shrink-0">
          <div className="space-y-6">
            {/* Manage My Account */}
            <div>
              <h3 className="font-semibold text-base mb-3">
                Manage My Account
              </h3>
              <div className="ml-8 space-y-2">
                <div
                  className={`text-sm cursor-pointer ${
                    activeSection === "profile"
                      ? "text-[#DB4444]"
                      : "text-gray-600 hover:text-[#DB4444]"
                  }`}
                  onClick={() => setActiveSection("profile")}
                >
                  My Profile
                </div>
                <div
                  className={`text-sm cursor-pointer ${
                    activeSection === "password"
                      ? "text-[#DB4444]"
                      : "text-gray-600 hover:text-[#DB4444]"
                  }`}
                  onClick={() => setActiveSection("password")}
                >
                  Password Options
                </div>
                <div className="text-gray-600 text-sm cursor-pointer hover:text-[#DB4444]">
                  My Payment Options
                </div>
              </div>
            </div>

            {/* My Orders */}
            <div>
              <h3 className="font-semibold text-base mb-3">My Orders</h3>
              <div className="ml-8 space-y-2">
                <Link
                  href="/allorders"
                  className="block text-gray-600 text-sm cursor-pointer hover:text-[#DB4444]"
                >
                  My Returns
                </Link>
                <div className="text-gray-600 text-sm cursor-pointer hover:text-[#DB4444]">
                  My Cancellations
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <div className="bg-white rounded-sm shadow-sm p-8">
            {activeSection === "profile" && (
              <>
                <h2 className="text-[#DB4444] text-xl font-medium mb-6">
                  My Profile
                </h2>

                {/* User Data Form */}
                <form
                  className="space-y-6"
                  onSubmit={userDataForm.handleSubmit(handleChangeUserData)}
                >
                  <Controller
                    name="name"
                    control={userDataForm.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Label className="block text-sm mb-2">Name</Label>
                        <Input
                          {...field}
                          id={field.name}
                          type="text"
                          placeholder="Enter your name"
                          autoComplete="off"
                          data-invalid={fieldState.invalid}
                          aria-invalid={fieldState.invalid}
                          className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500 text-xs mt-1"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <Controller
                      name="email"
                      control={userDataForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="block text-sm mb-2">Email</Label>
                          <Input
                            {...field}
                            id={field.name}
                            type="email"
                            placeholder="example@email.com"
                            autoComplete="off"
                            data-invalid={fieldState.invalid}
                            aria-invalid={fieldState.invalid}
                            className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                          />
                          {fieldState.invalid && (
                            <FieldError
                              errors={[fieldState.error]}
                              className="text-red-500 text-xs mt-1"
                            />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="phone"
                      control={userDataForm.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="block text-sm mb-2">
                            Phone Number
                          </Label>
                          <Input
                            {...field}
                            id={field.name}
                            type="tel"
                            placeholder="01012345678"
                            autoComplete="off"
                            data-invalid={fieldState.invalid}
                            aria-invalid={fieldState.invalid}
                            className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                          />
                          {fieldState.invalid && (
                            <FieldError
                              errors={[fieldState.error]}
                              className="text-red-500 text-xs mt-1"
                            />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-6 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-8"
                      onClick={() => userDataForm.reset()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoadingUserData}
                      className="px-10 bg-[#DB4444] hover:bg-[#c93939] disabled:opacity-50"
                    >
                      {isLoadingUserData ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </>
            )}

            {activeSection === "password" && (
              <>
                <h2 className="text-[#DB4444] text-xl font-medium mb-6">
                  Password Options
                </h2>

                {/* Password Changes Form */}
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(handleChangePassword)}
                >
                  <Controller
                    name="currentPassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Label className="block text-sm mb-2">
                          Current Password
                        </Label>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="Current Password"
                          autoComplete="off"
                          data-invalid={fieldState.invalid}
                          aria-invalid={fieldState.invalid}
                          className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500 text-xs mt-1"
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
                        <Label className="block text-sm mb-2">
                          New Password
                        </Label>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="New Password"
                          autoComplete="off"
                          data-invalid={fieldState.invalid}
                          aria-invalid={fieldState.invalid}
                          className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500 text-xs mt-1"
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
                        <Label className="block text-sm mb-2">
                          Confirm New Password
                        </Label>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="Confirm New Password"
                          autoComplete="off"
                          data-invalid={fieldState.invalid}
                          aria-invalid={fieldState.invalid}
                          className="bg-gray-100 border-0 data-[invalid=true]:border-red-500 data-[invalid=true]:border-2 data-[invalid=true]:focus-visible:ring-red-500"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="text-red-500 text-xs mt-1"
                          />
                        )}
                      </Field>
                    )}
                  />

                  <div className="flex justify-end gap-6 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="px-8"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-10 bg-red-600/75 hover:bg-red-700 cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
