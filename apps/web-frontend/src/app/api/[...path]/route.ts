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
  try {
    const { targetUrl, options } = createProxyRequest(request, "GET");
    const response = await fetch(targetUrl, options);
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
  try {
    // CRITICAL FIX: Read response as arrayBuffer to handle binary data properly
    const responseBuffer = await response.arrayBuffer();
    const responseText = new TextDecoder("utf-8", { fatal: false }).decode(
      responseBuffer,
    );

    // Temporary debug logging for Discord issue
    console.log("🔍 PROXY_RESPONSE: Response length:", responseText.length);
    console.log(
      "🔍 PROXY_RESPONSE: Response preview:",
      responseText.substring(0, 100),
    );
    console.log(
      "🔍 PROXY_RESPONSE: Response ending:",
      responseText.substring(responseText.length - 100),
    );

    // Validate JSON before proceeding
    try {
      JSON.parse(responseText);
    } catch (jsonError) {
      console.error("🔍 PROXY_RESPONSE: Invalid JSON detected:", jsonError);
      console.error("🔍 PROXY_RESPONSE: Full response text:", responseText);

      // Try to find where the JSON is truncated
      const lastValidChar = responseText.lastIndexOf("}");
      if (lastValidChar > 0) {
        const truncatedJson = responseText.substring(0, lastValidChar + 1);
        console.log(
          "🔍 PROXY_RESPONSE: Attempting to fix with truncated JSON ending at position:",
          lastValidChar,
        );
        try {
          JSON.parse(truncatedJson);
          console.log("🔍 PROXY_RESPONSE: Truncated JSON is valid, using it");
          return new NextResponse(truncatedJson, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              "content-type": "application/json",
              "content-length": truncatedJson.length.toString(),
            },
          });
        } catch {
          // If truncated JSON also fails, fall through to error
        }
      }

      throw jsonError;
    }

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

    const finalResponse = new NextResponse(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

    return finalResponse;
  } catch (error) {
    console.error("🔍 PROXY_RESPONSE: Error in createProxyResponse:", error);
    throw error;
  }
}

// Add other HTTP methods (PUT, OPTIONS, HEAD) as needed, following the same pattern.
