export const actions = {
  START_LOADER: "start loader",
  END_LOADER: "end loader",
  ADD_NOTE: "add new note"
};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};
