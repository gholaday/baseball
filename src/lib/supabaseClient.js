import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://ubsvlgsqbasovaldifvs.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVic3ZsZ3NxYmFzb3ZhbGRpZnZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI1NjgxOTcsImV4cCI6MjAwODE0NDE5N30.fbQhRdt3Mwj1DVsk9Q1JbEch7k1N3fVKUFEYUdiZCag'
);
