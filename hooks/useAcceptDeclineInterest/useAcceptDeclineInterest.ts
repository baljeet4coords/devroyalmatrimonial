import { useQuery, useMutation } from "react-query";
import axios from "axios";

const interestAcceptDecline = async (values: any) => {
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

export const useAcceptDecline = () => {
  const useAcceptDeclineMutation = useMutation(interestAcceptDecline);

  const AcceptDeclineQuery = () => {
    const { data, isLoading, error } = useQuery(
      "interestAcceptDecline",
      () => interestAcceptDecline
    );

    return { data, isLoading, error };
  };

  return {
    useAcceptDeclineMutation,
    AcceptDeclineQuery,
  };
};
