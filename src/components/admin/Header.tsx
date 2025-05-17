import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session }) => {
  return (
    <header>
      <div>
        <h2 className="text-gray-500 font-semibold text-2xl">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">Monitor area</p>
      </div>
      <p>Search</p>
    </header>
  );
};

export default Header;
