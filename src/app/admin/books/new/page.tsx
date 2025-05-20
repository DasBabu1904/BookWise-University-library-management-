import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import BookForm from "../../forms/BookForm";

const page = () => {
  return (
    <>
      <Button asChild className="w-70 mx-auto">
        <Link href={"/admin/books"}>Go Back </Link>
      </Button>

      <section className="w-full max-w-2xl mx-auto">
        <BookForm />
      </section>
    </>
  );
};

export default page;
