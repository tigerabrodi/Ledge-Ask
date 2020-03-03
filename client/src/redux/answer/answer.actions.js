import {AnswerActionTypes} from "./answer.types";
import axios from "axios";
import {setAlert} from "../alert/alert.actions";


// Get Answers
export const getAnswers = (questionId) => async dispatch => {
    try {
      const res = await axios.get(`/answers/${questionId}`);
      
        dispatch({
          type: AnswerActionTypes.GET_ANSWERS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: AnswerActionTypes.ANSWER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    };



    export const addAnswer = (text, questionId) => async dispatch => {
      const config = {
        headers: {
          "Content-Type": "application/json"
        } 
      }
      const body = JSON.stringify({text});
      
    try {
        const res = await axios.post(`/answers/${questionId}`, body, config);
        dispatch({
            type: AnswerActionTypes.ADD_ANSWER,
            payload: res.data
          });
          dispatch(setAlert("Successfully added your answer to this question", "success"));
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
        dispatch({
            type: AnswerActionTypes.ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const updateAnswer = (text, id) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const body = JSON.stringify({text});

  try {
    const res = await axios.put(`/answers/${id}`, body, config);
      dispatch({
        type: AnswerActionTypes.UPDATE_ANSWER,
        payload: {id, text}
    })
    dispatch(setAlert("Successfully updated your answer", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
  
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: AnswerActionTypes.ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  })
  }
}

export const deleteAnswer = (id) => async dispatch => {
  try {
    await axios.delete(`/answers/${id}`);
    dispatch({
      type: AnswerActionTypes.DELETE_ANSWER,
      payload: id
    });
    dispatch(setAlert("Successfully delete your answer", "success"))
  } catch (err) {
    dispatch({
      type: AnswerActionTypes.ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
  })
  }
}