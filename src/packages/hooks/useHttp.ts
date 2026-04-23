import { useState, useCallback } from "react";

type HttpRequestParams = {
  url: string;
  options?: RequestInit;
};

type HttpError = {
  message: string;
  status?: number;
  statusText?: string;
};

type HttpResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: HttpError | null;
  execute: (params: HttpRequestParams) => Promise<void>;
};

const useHttp = <T = unknown>(): HttpResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const execute = useCallback(async ({ url, options }: HttpRequestParams) => {
    if (!url) {
      setError({ message: "Request URL is required" });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw {
          message: `Request failed with status ${response.status}`,
          status: response.status,
          statusText: response.statusText,
        } as HttpError;
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError({ message: err.message });
      } else {
        setError(err as HttpError);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, execute };
};

export default useHttp;
