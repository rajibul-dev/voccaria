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
    // MULTIPLE ATTEMPTS to read the response correctly
    let responseText: string;

    // Method 1: Try reading as text directly first
    try {
      const clonedResponse1 = response.clone();
      responseText = await clonedResponse1.text();
      console.log(
        "🔍 PROXY_RESPONSE: Method 1 (direct text) length:",
        responseText.length,
      );
    } catch (directTextError) {
      console.log("🔍 PROXY_RESPONSE: Method 1 failed, trying Method 2");

      // Method 2: Try arrayBuffer approach
      try {
        const clonedResponse2 = response.clone();
        const responseBuffer = await clonedResponse2.arrayBuffer();
        responseText = new TextDecoder("utf-8", { fatal: false }).decode(
          responseBuffer,
        );
        console.log(
          "🔍 PROXY_RESPONSE: Method 2 (arrayBuffer) length:",
          responseText.length,
        );
      } catch (arrayBufferError) {
        console.log("🔍 PROXY_RESPONSE: Method 2 failed, trying Method 3");

        // Method 3: Stream reading approach
        const clonedResponse3 = response.clone();
        const reader = clonedResponse3.body?.getReader();
        const chunks: Uint8Array[] = [];
        let totalLength = 0;

        if (reader) {
          let done = false;
          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            if (value) {
              chunks.push(value);
              totalLength += value.length;
            }
          }

          // Combine all chunks
          const fullBuffer = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            fullBuffer.set(chunk, offset);
            offset += chunk.length;
          }

          responseText = new TextDecoder("utf-8", { fatal: false }).decode(
            fullBuffer,
          );
          console.log(
            "🔍 PROXY_RESPONSE: Method 3 (stream) length:",
            responseText.length,
          );
        } else {
          throw new Error("All methods failed to read response");
        }
      }
    }

    console.log(
      "🔍 PROXY_RESPONSE: Final response length:",
      responseText.length,
    );
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
      console.log("🔍 PROXY_RESPONSE: JSON is valid");
    } catch (jsonError) {
      console.error("🔍 PROXY_RESPONSE: Invalid JSON detected:", jsonError);
      console.error("🔍 PROXY_RESPONSE: Full response text:", responseText);

      // Try to find where the JSON is truncated and fix it
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
          responseText = truncatedJson;
        } catch (truncateError) {
          console.error(
            "🔍 PROXY_RESPONSE: Truncated JSON is also invalid:",
            truncateError,
          );
          throw jsonError;
        }
      } else {
        throw jsonError;
      }
    }

    // Create a completely fresh response
    return new NextResponse(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "content-type": "application/json",
        "content-length": responseText.length.toString(),
        "cache-control": "no-cache",
      },
    });
  } catch (error) {
    console.error("🔍 PROXY_RESPONSE: Error in createProxyResponse:", error);
    throw error;
  }
}

// Add other HTTP methods (PUT, OPTIONS, HEAD) as needed, following the same pattern.
