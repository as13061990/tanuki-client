import { Modals } from "./scenes/Modal";

type BasicRequest = { tgId: string; };
type BasicResponse = { error: boolean; };

type CheckUserRequest = {
  tgId: string;
  name: string;
};

type CheckUserResponse = {
  points: integer;
  attempts: integer;
};


type GetRaitingsResponse = {
  raitings: RaitingsUser[];
  user: RaitingsUser;
};

type RaitingsUser = {
  place: integer;
  name: string;
  points: integer;
};

type SetNewScoreRequest = {
  tgId: string;
  points: integer;
};

type GetRaitingsRequest = BasicRequest;
type StartGameRequest = BasicRequest;
type StartGameResponse = BasicResponse;
type SetNewScoreResponse = BasicResponse;

type State = {
  tgId: string;
  name: string;
  attempts: integer;
  modal: Modals;
  currentPoints: integer;
};


export {
  CheckUserRequest,
  CheckUserResponse,
  GetRaitingsRequest,
  GetRaitingsResponse,
  StartGameRequest,
  StartGameResponse,
  SetNewScoreRequest,
  SetNewScoreResponse,
  RaitingsUser,
  State,
};