import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as ApiErrorResponse | undefined;
    return data?.message || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}