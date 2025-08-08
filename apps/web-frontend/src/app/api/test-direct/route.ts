// Simple test route to bypass proxy complexity
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("🔍 TEST_ROUTE: Starting direct backend request");

  try {
    // Make direct request to backend
    const backendUrl = "https://api.voccaria.com/api/v1/users/me";
    console.log("🔍 TEST_ROUTE: Backend URL:", backendUrl);

    // Forward cookies from the original request
    const headers = new Headers();
    headers.set("Cookie", request.headers.get("Cookie") || "");
    headers.set("User-Agent", request.headers.get("User-Agent") || "");
    headers.set("Host", "api.voccaria.com");

    console.log(
      "🔍 TEST_ROUTE: Request headers:",
      Object.fromEntries(headers.entries()),
    );

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: headers,
    });

    console.log("🔍 TEST_ROUTE: Response status:", response.status);
    console.log(
      "🔍 TEST_ROUTE: Response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // Read as array buffer to avoid any text encoding issues
    const buffer = await response.arrayBuffer();
    const text = new TextDecoder().decode(buffer);

    console.log("🔍 TEST_ROUTE: Buffer length:", buffer.byteLength);
    console.log("🔍 TEST_ROUTE: Text length:", text.length);
    console.log("🔍 TEST_ROUTE: Text preview:", text.substring(0, 500));

    // Return with minimal headers
    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": text.length.toString(),
      },
    });
  } catch (error) {
    console.error("❌ TEST_ROUTE: Error:", error);
    return new NextResponse("Test route error", { status: 500 });
  }
}
