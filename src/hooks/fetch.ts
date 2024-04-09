import axios, { AxiosResponse, AxiosError, Method } from "axios";
import { useEffect, useState } from "react";

interface UseAxiosProps {
  url: string;
  method: Method;
  data?: any;
}

interface UseAxiosReturn {
  response: any | null;
  error: AxiosError | null;
  loading: boolean;
}

export const useAxios = ({
  url,
  method,
  data,
}: UseAxiosProps): UseAxiosReturn => {
  const [response, setResponse] = useState<any | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    try {
      const res: AxiosResponse = await axios.request({ method, url, data });
      setResponse(res.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, method, data]);

  return { response, error, loading };
};
