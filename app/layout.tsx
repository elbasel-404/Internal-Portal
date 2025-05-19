import { signIn } from "@server";
import { auth } from "./auth";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "منشآت",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => {
  const sesision = await auth();
  if (!sesision)
    return (
      <html>
        <body>
          <h1>Login</h1>
          <form action={signIn}>
            <input
              defaultValue="ssaeed"
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              id="password"
              defaultValue="@111"
            />
            <button type="submit">login</button>
          </form>
        </body>
      </html>
    );

  return <>{children}</>;
};

export default RootLayout;
