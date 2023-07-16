import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { selectmatchMakingSuccess } from "../../ducks/matchMaking/selectors";
import { useSelector } from "react-redux";
import { IMatchMakingResponse } from "../../types/matchmaking/matchmaking";

const sendInterest = async (values: any, matchMakingResponse?: any) => {
  const matchMakingData: IMatchMakingResponse[] =
    matchMakingResponse.jsonResponse;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/interestList/setUserInterest`,
      values
    );

    const userIdInterestSend = response.data.jsonResponse.toUserID;
    const status = response.data.jsonResponse.status;

    const updatedMatchMakingData =
      matchMakingData &&
      matchMakingData.map((user) => {
        if (user.userid === userIdInterestSend) {
          return {
            ...user,
            interest: {
              Receive: user.interest.Receive,
              Send: status,
            },
          };
        }
        return user;
      });


    const updatedMatchMakingResponse = {
      ...matchMakingResponse,
      jsonResponse: updatedMatchMakingData,
    };

    const allset ={
        matchmaking :updatedMatchMakingResponse,
        apiResponse : response.data
    }

    return allset;
  } catch (error) {
    throw new Error("Failed to send interest !!");
  }
};

export const useSendInterest = () => {
  const matchMakingResponse = useSelector(selectmatchMakingSuccess);

  const useSendInterestMutation = useMutation((values: any) =>
    sendInterest(values, matchMakingResponse)
  );

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
