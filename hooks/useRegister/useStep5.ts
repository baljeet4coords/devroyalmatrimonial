import { useQuery, useMutation } from "react-query";
import axios from "axios";

const registerUser = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step5`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 5 form");
  }
};

export const useStep5Register = () => {
  const registerUserMutation = useMutation(registerUser);

  const Step5Query = () => {
    const { data, isLoading, error } = useQuery("step5", () => registerUser);

    return { data, isLoading, error };
  };

  return {
    registerUserMutation,
    Step5Query,
  };
};
