import { loadUser } from "../actions/login";
import * as api from "../api";
import * as messages from "../messages";

export const wager = (formData) => async (dispatch) => {
  try {
    const { data } = await api.wager(formData);
    dispatch(loadUser());
    messages.info(data.message);
  } catch (error) {
    messages.error(error?.response?.data?.message);
  }
};
