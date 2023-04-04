import ThemeToggler from "@/components/ThemeToggler";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/router";

export default function NavIndex({ user }) {
    const router = useRouter();
    console.log("Usuario: ", user);
    const LoggedOutButtons = () => {
        return (
            <Flex>
                <Button
                    w="8rem"
                    colorScheme="teal"
                    mr="1rem"
                    onClick={() => {
                        router.push("/login");
                    }}
                >
                    Iniciar sesión
                </Button>
                <Button
                    w="8rem"
                    colorScheme="pink"
                    onClick={() => {
                        router.push("/registro");
                    }}
                >
                    Registrarse
                </Button>
            </Flex>
        );
    };

    const LoggedInButtons = () => {
        return (
            <Flex>
                <Button
                    w="8rem"
                    colorScheme="teal"
                    mr="1rem"
                    onClick={() => {
                        router.push("/dashboard");
                    }}
                >
                    Dashboard
                </Button>
            </Flex>
        );
    };

    return (
        <>
            <Flex
                h="4rem"
                mx="1rem"
                justifyContent="space-between"
                alignItems="center"
            >
                <ThemeToggler />
                {user ? <LoggedInButtons /> : <LoggedOutButtons />}
            </Flex>
        </>
    );
}
