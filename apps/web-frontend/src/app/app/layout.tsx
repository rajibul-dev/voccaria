import clsx from "clsx";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Import headers

import AppHeader from "../_components/AppHeader";
import AppSidebar from "../_components/AppSidebar";
import AppFooter from "../_components/AppFooter";
import AppBottomBar from "../_components/AppBottomBar";
import GoogleLoginToastTrigger from "../_components/GoogleLoginToastTrigger";
import DiscordConnectToastTrigger from "../_components/DiscordConnectToastTrigger";

import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/app/_hooks/useAuth";
import { Providers } from "../providers";
import { User } from "@/_types/user";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers(); // Get headers from the incoming request
  const cookieHeader = (await headerList).get("cookie") || undefined; // Corrected: No extra await needed

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => fetchCurrentUser(cookieHeader),
  });

  const user = queryClient.getQueryData<User | null>(["user"]);

  if (!user) {
    redirect("/auth");
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <div
      className={`grid h-dvh grid-cols-[260px_1fr] grid-rows-[auto_1fr] overflow-hidden border-gray-300 transition-colors [grid-template-areas:'header_header'_'sidebar_content'] max-sm:[grid-template-areas:'header_header'_'content_content'_'bottom-bar_bottom-bar'] dark:border-gray-600`}
    >
      <AppHeader />
      <AppSidebar /> {/* hidden below 640px width */}
      <div
        className={`flex flex-col overflow-y-auto bg-gray-50 [grid-area:content] dark:bg-gray-900`}
      >
        <main
          className={clsx(
            `mx-auto my-10 w-full max-w-260 flex-1 px-8 max-sm:px-6`,
          )}
        >
          <Providers dehydratedState={dehydratedState}>{children}</Providers>
        </main>
        <AppFooter />
      </div>
      <AppBottomBar /> {/* hidden above 640px width */}
      <GoogleLoginToastTrigger />
      <DiscordConnectToastTrigger />
    </div>
  );
}
