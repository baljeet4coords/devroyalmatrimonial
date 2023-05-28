import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Step3Formfill = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step3`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit step 4 form");
  }
};

export const useStep3Register = () => {
  const registerUserMutation = useMutation((value: any) =>
    Step3Formfill(value)
  );

  const Step3Query = () => {
    const { data, isLoading, error } = useQuery("step4", () => Step3Formfill);

    return { data, isLoading, error };
  };

  return {
    ...registerUserMutation,
    ...Step3Query(),
    Step3Formfill: (values: any) =>
      new Promise((resolve, reject) => {
        Step3Formfill(values)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      }),
  };
};
