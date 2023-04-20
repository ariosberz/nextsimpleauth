import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Link,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { Dispatch, SetStateAction } from "react";

interface SignFormProps {
  setSupabaseError: Dispatch<SetStateAction<string | null>>;
  setRegistrado: Dispatch<SetStateAction<boolean>>;
}

const validacionSchema = z
  .object({
    nombre: z
      .string()
      .min(1, { message: "Nombre requerido" })
      .min(3, "Se quieren mínimo 3 carácteres"),
    email: z
      .string()
      .min(1, { message: "Correo requerido" })
      .min(5, { message: "Se quieren mínimo 5 carácteres" })
      .email({ message: "Correo inválido" }),
    password: z
      .string()
      .min(1, { message: "Contraseña requerida" })
      .min(6, { message: "Se requieren mínimo 6 carácteres" }),
    confirmarPassword: z
      .string()
      .min(1, { message: "Contraseña requerida" })
      .min(6, { message: "Se requieren mínimo 6 carácteres" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((zData) => zData.password === zData.confirmarPassword, {
    path: ["confirmarPassword"],
    message: "Las contraseñas no coinciden",
  });

type ValidacionSchema = z.infer<typeof validacionSchema>;

const SignForm = ({ setSupabaseError, setRegistrado }:SignFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ValidacionSchema>({ resolver: zodResolver(validacionSchema) });

  const supabaseClient = useSupabaseClient();

  const registrar: SubmitHandler<ValidacionSchema> = async function(data) {
    const { error: registrarError } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.nombre,
        },
        emailRedirectTo: "http://localhost:3000/loginredirect",
      },
    });
    if (registrarError) {
      console.error(registrarError.message);
      setSupabaseError(registrarError.message);
    } else {
      setRegistrado(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(registrar)}>
      <FormControl isInvalid={errors.nombre as boolean|undefined}>
        <FormLabel htmlFor="nombre">Nombre y Apellido</FormLabel>
        <Input
          width="full"
          type="text"
          placeholder="Tim Apple"
          id="nombre"
          focusBorderColor={errors.nombre && "red.500"}
          {...register("nombre")}
        />
        <FormErrorMessage>{errors.nombre && errors.nombre.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt="1.25rem" isInvalid={Boolean(errors.email)}>
        <FormLabel>E-mail</FormLabel>
        <Input
          width="full"
          type="email"
          placeholder="timapple@email.com"
          id="email"
          focusBorderColor={errors.email && "red.500"}
          {...register("email")}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt="1.25rem" isInvalid={Boolean(errors.password)}>
        <FormLabel>Contraseña</FormLabel>
        <Input
          width="full"
          type="password"
          placeholder="***********"
          id="password"
          focusBorderColor={errors.password && "red.500"}
          {...register("password")}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt="1.25rem" isInvalid={Boolean(errors.confirmarPassword)}>
        <FormLabel>Confirmar contraseña</FormLabel>
        <Input
          width="full"
          type="password"
          placeholder="***********"
          id="confirmarPassword"
          focusBorderColor={errors.confirmarPassword && "red.500"}
          {...register("confirmarPassword")}
        />
        <FormErrorMessage>
          {errors.confirmarPassword && errors.confirmarPassword.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt="1.25rem" isInvalid={Boolean(errors.terms)}>
        <Checkbox id="terms" {...register("terms")} textColor={errors.terms && "red"}>
          <Text display="inline" fontSize="sm">
            Acepto los{" "}
          </Text>
          <Link as={NextLink} href="/terms" fontSize="sm" fontStyle="">
            <Text as="u" display="inline">
              términos y condiciones
            </Text>
          </Link>
        </Checkbox>
      </FormControl>
      <Button colorScheme="teal" width="full" mt="2rem" type="submit" isLoading={isSubmitting}>
        Registrarse
      </Button>
    </form>
  );
};

export default SignForm;
