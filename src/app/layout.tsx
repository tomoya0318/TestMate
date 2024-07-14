import React, { ReactNode } from "react";
import Header from "@/components/layouts/header";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/layouts/footer";

type LayoutProps = {
  children: ReactNode;
};

export const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="ja">
        <body>
          <Flex direction="column" flex="1" minHeight="100vh"> {/* minHeightを追加 */}
            <SessionProvider>
              <ChakraProvider>
                <Header />
                <div style={{ flex: "1" }}> {/* flex="1" を適用 */}
                  {children}
                </div>
                <Footer/>
              </ChakraProvider>
            </SessionProvider>
          </Flex>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
