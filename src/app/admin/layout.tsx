import { ReactNode } from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import SideBar from "@/components/admin/sidebar";
import "../../../styles/admin.css";
import Header from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full flex-row">
      <SideBar session={session} />
      <div className="admin-container ml-5">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
