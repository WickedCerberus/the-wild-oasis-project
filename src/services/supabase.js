import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ydbvthlhazrfcfznojpl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkYnZ0aGxoYXpyZmNmem5vanBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyOTY0MzIsImV4cCI6MjAzODg3MjQzMn0.p2lERBSX6MPA2rHHfgpMhEd4kEL9mGKIhqmTKFA2lxk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
