export const env = {
  API_URL: import.meta.env.VITE_API_URL || '/api',
  AI_URL: import.meta.env.VITE_AI_URL || '/ai',
} as const;
