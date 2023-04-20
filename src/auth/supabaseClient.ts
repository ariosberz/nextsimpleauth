import { createClient } from "@supabase/supabase-js";

const options = {
    auth: {
        persistSession: true,
    },
};

export const supabase = createClient(
    "https://piiwdevgpxgbqkeouwdd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaXdkZXZncHhnYnFrZW91d2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkxNTk2ODUsImV4cCI6MTk5NDczNTY4NX0.mHBNe1H3DSt3IkGJACXlPbMlYdxMatQT0k99xLbjJrY",
    options
);
