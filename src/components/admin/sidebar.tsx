"use client";
import Image from "next/image";
import React from "react";
import "../../../styles/admin.css";
import { adminSideBarLinks } from "../../../constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

const SideBar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src={"/icons/admin/logo.svg"}
            alt="logo"
            height={37}
            width={37}
          ></Image>
          <h1>BookWise</h1>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link flex",
                    isSelected && "bg-blue-900 p-2 shadow-sm rounded-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected}?"brightness-0 invert":"object-contain"`}
                    ></Image>
                  </div>
                  <p
                    className={cn(
                      "pl-2 max-sm:hidden",
                      isSelected ? "text-white" : "text-black"
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="user flex">
        <Avatar className="">
          <AvatarFallback className="bg-fuchsia-400">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p>{session?.user?.name}</p>
          <p className="text-sm">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
