export const actions = {
  START_LOADER: "start loader",
  END_LOADER: "end loader",
  ADD_NOTE: "add new note",
  SET_THEME: "light",
  USER_LOGIN: "login user",
  USER_ID: "user id"
};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};
