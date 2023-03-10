import axios from "axios";
import { useMutation } from "react-query";

const usePostData = (url: string) => {
  const mutation = useMutation((data: string) =>
    axios.post(url, data).then((res) => res.data)
  );

  return {
    isLoading: mutation.isLoading,
    isError: !!mutation.error,
    responseData: mutation.data,
    post: mutation.mutate,
    reset: mutation.reset,
  };
};

export default usePostData;
