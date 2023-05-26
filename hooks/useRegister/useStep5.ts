import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Step5Formfill = async (values: any) => {
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
  const registerUserMutation = useMutation((value: any) =>
    Step5Formfill(value)
  );

  const Step5Query = () => {
    const { data, isLoading, error } = useQuery("step5", () => Step5Formfill);

    return { data, isLoading, error };
  };

  return {
    ...registerUserMutation,
    ...Step5Query(),
    Step5Formfill: (values: any) =>
      new Promise((resolve, reject) => {
        Step5Formfill(values)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      }),
  };
};
