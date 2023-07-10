import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";
import { IMatchMakingResponse } from "../../types/matchmaking/matchmaking";

const Shortlist = async (values: any, matchMakingResponse?: any) => {
  const matchMakingData: IMatchMakingResponse[] =
    matchMakingResponse.jsonResponse;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/shortlist/setUserShortlist`,
      values
    );

    const userIdShortlist = response.data.jsonResponse.useridShortlist;
    const status = response.data.jsonResponse.status;

    const updatedMatchMakingData = matchMakingData.map((user) => {
      if (user.userid === userIdShortlist) {
        return {
          ...user,
          shortlist: status == "Y" ? 1 : 0,
        };
      }
      return user;
    });
    const updatedMatchMakingResponse = {
      ...matchMakingResponse,
      jsonResponse: updatedMatchMakingData,
    };
    return updatedMatchMakingResponse;
  } catch (error) {
    throw new Error("Failed to Shortlist User !!");
  }
};

export const useShortlist = () => {

  const matchMakingResponse = useSelector(selectmatchMakingSuccess);
  
  const useShortlistMutation = useMutation((values: any) =>
    Shortlist(values, matchMakingResponse)
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
