import { createClient } from "@supabase/supabase-js";
import { siteConfig } from "./site";

// Production credentials
const prodSupabaseUrl = "https://nvvsoihxmczidolcqgru.supabase.co";
const prodSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dnNvaWh4bWN6aWRvbGNxZ3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjU0NzcsImV4cCI6MjA0NTI0MTQ3N30.KS8f8i-t56eYVYYz9U_XVVp5R8QMIKHvjF4GViqqoL4";

// Development credentials
const devSupabaseUrl = "https://icyaglvxuziqfcxwtymo.supabase.co";
const devSupabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWFnbHZ4dXppcWZjeHd0eW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mjc3OTQsImV4cCI6MjA0MjMwMzc5NH0.NCYQ-48zeXzqSeeAsGS_voi5T8LdONE9NXxdvIxOrYU";

// Choose credentials based on environment
const supabaseUrl = siteConfig.isProduction ? prodSupabaseUrl : devSupabaseUrl;
const supabaseKey = siteConfig.isProduction ? prodSupabaseKey : devSupabaseKey;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
