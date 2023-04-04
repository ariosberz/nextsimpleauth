import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton, Flex } from "@chakra-ui/react";

const ThemeToggler = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex justifyContent="space-between">
            <IconButton
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="solid"
            />
        </Flex>
    );
};

export default ThemeToggler;
