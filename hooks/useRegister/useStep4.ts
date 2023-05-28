import { useQuery, useMutation } from "react-query";
import axios from "axios";

const registerUser = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step4`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 4 form");
  }
};

export const useStep4Register = () => {
  const registerUserMutation = useMutation(registerUser);

  const Step4Query = () => {
    const { data, isLoading, error } = useQuery("step4", () => registerUser);

    return { data, isLoading, error };
  };

  return {
    registerUserMutation,
    Step4Query,
  };
};
