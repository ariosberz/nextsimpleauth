import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

 interface SupabaseError {
    supabaseError: string | null;
}

const FormError = ({ supabaseError }: SupabaseError) => {
    switch (supabaseError) {
        case "Invalid login credentials":
            return (
                <Alert status="error" mb="1rem">
                    <AlertIcon />
                    Datos incorrectos
                </Alert>
            );
            break;
        case "Signup requires a valid password":
            return (
                <Alert status="error" mb="1rem">
                    <AlertIcon />
                    Se requiere una contraseña válida
                </Alert>
            );
            break;
        case "To signup, please provide your email":
            return (
                <Alert status="error" mb="1rem">
                    <AlertIcon />
                    Se requiere su correo electrónico
                </Alert>
            );
            break;
        default:
            return (
                <Alert status="error" mb="1rem">
                    <AlertIcon />
                    {supabaseError}
                </Alert>
            );
            break;
    }

    return <div>FormError</div>;
};

export default FormError;
