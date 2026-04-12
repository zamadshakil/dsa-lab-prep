import { createClient } from "@supabase/supabase-js";

// We fallback to hardcoded strings as these are public ANONYMOUS keys and purely for telemetry telemetry.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
