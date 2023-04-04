import NavDash from "@/components/NavDash";
import NavIndex from "@/components/NavIndex";
import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";

const index = () => {
    const user = useUser();

    if (!user) {
        return <></>;
    }

    return (
        <>
            <NavDash />
            <Flex mt="3rem" flexDir="column" alignItems="center" gap="1rem">
                <Text>{user.user_metadata.full_name}</Text>
                <Text>{user.email}</Text>
            </Flex>
        </>
    );
};

export default index;
