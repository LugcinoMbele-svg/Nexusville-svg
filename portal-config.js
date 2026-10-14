/* Nexusville Portal settings.
   Leave SUPABASE_* empty to run in PREVIEW mode (sample data, no real sign-in, no payments).
   Only the Supabase "anon" public key belongs here. NEVER put a service-role key,
   Paystack secret key or any other secret in this file. */
window.NV_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
  PAYMENTS_ENABLED: false   // switch to true only after the create-checkout and paystack-webhook functions are live and tested
};
  
