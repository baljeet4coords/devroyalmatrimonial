import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Step1Formfill = async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step1`,
      formData,
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

export const useRegisterUser = (isReduxEmpty: any) => {
  const registerUserMutation = useMutation((formData: FormData) =>
    Step1Formfill(formData)
  );

  const registerUser = async (formData: FormData) => {
    if (formData !== undefined) {
      formData.append("actionType", isReduxEmpty === undefined ? "c" : "u");
    }

    return registerUserMutation.mutateAsync(formData);
  };

  const Step1Query = () => {
    const { data, isLoading, error } = useQuery("step1", () => registerUser);

    return { data, isLoading, error };
  };

  return { registerUser, ...registerUserMutation, ...Step1Query() };
};
