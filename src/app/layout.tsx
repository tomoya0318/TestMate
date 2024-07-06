import React, { ReactNode } from "react";
import Header from "@/components/layouts/header";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

type LayoutProps = {
  children: ReactNode;
};

export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="ja">
        <body>
        <SessionProvider>
          <ChakraProvider>
            <Header />
            {children}
          </ChakraProvider>
        </SessionProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
