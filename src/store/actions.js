export const actions = {
  START_LOADER: "start loader",
  END_LOADER: "end loader",
  ADD_NOTE: "add new note",
  SET_THEME: "light"
};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};
