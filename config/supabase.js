import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "./site";

// Production credentials
const prodSupabaseUrl = "https://guvhwgqilmxiddtpepqk.supabase.co";
const prodSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dmh3Z3FpbG14aWRkdHBlcHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzMDA3NTUsImV4cCI6MjAzMzg3Njc1NX0.WMj8gltXqT_TlhGCABsFSUz4O2zmSTMnQHGwY1Zv-Kk";

// Development credentials
const devSupabaseUrl = "https://icyaglvxuziqfcxwtymo.supabase.co";
const devSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWFnbHZ4dXppcWZjeHd0eW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mjc3OTQsImV4cCI6MjA0MjMwMzc5NH0.NCYQ-48zeXzqSeeAsGS_voi5T8LdONE9NXxdvIxOrYU";

// Choose credentials based on environment
const supabaseUrl = siteConfig.isProduction ? prodSupabaseUrl : devSupabaseUrl;
const supabaseKey = siteConfig.isProduction ? prodSupabaseKey : devSupabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
