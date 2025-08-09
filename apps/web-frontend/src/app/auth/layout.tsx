import dotenv from "dotenv";
dotenv.config();

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Import headers

import DarkModeToggler from "../_components/DarkModeToggler";
import Logo from "../_components/Logo";
import { Providers } from "../providers";
import ReverseAuthGuard from "../_components/ReverseAuthGuard";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/app/_hooks/useAuth";
import { User } from "@/_types/user"; // Import User type

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const cookieHeader = (await headerList).get("cookie") || undefined;

  const queryClient = new QueryClient();

  // Only try to prefetch user data if cookies are available
  if (cookieHeader) {
    await queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: () => fetchCurrentUser(cookieHeader),
    });

    const user = queryClient.getQueryData<User | null>(["user"]);

    if (user) {
      redirect("/app/dashboard");
    }
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-10 pb-14 max-[640px]:pt-15 dark:bg-gray-800">
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <DarkModeToggler />
      </div>
      <main className="flex w-full !max-w-92 flex-col items-center justify-center">
        <Logo className="mb-7 w-60 max-sm:w-60" />
        <Providers dehydratedState={dehydratedState}>
          <ReverseAuthGuard>{children}</ReverseAuthGuard>
        </Providers>
      </main>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
