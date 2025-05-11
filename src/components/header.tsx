"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"}>
        <Image src={"./icons/logo.svg"} alt="logo" width={40} height={40} />
      </Link>
      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link
            href={"/library"}
            className={
              pathname === "/library" ? "text-gray-950" : "text-gray-500"
            }
          >
            {" "}
            Library
          </Link>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar className="">
              <AvatarFallback className="text-white bg-black">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
