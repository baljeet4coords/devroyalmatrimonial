import { useQuery, useMutation } from "react-query";
import axios from "axios";

const registerUser = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
      values,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 1 form");
  }
};

export const useStep1Register = () => {
  const registerUserMutation = useMutation(registerUser);

  const Step1Query = () => {
    const { data, isLoading, error } = useQuery("step1", () => registerUser);

    return { data, isLoading, error };
  };

  return {
    registerUserMutation,
    Step1Query,
  };
};
