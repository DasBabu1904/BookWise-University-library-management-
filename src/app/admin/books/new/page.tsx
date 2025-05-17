import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <Button asChild className="">
        <Link href={"/admin/books"}>Go Back </Link>
      </Button>

      <section></section>
    </>
  );
};

export default page;
