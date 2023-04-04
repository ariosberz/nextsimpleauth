import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

import { createContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function App({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient());
    const getLayout = Component.getLayout || ((page) => page);
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
