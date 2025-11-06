import clsx from "clsx";
import { headers } from "next/headers";

import AppBottomBar from "../_components/AppBottomBar";
import AppFooter from "../_components/AppFooter";
import AppHeader from "../_components/AppHeader";
import AppSidebar from "../_components/AppSidebar";
import ClientAuthGuard from "../_components/ClientAuthGuard";
import DiscordConnectToastTrigger from "../_components/DiscordConnectToastTrigger";
import GoogleLoginToastTrigger from "../_components/GoogleLoginToastTrigger";

import { fetchCurrentUser } from "@/app/_hooks/useAuth";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Providers } from "../providers";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = headers();
  const cookieHeader = (await headerList).get("cookie") || undefined;

  const queryClient = new QueryClient();

  // Always try to prefetch user data if cookies are available
  if (cookieHeader) {
    await queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: () => fetchCurrentUser(cookieHeader),
    });
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
          <Providers dehydratedState={dehydratedState}>
            <ClientAuthGuard>{children}</ClientAuthGuard>
          </Providers>
        </main>
        <AppFooter />
      </div>
      <AppBottomBar /> {/* hidden above 640px width */}
      <GoogleLoginToastTrigger />
      <DiscordConnectToastTrigger />
    </div>
  );
}
