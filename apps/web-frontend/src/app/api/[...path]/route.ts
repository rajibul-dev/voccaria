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
    console.log("🔍 PROXY_GET: Response ok:", response.ok);
    console.log("🔍 PROXY_GET: Response type:", response.type);
    console.log("🔍 PROXY_GET: Response url:", response.url);
    console.log(
      "🔍 PROXY_GET: Response headers:",
      JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2),
    );

    // Clone response multiple times to test different approaches
    const responseClone1 = response.clone();
    const responseClone2 = response.clone();

    // Test 1: Read as text
    const responseText = await responseClone1.text();
    console.log("🔍 PROXY_GET: Response text length:", responseText.length);
    console.log(
      "🔍 PROXY_GET: Response text preview:",
      responseText.substring(0, 500),
    );

    // Test 2: Read as arrayBuffer
    const responseBuffer = await responseClone2.arrayBuffer();
    console.log(
      "🔍 PROXY_GET: Response buffer length:",
      responseBuffer.byteLength,
    );

    // Check if text is truncated
    if (responseText.length < 800) {
      console.error("❌ PROXY_GET: Response appears truncated!");
      console.log("🔍 PROXY_GET: Full response text:", responseText);
    }

    return createProxyResponse(response);
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

  // AGGRESSIVE FIX: Read response as arrayBuffer to handle binary data properly
  const responseBuffer = await response.arrayBuffer();
  const responseText = new TextDecoder().decode(responseBuffer);

  console.log(
    "🔍 PROXY_RESPONSE: Response buffer length:",
    responseBuffer.byteLength,
  );
  console.log("🔍 PROXY_RESPONSE: Response text length:", responseText.length);
  console.log(
    "🔍 PROXY_RESPONSE: Response body preview:",
    responseText.substring(0, 200),
  );

  // Create completely new headers to avoid any inheritance issues
  const responseHeaders = new Headers();

  // Copy essential headers manually
  responseHeaders.set(
    "content-type",
    response.headers.get("content-type") || "application/json",
  );
  responseHeaders.set("content-length", responseText.length.toString());

  // Copy CORS headers if present
  if (response.headers.get("access-control-allow-credentials")) {
    responseHeaders.set(
      "access-control-allow-credentials",
      response.headers.get("access-control-allow-credentials")!,
    );
  }
  if (response.headers.get("access-control-allow-origin")) {
    responseHeaders.set(
      "access-control-allow-origin",
      response.headers.get("access-control-allow-origin")!,
    );
  }

  console.log(
    "🔍 PROXY_RESPONSE: New headers:",
    JSON.stringify(Object.fromEntries(responseHeaders.entries()), null, 2),
  );

  const finalResponse = new NextResponse(responseText, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });

  console.log("🔍 PROXY_RESPONSE: Final response created successfully");
  return finalResponse;
}

// Add other HTTP methods (PUT, OPTIONS, HEAD) as needed, following the same pattern.
