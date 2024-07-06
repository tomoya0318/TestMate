import React, { ReactNode } from "react";
import Header from "@/components/layouts/header";
import { ChakraProvider } from "@chakra-ui/react";

type LayoutProps = {
  children: ReactNode;
};

export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="ja">
        <body>
          <ChakraProvider>
            <Header />
            {children}
          </ChakraProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
