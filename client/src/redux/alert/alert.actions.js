import uuidv4 from "uuid/v4";
import {AlertActionTypes} from "./alert.types";

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuidv4();
    dispatch({
      type: AlertActionTypes.SET_ALERT,
      payload: { msg, alertType, id }
    });
  
    setTimeout(() => dispatch({ type: AlertActionTypes.REMOVE_ALERT, payload: id }), timeout);
  };