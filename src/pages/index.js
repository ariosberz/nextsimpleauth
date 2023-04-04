import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { Flex, Heading, Text } from "@chakra-ui/react";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import NavIndex from "@/components/NavIndex";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (ctx) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx);
    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session)
        return {
            props: {},
        };

    // Run queries with RLS on the server

    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    };
};

export default function Home({ user }) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="LOGIN" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NavIndex user={user} />

            <Flex
                mt="3rem"
                mx="3rem"
                flexDirection="column"
                justifyContent="center"
                gap="3rem"
            >
                <Heading fontSize="6xl" textAlign="center">
                    Landing Page
                </Heading>
                <Text fontSize="lg">
                    Consequat culpa veniam ea duis tempor ex nulla consectetur.
                    Irure id laboris consequat anim enim in quis. Et id culpa ex
                    enim laborum et laboris enim aute minim labore ex. Lorem ea
                    tempor occaecat eiusmod pariatur minim consequat Lorem elit
                    officia in. Nulla do incididunt culpa quis. Esse elit
                    pariatur esse mollit sit in cillum laborum enim eu.
                    Voluptate et tempor est dolor cillum duis duis voluptate.
                    Nisi consectetur commodo eiusmod velit laboris culpa
                    incididunt culpa aute dolore. Dolore tempor culpa pariatur
                    et nisi dolore est esse est eiusmod elit. Proident occaecat
                    cupidatat laborum exercitation culpa labore deserunt sint
                    aliqua. Enim ullamco cillum aliquip voluptate aliqua culpa
                    tempor enim. Est elit velit sit labore. Esse id nulla culpa
                    nisi aute quis. Enim cillum fugiat laborum et voluptate anim
                    irure reprehenderit eu proident amet reprehenderit. Ipsum
                    incididunt ea ullamco id qui amet cupidatat minim Lorem
                    aliquip culpa ea irure labore. Pariatur qui Lorem enim in
                    officia reprehenderit incididunt enim pariatur in sunt
                    fugiat. Tempor anim tempor ea dolore in ad enim cupidatat
                    proident. Exercitation adipisicing enim incididunt id
                    dolore. In do veniam irure reprehenderit officia qui.
                </Text>
            </Flex>
        </>
    );
}
