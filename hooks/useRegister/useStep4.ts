import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Step4Formfill = async (values: any) => {
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
  const registerUserMutation = useMutation((value: any) =>
    Step4Formfill(value)
  );

  const Step4Query = () => {
    const { data, isLoading, error } = useQuery("step4", () => Step4Formfill);

    return { data, isLoading, error };
  };

  return {
    ...registerUserMutation,
    ...Step4Query(),
    Step4Formfill: (values: any) =>
      new Promise((resolve, reject) => {
        Step4Formfill(values)
          .then((data) => resolve(data))
          .catch((error) => reject(error));
      }),
  };
};
