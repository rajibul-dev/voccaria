import { FrontendURL } from "@/_constants/frontendOrigins";
import { User } from "@/_types/user";
import { cookies } from "next/headers";

export async function getUserFromSession(): Promise<User | null> {
  const cookieStore = await cookies();

  const res = await fetch(`${FrontendURL}/api/users/me`, {
    method: "GET",
    cache: "no-store",
    credentials: "include",
    headers: {
      cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  });

  if (!res.ok) return null;

  const data = await res.json();

  return data?.success ? (data.data as User) : null;
}
