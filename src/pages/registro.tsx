import FormError from ".././components/FormError";
import SignForm from ".././components/SignForm";
import ThemeToggler from ".././components/ThemeToggler";
import {
  Center,
  Card,
  CardBody,
  CardHeader,
  Link,
  Flex,
  Heading,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Registro = () => {
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [registrado, setRegistrado] = useState(false);

  const supabaseClient = useSupabaseClient();

  const googleAuth = async function signInWithGoogle() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/loginredirect",
      },
    });
  };

  return (
    <>
      <Box position="absolute" top="3" right="3">
        <ThemeToggler />
      </Box>
      <Flex alignItems="center" justifyContent="center" minHeight="100vh">
        <Card p="1rem" width={{ base: "22rem", md: "24rem" }}>
          <CardHeader p="0" my="1.5rem">
            <Heading size={"lg"}>
              <Center>Crear cuenta</Center>
            </Heading>
          </CardHeader>
          <CardBody>
            {registrado ? (
              <Alert status="success" mb="1rem">
                <AlertIcon />
                Favor de revisar su correo.
              </Alert>
            ) : (
              <Box>
                {supabaseError && <FormError supabaseError={supabaseError} />}
                {/* <Button onClick={googleAuth}>Google</Button> */}
                <SignForm setSupabaseError={setSupabaseError} setRegistrado={setRegistrado} />
              </Box>
            )}
          </CardBody>
          {registrado ? (
            ""
          ) : (
            <Flex ml="1.25rem" mb="0.5rem">
              <Link as={NextLink} href="/login" fontSize="sm">
                Ya tengo cuenta
              </Link>
            </Flex>
          )}
        </Card>
      </Flex>
    </>
  );
};

export default Registro;
