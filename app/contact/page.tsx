"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: false });
    }
  };

  const handleSendMessage = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim(),
      phone: !formData.phone.trim(),
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.phone || newErrors.message) {
      return;
    }

    // Clear form and show success toast
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    toast.success("Message successfully sent", {
      position: "top-center",
      duration: 3000,
      style: { backgroundColor: "#ffffff", color: "green" },
    });
  };
  return (
    <div className="w-[90%] mx-auto py-10 mb-32">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-16">
        <Link href="/" className="hover:text-black">Home</Link> / <span className="text-black">Contact</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left Side - Contact Info */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-8">
          {/* Call To Us */}
          <div className="bg-white shadow-sm rounded-sm p-8 flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                <BsTelephone className="text-white text-lg" />
              </div>
              <h3 className="font-semibold text-base">Call To Us</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
            </div>
          </div>

          {/* Write To Us */}
          <div className="bg-white shadow-sm rounded-sm p-8 flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#DB4444] flex items-center justify-center">
                <HiOutlineMail className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-base">Write To US</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex-1">
          <div className="bg-white shadow-sm rounded-sm p-8 h-full flex flex-col">
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Name, Email, Phone */}
              <div className="grid grid-cols-3 gap-4">
                <Input 
                  type="text" 
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`bg-gray-100 border-0 ${errors.name ? 'border-2 border-red-500!' : ''}`}
                />
                <Input 
                  type="email" 
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`bg-gray-100 border-0 ${errors.email ? 'border-2 border-red-500!' : ''}`}
                />
                <Input 
                  type="tel" 
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`bg-gray-100 border-0 ${errors.phone ? 'border-2 border-red-500!' : ''}`}
                />
              </div>

              {/* Message */}
              <Textarea 
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={`bg-gray-100 border-0 resize-none flex-1 ${errors.message ? 'border-2 !border-red-500' : ''}`}
              />

              {/* Submit Button */}
              <div className="flex justify-end mt-auto">
                <Button 
                  type="button"
                  onClick={handleSendMessage}
                  className="px-12 cursor-pointer bg-[#DB4444] hover:bg-[#c93939]"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
