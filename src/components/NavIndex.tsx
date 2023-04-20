import ThemeToggler from "./ThemeToggler";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

interface NavIndexProps{
  user: User;
}

export default function NavIndex({ user }:NavIndexProps) {
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
      <Flex h="4rem" mx="1rem" justifyContent="space-between" alignItems="center">
        <ThemeToggler />
        {user ? <LoggedInButtons /> : <LoggedOutButtons />}
      </Flex>
    </>
  );
}
