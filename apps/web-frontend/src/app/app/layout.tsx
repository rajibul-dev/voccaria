import { getUserFromSession } from "@/_libs/getUserFromSession";
import clsx from "clsx";
import { redirect } from "next/navigation";
import AppHeader from "../_components/AppHeader";
import AppSidebar from "../_components/AppSidebar";
import AppFooter from "../_components/AppFooter";
import AppBottomBar from "../_components/AppBottomBar";

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
      <div className={`overflow-y-auto [grid-area:content]`}>
        <main className={clsx(`bg-gray-50 dark:bg-gray-900`, "h-400")}>
          {children}
        </main>
        <AppFooter />
      </div>
      <AppBottomBar /> {/* hidden above 640px width */}
    </div>
  );
}
