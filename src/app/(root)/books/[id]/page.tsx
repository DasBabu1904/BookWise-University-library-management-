import { db } from "@/database/db";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../../../../auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";

const SpecificBook = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await auth();
  const id = (await params).id;
  //Fetch book data
  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);
  if (!bookDetails) redirect("/404");
  console.log(bookDetails);
  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section>
            <h3>Book Summary</h3>
            <div className="space-y-5 text-xl text-gray-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/* TODO: Similar books */}
      </div>
    </>
  );
};

export default SpecificBook;
