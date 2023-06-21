import { useQuery, useMutation } from "react-query";
import axios from "axios";

const sendInterest = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/interestList/setUserInterest`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to send interest !!");
  }
};

export const useSendInterest = () => {
  const useSendInterestMutation = useMutation(sendInterest);

  const SendInterestQuery = () => {
    const { data, isLoading, error } = useQuery(
      "sendInterest",
      () => sendInterest
    );

    return { data, isLoading, error };
  };

  return {
    useSendInterestMutation,
    SendInterestQuery,
  };
};
