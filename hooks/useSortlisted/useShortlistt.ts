import { useQuery, useMutation } from "react-query";
import axios from "axios";

const Shortlist = async (values: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/shortlist/setUserShortlist`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Shortlist User !!");
  }
};

export const useShortlist = () => {
  
  const useShortlistMutation = useMutation((values: any) =>
    Shortlist(values)
  );
  const ShortlistQuery = () => {
    const { data, isLoading, error } = useQuery("Shortlist", () => Shortlist);

    return { data, isLoading, error };
  };

  return {
    useShortlistMutation,
    ShortlistQuery,
  };
};