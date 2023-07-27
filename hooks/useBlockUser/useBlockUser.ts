import { useQuery, useMutation } from "react-query";
import axios from "axios";

const BlockUser = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/blockUser/setUserBlock`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Block User !!");
  }
};

export const useBlockUser = () => {
  const useBlockUserMutation = useMutation(BlockUser);

  const BlockUserQuery = () => {
    const { data, isLoading, error } = useQuery(
      "BlockUser",
      () => BlockUser
    );

    return { data, isLoading, error };
  };

  return {
    useBlockUserMutation,
    BlockUserQuery,
  };
};
