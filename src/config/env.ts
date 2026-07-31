// TODO
const getRequiredEnv = (key: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

export const env = {
  apiBaseUrl: getRequiredEnv(
    'VITE_API_BASE_URL',
    import.meta.env.VITE_API_BASE_URL,
  ),
};
