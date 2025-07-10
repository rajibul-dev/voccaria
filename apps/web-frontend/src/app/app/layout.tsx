import { getUserFromSession } from "@/_libs/getUserFromSession";
import clsx from "clsx";
import { redirect } from "next/navigation";
import AppHeader from "../_components/AppHeader";
import AppSidebar from "../_components/AppSidebar";
import AppFooter from "../_components/AppFooter";
import AppBottomBar from "../_components/AppBottomBar";
import GoogleLoginToastTrigger from "../_components/GoogleLoginToastTrigger";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div
      className={`grid h-screen grid-cols-[260px_1fr] grid-rows-[auto_1fr] overflow-hidden border-gray-300 transition-colors [grid-template-areas:'header_header'_'sidebar_content'] max-sm:[grid-template-areas:'header_header'_'content_content'_'bottom-bar_bottom-bar'] dark:border-gray-600`}
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
          {children}
        </main>
        <AppFooter />
      </div>
      <AppBottomBar /> {/* hidden above 640px width */}
      <GoogleLoginToastTrigger /> {/* there's no UI here, just functionality */}
    </div>
  );
}
