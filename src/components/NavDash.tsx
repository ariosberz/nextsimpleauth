import ThemeToggler from "./ThemeToggler";
import { Button, Flex } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function NavDash() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <Flex h="4rem" mx="1rem" justifyContent="space-between" alignItems="center">
        <ThemeToggler />

        <Flex>
          <Button
            w="8rem"
            colorScheme="red"
            mr="1rem"
            onClick={() => {
              cerrarSesion();
            }}
          >
            Cerrar Sesión
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
