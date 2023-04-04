import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: "light",
    useSystemColorMode: true,
};

const theme = extendTheme({
    config,
    components: {
        Card: {
            baseStyle: {
                container: {
                    backgroundColor: "whiteAlpha.800",
                    _dark: {
                        backgroundColor: "blackAlpha.600",
                    },
                },
            },
        },
        Button: {
            baseStyle: {},
        },
    },
    semanticTokens: {
        // colors: {
        //   "chakra-body-bg": {
        //     _light: "whiteAlpha.700",
        //     _dark: "blackAlpha.700",
        //   },
        // },
    },
    styles: {
        global: {
            body: {
                bg: "linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))",
                _dark: {
                    bg: "linear-gradient(90deg, rgba(149,131,132,1) 0%, rgba(140,179,170,1) 100%)",
                },
            },
        },
    },
});

export default theme;
