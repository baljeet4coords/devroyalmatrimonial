import axios from "axios";
import { useMutation } from "react-query";

export const useSignupMutation = () => {
  return useMutation((formPayload) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_URL}/registerUser/step2}`,
      formPayload
    );
  });
};
