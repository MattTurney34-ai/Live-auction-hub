import { Stack } from "expo-router";
import { PiPProvider } from "./contexts/PiPContext";
import PiPVideo from "./components/PiPVideo";

// Polyfill fetch to prevent Supabase from trying to import @supabase/node-fetch
// This is a no-op in React Native where fetch already exists
if (typeof globalThis.fetch === 'undefined') {
  // @ts-ignore
  globalThis.fetch = fetch;
}

export default function RootLayout() {
  return (
    <PiPProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: '#0a0a0a',
          },
        }}
      />
      <PiPVideo />
    </PiPProvider>
  );
}


