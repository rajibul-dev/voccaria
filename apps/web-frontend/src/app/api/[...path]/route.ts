// app/api/[...path]/route.ts
// This file acts as a proxy for all /api/* requests to your Express backend.

import { NextRequest, NextResponse } from "next/server";

// Ensure your environment variable points to the base of your Express API
// e.g., EXPRESS_BACKEND_URL=http://localhost:5000/api/v1
const EXPRESS_BACKEND_URL = process.env.EXPRESS_BACKEND_ORIGIN;

// Helper to construct the target URL and headers
function createProxyRequest(request: NextRequest, method: string, body?: any) {
  if (!EXPRESS_BACKEND_URL) {
    throw new Error("EXPRESS_BACKEND_URL environment variable is not set.");
  }

  const url = new URL(request.url);
  // Remove the /api prefix from the Next.js URL path
  // Example: /api/users/me becomes /users/me
  const path = url.pathname.replace("/api", "");

  // Construct the target URL for the Express backend
  // Example: http://localhost:5000/api/v1 + /users/me + ?query=params
  const targetUrl = `${EXPRESS_BACKEND_URL}${path}${url.search}`;

  const headersToForward = new Headers(request.headers);
  // Important: Set the Host header to the backend's host, not the Next.js app's host
  headersToForward.set("Host", new URL(EXPRESS_BACKEND_URL).host);

  const options: RequestInit = {
    method: method,
    headers: headersToForward,
    // For POST/PUT/PATCH, include the body
    body: body,
    // Ensure cookies are forwarded from the client request to the backend
    // This is handled by forwarding the 'Cookie' header directly.
    // `credentials: 'include'` is for browser fetches, not server-to-server.
  };

  return { targetUrl, options };
}

export async function GET(request: NextRequest) {
  try {
    const { targetUrl, options } = createProxyRequest(request, "GET");
    const response = await fetch(targetUrl, options);
    return createProxyResponse(response);
  } catch (error) {
    console.error(`Proxy GET request failed:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { targetUrl, options } = createProxyRequest(
      request,
      "POST",
      request.body,
    );
    const response = await fetch(targetUrl, options);
    return createProxyResponse(response);
  } catch (error) {
    console.error(`Proxy POST request failed:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { targetUrl, options } = createProxyRequest(
      request,
      "PATCH",
      request.body,
    );
    const response = await fetch(targetUrl, options);
    return createProxyResponse(response);
  } catch (error) {
    console.error(`Proxy PATCH request failed:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { targetUrl, options } = createProxyRequest(request, "DELETE");
    const response = await fetch(targetUrl, options);
    return createProxyResponse(response);
  } catch (error) {
    console.error(`Proxy DELETE request failed:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Helper to create the response sent back to the client
async function createProxyResponse(response: Response) {
  const responseHeaders = new Headers(response.headers);
  // Remove any potentially problematic headers (like Content-Encoding if Next.js handles it)
  // or headers that might cause issues with proxying.
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding"); // Often added by Node.js, can cause issues

  // If your Express backend sets Set-Cookie, ensure it's handled correctly.
  // Next.js Route Handlers generally handle Set-Cookie headers automatically,
  // but if you encounter issues, you might need to inspect/re-set them.

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

// Add other HTTP methods (PUT, OPTIONS, HEAD) as needed, following the same pattern.
