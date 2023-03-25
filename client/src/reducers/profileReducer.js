import { GET_PROFILE, PROFILE_ERROR, ERRORS } from "../actions/types";
const initialState = {
  profile: null,
  error: {},
  errors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case ERRORS:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}
