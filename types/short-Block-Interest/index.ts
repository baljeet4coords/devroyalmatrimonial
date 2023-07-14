import { ICardResponse } from "../cardResponse/cardResponse";

export interface ICardViewResponse {
  userid: number;
  usercard: ICardResponse;
}


export interface ICardViewResponseInterest {
  userid: number;
  status: string;
  usercard: ICardResponse;
}