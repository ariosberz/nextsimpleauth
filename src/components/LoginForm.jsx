import {
    FormControl,
    FormLabel,
    Input,
    Link,
    Button,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const LoginForm = ({ setSupabaseError }) => {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(validacionSchema) });

    const supabaseClient = useSupabaseClient();

    async function login(data) {
        const { error: signInError } =
            await supabaseClient.auth.signInWithPassword({
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
            <FormControl isInvalid={errors.email}>
                <FormLabel>E-mail</FormLabel>
                <Input
                    width="full"
                    type="email"
                    placeholder="timapple@email.com"
                    id="email"
                    {...register("email")}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl mt="1.25rem" isInvalid={errors.password}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                    width="full"
                    type="password"
                    placeholder="***********"
                    id="password"
                    {...register("password")}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button
                colorScheme="teal"
                width="full"
                mt="2rem"
                type="submit"
                isLoading={isSubmitting}
            >
                Iniciar sesión
            </Button>
        </form>
    );
};

export default LoginForm;
