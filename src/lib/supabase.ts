import { createClient } from "@supabase/supabase-js";

// Using non-null assertions to satisfy TypeScript.
// The variables are supplied via .env.local locally and Vercel dashboard in production.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");
