import axios from "axios";
import { useMutation } from "react-query";

const useCreateUserRegister = (type: "c" | "u", endpoint: string) => {
  const mutation = useMutation((data: {}) =>
    axios
      .post(`${process.env.NEXT_PUBLIC_URL}/registerUser/${endpoint}`, {
        type,
        ...data,
      })
      .then((res) => res.data)
  );

  return {
    isLoading: mutation.isLoading,
    isError: !!mutation.error,
    responseData: mutation.data,
    post: mutation.mutate,
    reset: mutation.reset,
  };
};

export default useCreateUserRegister;
