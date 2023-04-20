import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement, ReactNode, useState } from "react";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AppProps } from "next/app";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
  }
  type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout,
    initialSession: Session
  }
  

  
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [supabase] = useState(() => createBrowserSupabaseClient());
    const getLayout = Component.getLayout ?? ((page) => page)
    return (
        <SessionContextProvider
            supabaseClient={supabase}
            initialSession={pageProps.initialSession}
        >
            <ChakraProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
            </ChakraProvider>
        </SessionContextProvider>
    );
}
