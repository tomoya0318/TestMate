import React, { ReactNode } from "react";
import Header from "@/components/layouts/header";
import { Providers } from "@/components/layouts/providers";
import { SessionProvider } from "next-auth/react";

type LayoutProps = {
  children: ReactNode;
};

export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="ja">
        <body>
          <Providers>
            <Header />
            {children}
          </Providers>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
