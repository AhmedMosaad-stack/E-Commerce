"use client";
import React from "react";
import google from "@/public/GooglePlay.png";
import apple from "@/public/AppStore.png";
import qrcode from "@/public/QrCode.jpg";
import Image from "next/image";
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="bg-zinc-950 text-gray-100">
      <div className="mx-auto w-[90%] p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Exclusive</h3>
          <h4 className="text-[17px]">Subscribe</h4>
          <p className="text-sm">Get 10% off your first order</p>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Support</h3>
          <p className="text-[13px]">
            111 Bijoy sarani, Dhaka,
            <br /> DH 1515, Bangladesh.
          </p>
          <p className="text-[13px]">exclusive@gmail.com</p>
          <p className="text-[13px]">+88015-88888-9999</p>
        </div>

        <ul className="text-xl font-semibold flex flex-col gap-3">
          Account
          {session && (
            <li className="text-[13px] cursor-pointer hover:underline">
              <Link href="/settings">My Account</Link>
            </li>
          )}
          {!session && (
            <>
              <li className="text-[13px] cursor-pointer hover:underline">
                <Link href="/login">Login</Link>
              </li>
              <li className="text-[13px] cursor-pointer hover:underline">
                <Link href="/signup">Register</Link>
              </li>
            </>
          )}
          {session && (
            <>
              <li className="text-[13px] cursor-pointer hover:underline">
                <Link href="/cart">Cart</Link>
              </li>
              <li className="text-[13px] cursor-pointer hover:underline">
                Wishlist
              </li>
            </>
          )}
          <li className="text-[13px] cursor-pointer hover:underline">
            <Link href="/">Shop</Link>
          </li>
        </ul>

        <ul className="text-xl font-semibold flex flex-col gap-3">
          Quick Link
          <li className="text-[13px] cursor-pointer hover:underline">
            Privacy Policy
          </li>
          <li className="text-[13px] cursor-pointer hover:underline">
           Terms Of Use
          </li>
          <li className="text-[13px] cursor-pointer hover:underline">
            <Link href="/about">FAQ</Link>
          </li>
          <li className="text-[13px] cursor-pointer hover:underline">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Download App</h3>
          <div className="flex flex-col">
            <p className="text-[11px] text-gray-400 font-semibold">
              Save $3 with App New User Only
            </p>
            <div className="image-holder md:flex gap-3 mt-3">
              <Image src={qrcode} alt="Qrcode" className="size-18" />
              <div className="stores flex flex-col gap-3 size-30">
                <Image src={google} alt="googleplay" />
                <Image src={apple} alt="Appstore" />
              </div>
            </div>
            <div className="icons flex gap-6 text-xl">
              <RiFacebookLine />
              <CiTwitter />
              <IoLogoInstagram />
              <RiLinkedinLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
