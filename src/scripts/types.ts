type BasicRequest = { tgId: string; };
type BasicResponse = { error: boolean; };

type CheckUserRequest = {
  tgId: string;
  name: string;
};

type CheckUserResponse = {
  points: integer,
  attempts: integer,
};

type GetRaitingsRequest = {
  tgId: string
};

type GetRaitingsResponse = {
  raitings: RaitingsUser[],
  user: RaitingsUser,
};

type RaitingsUser = {
  place: integer,
  name: string,
  points: integer,
};

type StartGameRequest = BasicRequest;
type StartGameResponse = BasicResponse;
type SetNewScoreRequest = BasicRequest;
type SetNewScoreResponse = BasicResponse;

export {
  CheckUserRequest,
  CheckUserResponse,
  GetRaitingsRequest,
  GetRaitingsResponse,
  StartGameRequest,
  StartGameResponse,
  SetNewScoreRequest,
  SetNewScoreResponse,
};