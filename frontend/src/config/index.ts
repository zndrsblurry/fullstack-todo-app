if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL environment variable');
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
