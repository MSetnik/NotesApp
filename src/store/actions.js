export const actions = {
  START_LOADER: "start loader",
  END_LOADER: "end loader",
  ADD_NOTE: "add new note",
  SET_THEME: "light",
  USER_LOGIN: "login user",
  NOTES_LOADER: "fetch notes loader",
  ADD_LOCAL_NOTES: "add local notes"
};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};
