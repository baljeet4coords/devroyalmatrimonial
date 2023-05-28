import { useQuery, useMutation } from "react-query";
import axios from "axios";

const registerUser = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 3 form");
  }
};

export const useStep3Register = () => {
  const registerUserMutation = useMutation(registerUser);

  const Step3Query = () => {
    const { data, isLoading, error } = useQuery("step3", () => registerUser);

    return { data, isLoading, error };
  };

  return {
    registerUserMutation,
    Step3Query,
  };
};
