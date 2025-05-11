// import { Button } from "@/components/ui/button";

import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "../../../constants";
// import { usersTable } from "@/database/schema";
// import { db } from "@/database/db";

const Home = async () => {
  // const result = await db.select().from(usersTable);
  // console.log(JSON.stringify(result, null, 2));

  return (
    <div className="">
      <main className="">
        <BookOverview {...sampleBooks[0]} />
        <BookList
          title="Latest Books"
          books={sampleBooks}
          containerClassName="mt-28"
        />
      </main>
    </div>
  );
};

export default Home;
