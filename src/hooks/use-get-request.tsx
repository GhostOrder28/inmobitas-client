import { AxiosResponse } from 'axios';
import { useState, useEffect, Dispatch, SetStateAction} from "react";

function useGetRequest <T>(fn: () => Promise<AxiosResponse<T, any>>): [ T, Dispatch<SetStateAction<T>> ]
function useGetRequest <T>(fn: () => Promise<AxiosResponse<T, any>>) {
  const [ data, setData ] = useState<T>();

  useEffect(() => {
    (async function () {
      const { data: payload } = await fn();
      setData(payload)
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ data, setData ];
};

export default useGetRequest;
