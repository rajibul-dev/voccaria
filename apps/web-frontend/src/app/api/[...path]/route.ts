// BULLETPROOF PROXY - No more JSON truncation nonsense!
import {
  expressBackendBaseRESTOrigin,
  expressBackendOrigin,
} from "@/_constants/backendOrigins";
import { NextRequest } from "next/server";

// Simple, reliable proxy function
async function proxyRequest(request: NextRequest) {
  if (!expressBackendOrigin) {
    throw new Error("EXPRESS_BACKEND_ORIGIN environment variable is not set.");
  }

  const url = new URL(request.url);
  const path = url.pathname.replace("/api", "");
  const targetUrl = `${expressBackendBaseRESTOrigin}${path}${url.search}`;

  // Essential headers only
  const headers: Record<string, string> = {};

  // Copy cookie for auth
  const cookie = request.headers.get("cookie");
  if (cookie) headers["Cookie"] = cookie;

  // Copy content-type if present
  const contentType = request.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const options: RequestInit = {
    method: request.method,
    headers,
    credentials: "include",
  };

  // Handle request body for POST/PUT/PATCH
  if (["POST", "PUT", "PATCH"].includes(request.method)) {
    const body = await request.text();
    if (body) options.body = body;
  }

  try {
    const response = await fetch(targetUrl, options);

    // Use the most reliable method - direct text reading
    const responseText = await response.text();

    // Return clean response with minimal headers
    return new Response(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error(`❌ PROXY: Failed for ${targetUrl}:`, error);
    return new Response("Proxy Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request);
}

export async function POST(request: NextRequest) {
  return proxyRequest(request);
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request);
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request);
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request);
}
