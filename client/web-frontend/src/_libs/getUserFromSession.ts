import { User } from "@/_types/user";
import { config } from "dotenv";
import { cookies } from "next/headers";
config();

export async function getUserFromSession(): Promise<User | null> {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v1/users/me`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "include",
      headers: {
        cookie: cookieStore
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
    },
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data?.success ? (data.data as User) : null;
}
