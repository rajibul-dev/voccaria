import { expressBackendBaseRESTOrigin } from "@/_constants/backendOrigins";
import { NextRequest, NextResponse } from "next/server";

// This helper function handles the core logic of forwarding the request, regardless of method
async function handleProxyRequest(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);

  // Get all headers from the incoming request
  const headers = new Headers(req.headers);
  // Optional: remove any headers you don't want to forward
  headers.delete("host");

  // The path to the Express backend is everything after '/api'
  const backendPath = pathname.replace("/api", "");
  const backendUrl = `${expressBackendBaseRESTOrigin}${backendPath}?${searchParams.toString()}`;

  // Get the request body if it exists. Note: req.text() can only be called once.
  let body = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      body = await req.text();
    } catch (e) {
      console.error("Could not parse request body:", e);
    }
  }

  // Perform the server-to-server fetch request
  const backendResponse = await fetch(backendUrl, {
    method: req.method,
    headers: headers,
    body: body, // Pass the body for non-GET requests
    credentials: "include", // Ensure cookies are handled
  });

  // Return the response from the backend to the client
  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: backendResponse.headers,
  });
}

// Next.js will call the appropriate function based on the request method
export async function GET(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function POST(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxyRequest(req);
}
