import { FormControl, FormLabel, Input, Button, FormErrorMessage } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";


interface LoginFormProps {
  setSupabaseError: Dispatch<SetStateAction<string | null>>;
}


const validacionSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Correo requerido" })
    .email({ message: "Correo inválido" })
    .min(5, { message: "Se quieren mínimo 5 caracteres" }),
  password: z
    .string()
    .min(1, { message: "Contraseña requerida" })
    .min(6, { message: "Se requieren mínimo 6 caracteres" }),
});

type ValidacionSchema = z.infer<typeof validacionSchema>;

const LoginForm = ({ setSupabaseError }:LoginFormProps) => {
  
  //Next Router
  const router = useRouter();
  
  //ReactHookForm
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ValidacionSchema>({ resolver: zodResolver(validacionSchema) });

  const supabaseClient = useSupabaseClient();

  const login: SubmitHandler<ValidacionSchema> = async function(data) {
    const { error: signInError } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (signInError) {
      console.error(signInError.message);
      setSupabaseError(signInError.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <form onSubmit={handleSubmit(login)}>
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>E-mail</FormLabel>
        <Input
          width="full"
          type="email"
          placeholder="timapple@email.com"
          id="email"
          {...register("email")}
        />
        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
      </FormControl>
      <FormControl mt="1.25rem" isInvalid={errors.password as boolean|undefined}>
        <FormLabel>Contraseña</FormLabel>
        <Input
          width="full"
          type="password"
          placeholder="***********"
          id="password"
          {...register("password")}
        />
        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
      </FormControl>
      <Button colorScheme="teal" width="full" mt="2rem" type="submit" isLoading={isSubmitting}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginForm;
