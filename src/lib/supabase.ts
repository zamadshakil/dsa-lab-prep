import { createClient } from "@supabase/supabase-js";

// We fallback to hardcoded strings as these are public ANONYMOUS keys and purely for telemetry telemetry.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wslxfwkxwbnrjyemetja.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbHhmd2t4d2Jucmp5ZW1ldGphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTM1NDYsImV4cCI6MjA4ODkyOTU0Nn0.fTXHhxSBVfEAFw_Bix5JczVQrJCkE5S26I54L-NRfL4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
