
import { createClient } from '@supabase/supabase-js';


const VITE_SUPABASE_URL = "https://krlracjsnuraacjlosjz.supabase.co"
const VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybHJhY2pzbnVyYWFjamxvc2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1Mjg3MzYsImV4cCI6MjAzMzEwNDczNn0.RJbk2cYegdDbF3FD2xp9hrAjf3PATmLDz3iq4Gd2O0Q"


// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

