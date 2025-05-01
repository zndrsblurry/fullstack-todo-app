import { API_BASE_URL } from '@/config';

export async function fetchApi<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
      const errorMessage =
        errorData?.message || `HTTP error! Status: ${response.status}`;
      console.error(
        'API Error:',
        errorMessage,
        'URL:',
        url,
        'Options:',
        options,
        'Response:',
        errorData,
      );
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}
