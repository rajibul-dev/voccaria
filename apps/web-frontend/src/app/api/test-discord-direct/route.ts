import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const backendOrigin = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_ORIGIN;
    const response = await fetch(`${backendOrigin}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // In a real scenario, we'd need to pass cookies here
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: response.status },
      );
    }

    const text = await response.text();
    console.log("🔍 DIRECT_TEST: Response length:", text.length);
    console.log("🔍 DIRECT_TEST: Response preview:", text.substring(0, 200));
    console.log(
      "🔍 DIRECT_TEST: Response ending:",
      text.substring(text.length - 200),
    );

    try {
      const data = JSON.parse(text);
      return NextResponse.json({
        success: true,
        responseLength: text.length,
        data,
      });
    } catch (parseError) {
      console.error("🔍 DIRECT_TEST: Parse error:", parseError);
      return NextResponse.json(
        {
          error: "JSON parse failed",
          responseLength: text.length,
          preview: text.substring(0, 200),
          ending: text.substring(text.length - 200),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("🔍 DIRECT_TEST: Request failed:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
