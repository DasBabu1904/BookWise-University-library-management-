"use server";

import { db } from "@/database/db";
import { usersTable } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { signIn } from "../../../auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "SigIn error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, universityId, password, universityCard } = params;
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "This email is already Registered!" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(usersTable).values({
      fullName,
      email,
      universityId,
      password: hashedPassword,
      universityCard,
    });
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error, "Unsuccessful SignUP!");
    return { success: false, error: "Unsuccessful SignUP!" };
  }
};
