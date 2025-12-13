import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ehrhscjbmiwxtzgiiueg.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQxZTNmZjk3LWE3N2YtNDQ0Ni1iZjU1LTE2YTUzYjUxNWU2ZiJ9.eyJwcm9qZWN0SWQiOiJlaHJoc2NqYm1pd3h0emdpaXVlZyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzYzMzU4NjgwLCJleHAiOjIwNzg3MTg2ODAsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.9vQct4SshsbJROOuUvRhPvg7hAY1ak_Ee3ws5b8WDrQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };