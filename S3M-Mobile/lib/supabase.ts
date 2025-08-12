import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const SUPABASE_URL = "https://ngferufrbuvhohvfnwak.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nZmVydWZyYnV2aG9odmZud2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzkyOTksImV4cCI6MjA2NDIxNTI5OX0.olqhYALGGLLW_fgtuueIC1g_7nTm1A3E45aF6J9yrBQ";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: {
        getItem: async (key: string) => {
          // Use AsyncStorage for React Native
          const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
          return await AsyncStorage.getItem(key);
        },
        setItem: async (key: string, value: string) => {
          const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
          await AsyncStorage.setItem(key, value);
        },
        removeItem: async (key: string) => {
          const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
          await AsyncStorage.removeItem(key);
        },
      },
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);