// import { Button } from "@/components/ui/button";

import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "../../../constants";
import { auth } from "../../../auth";
import { books } from "@/database/schema";
import { db } from "@/database/db";
import { desc } from "drizzle-orm";
// import { usersTable } from "@/database/schema";
// import { db } from "@/database/db";

const Home = async () => {
  // const result = await db.select().from(usersTable);
  // console.log(JSON.stringify(result, null, 2));

  const session = await auth();
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <div className="">
      <main className="">
        <BookOverview
          {...latestBooks[0]}
          userId={session?.user?.id as string}
        />
        <BookList
          title="Latest Books"
          books={latestBooks.slice(1)}
          containerClassName="mt-28"
        />
      </main>
    </div>
  );
};

export default Home;
