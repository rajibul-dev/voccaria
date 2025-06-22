import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { User } from "@/_types/user";
import { cookies } from "next/headers";

export async function getUserFromSession() {
  const cookieStore = await cookies();

  const res = await fetch(`${expressBackendBaseRESTOrigin}/users/me`, {
    method: "GET",
    headers: {
      Cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
    cache: "no-store",
    credentials: "include",
  });

  const data = await res.json();

  return data?.success ? (data.data as User) : null;
}
