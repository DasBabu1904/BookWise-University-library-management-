import Header from "@/components/header";
import React, { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) {
    // console.log(!session);
    redirect("/sign-in");
  }
  // after(async () => {
  //   if (!session?.user?.id) redirect("/sign-in");

  //   //get the user and check if the last activity was today then dont update it
  //   const user = await db
  //     .select()
  //     .from(usersTable)
  //     .where(eq(usersTable.id, session?.user?.id))
  //     .limit(1);

  //   if (user[0].lastActivityDate === new Date().toString().slice(0, 10)) return;

  //   await db
  //     .update(usersTable)
  //     .set({ lastActivityDate: new Date().toString().slice(0, 10) })
  //     .where(eq(usersTable.id, session?.user?.id));
  // });
  return (
    <main className="root-container text-white">
      <div className="mx-auto max-w-7xl">
        <Header session={session}></Header>
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
