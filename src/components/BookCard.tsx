import Link from "next/link";
import React from "react";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genere,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "flex flex-col items-center")}>
      <Link href={`/books/${id}`}>
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
        <div className={cn("mt-4", !isLoanedBook && "sm:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genere}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3">
            <div className="book-loaned justify-items-center ">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
                className="object-contain "
              />
              <p className="text-gray-100">11 days left to return</p>
            </div>
            <Button className="book-btn">Download Recepit</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
