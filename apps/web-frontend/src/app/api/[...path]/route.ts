// app/api/[...path]/route.ts
// This file acts as a proxy for all /api/* requests to your Express backend.

import {
  expressBackendBaseRESTOrigin,
  expressBackendOrigin,
} from "@/_constants/backendOrigins";
import { NextRequest, NextResponse } from "next/server";

// Helper to construct the target URL and headers
function createProxyRequest(request: NextRequest, method: string, body?: any) {
  if (!expressBackendOrigin) {
    throw new Error("EXPRESS_BACKEND_ORIGIN environment variable is not set.");
  }

  const url = new URL(request.url);
  // Remove the /api prefix from the Next.js URL path
  // Example: /api/users/me becomes /users/me
  const path = url.pathname.replace("/api", "");

  // Construct the target URL for the Express backend
  // Example: http://localhost:5000/api/v1 + /users/me + ?query=params
  const targetUrl = `${expressBackendBaseRESTOrigin}${path}${url.search}`;

  console.log("Proxy request:", {
    originalUrl: request.url,
    path,
    targetUrl,
    expressBackendBaseRESTOrigin,
    expressBackendOrigin,
  });

  const headersToForward = new Headers(request.headers);
  // Important: Set the Host header to the backend's host, not the Next.js app's host
  headersToForward.set("Host", new URL(expressBackendOrigin).host);

  const options: RequestInit = {
    method: method,
    headers: headersToForward,
    // For POST/PUT/PATCH, include the body
    body: body,
    // Required for requests with body in Node.js fetch
    duplex: body ? "half" : undefined,
    // Ensure cookies are forwarded from the client request to the backend
    // This is handled by forwarding the 'Cookie' header directly.
    // `credentials: 'include'` is for browser fetches, not server-to-server.
  } as RequestInit;

  return { targetUrl, options };
}

export async function GET(request: NextRequest) {
  console.log("🔍 PROXY_GET: Starting proxy request");
  console.log("🔍 PROXY_GET: Original URL:", request.url);
  console.log(
    "🔍 PROXY_GET: Headers:",
    JSON.stringify(Object.fromEntries(request.headers.entries()), null, 2),
  );

  try {
    const { targetUrl, options } = createProxyRequest(request, "GET");
    console.log("🔍 PROXY_GET: Target URL:", targetUrl);
    console.log(
      "🔍 PROXY_GET: Request options:",
      JSON.stringify(
        {
          method: options.method,
          headers:
            options.headers instanceof Headers
              ? Object.fromEntries(options.headers.entries())
              : options.headers,
        },
        null,
        2,
      ),
    );

    console.log("🔍 PROXY_GET: Making fetch request...");
    const response = await fetch(targetUrl, options);
    console.log("🔍 PROXY_GET: Response status:", response.status);
    console.log(
      "🔍 PROXY_GET: Response headers:",
      JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2),
    );

    // Read response text for logging before creating proxy response
    const responseText = await response.text();
    console.log("🔍 PROXY_GET: Response text length:", responseText.length);
    console.log(
      "🔍 PROXY_GET: Response text preview:",
      responseText.substring(0, 500),
    );

    // Create a new response with the same text
    const newResponse = new Response(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    return createProxyResponse(newResponse);
  } catch (error) {
    console.error("❌ PROXY_GET: Request failed:", error);
    if (error instanceof Error) {
      console.error("❌ PROXY_GET: Error stack:", error.stack);
    }
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
  console.log("🔍 PROXY_RESPONSE: Creating proxy response");
  console.log("🔍 PROXY_RESPONSE: Original status:", response.status);
  console.log("🔍 PROXY_RESPONSE: Original statusText:", response.statusText);
  console.log(
    "🔍 PROXY_RESPONSE: Original headers:",
    JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2),
  );

  const responseHeaders = new Headers(response.headers);
  // Remove any potentially problematic headers (like Content-Encoding if Next.js handles it)
  // or headers that might cause issues with proxying.
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("transfer-encoding"); // Often added by Node.js, can cause issues

  console.log(
    "🔍 PROXY_RESPONSE: Modified headers:",
    JSON.stringify(Object.fromEntries(responseHeaders.entries()), null, 2),
  );

  // If your Express backend sets Set-Cookie, ensure it's handled correctly.
  // Next.js Route Handlers generally handle Set-Cookie headers automatically,
  // but if you encounter issues, you might need to inspect/re-set them.

  const finalResponse = new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  console.log("🔍 PROXY_RESPONSE: Final response created successfully");
  return finalResponse;
}

// Add other HTTP methods (PUT, OPTIONS, HEAD) as needed, following the same pattern.
