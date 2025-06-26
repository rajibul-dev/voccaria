import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");

  const res = await fetch(`${expressBackendBaseRESTOrigin}/users/me`, {
    method: "GET",
    headers: {
      cookie: cookie || "",
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
