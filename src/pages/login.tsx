import FormError from ".././components/FormError";
import LoginForm from ".././components/LoginForm";
import ThemeToggler from ".././components/ThemeToggler";
import { Center, Card, CardBody, CardHeader, Link, Flex, Heading, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

const Login = () => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);

  console.log(supabaseError);
  return (
    <div>
      <Box position="absolute" top="3" right="3">
        <ThemeToggler />
      </Box>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Card p="1rem" width="24rem">
          <CardHeader p="0" my="1.5rem">
            <Heading size={"lg"} textAlign="center">
              <Center>Iniciar sesión</Center>
            </Heading>
          </CardHeader>
          <CardBody>
            {supabaseError && <FormError supabaseError={supabaseError} />}
            <LoginForm setSupabaseError={setSupabaseError} />
          </CardBody>
          <Flex mx="1.25rem" mb="0.5rem" justifyContent="space-between">
            <Link as={NextLink} href="/registro" fontSize="sm">
              Crear cuenta
            </Link>
            <Link as={NextLink} href="/registro" fontSize="sm">
              Recuperar contraseña
            </Link>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default Login;
