import React from "react";
import BookCard from "./BookCard";

interface Props{
  title:string;
  books:Book[];
  containerClassName?:string;
}

const BookList = (
  {title,books,containerClassName}:Props
) => {
  return (
    <section className={containerClassName}>
      <div className="">
        <h2 className="font-bebas-neue text-4xl text-gray-100" >{title} books</h2>
        <ul className="book-list">
          {books.map((book)=>(
            <BookCard key={book.title} {...book}/>
          ))}
        </ul>
      
      </div>
    </section>
  );
};

export default BookList;
