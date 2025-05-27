import { InitUser, Login, RegisterChartJSPlugins } from "@components";
import { getSession } from "@server";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./(pages)/globals.css";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "منشآت",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const session = await getSession();
  if (!session)
    return (
      <html>
        <body>
          <InitUser />
          <RegisterChartJSPlugins />
          <Login />
        </body>
      </html>
    );

  return <>{children}</>;
};

export default RootLayout;
