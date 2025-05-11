import React from "react";
import { signOut } from "../../../../auth";
import { Button } from "@/components/ui/button";

const MyProfile = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>LogOut</Button>
      </form>
    </div>
  );
};

export default MyProfile;
