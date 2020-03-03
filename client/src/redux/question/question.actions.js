import {setAlert} from "../alert/alert.actions";
import {QuestionActionTypes} from "./question.types"
import axios from "axios";


// Get questions
export const getQuestions = (page, category) => async dispatch => {
  try {
    const res = await axios.get(`/questions/${category}?page=${page}`);
    
      dispatch({
        type: QuestionActionTypes.GET_QUESTIONS,
        payload: {questions: res.data.questions, totalItems: res.data.totalItems}
      });
    } catch (err) {
      dispatch({
        type: QuestionActionTypes.QUESTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


// Ask a Question
export const askQuestion = ({title, description, category}, history) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({title, description, category});
  
    try {
      const res = await axios.post('/questions', body, config);
  
      dispatch({
        type: QuestionActionTypes.ADD_QUESTION,
        payload: res.data
      });
  
      dispatch(setAlert('You Successfully asked your question', 'success'));
      history.push("/dashboard")
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
  };

  // Get a single Question
export const getQuestion = id => async dispatch => {
    try {
      const res = await axios.get(`/questions/${id}`);
      dispatch({
        type: QuestionActionTypes.GET_QUESTION,
        payload: res.data
      });
    } catch (err) {
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
  };


// Get a questions belonging to a user
export const getUserQuestions = id => async dispatch => {
  try {
    const res = await axios.get(`/questions/user/${id}`);
    dispatch({
      type: QuestionActionTypes.GET_USER_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
      dispatch({
          type: QuestionActionTypes.QUESTION_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
  }
};


// Like a question
export const likeQuestion = (id, authenticated, history) => async dispatch => {
    if (!authenticated) {
        return history.push("/login")
    }
    try {
      const res = await axios.put(`/questions/like/${id}`);
      dispatch({
        type: QuestionActionTypes.LIKE_QUESTION,
        payload: { id, likes: res.data }
      });
    } catch (err) {
        const errors = err.response.data.errors;
  
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
  };

  // Update a Question
  export const updateQuestion = ({title, description}, id, history) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({title, description})

    try {
      const res = await axios.put(`/questions/${id}`, body, config)

      dispatch({
        type: QuestionActionTypes.UPDATE_QUESTION,
        payload: {title, description, id}
      });
      dispatch(setAlert("Successfully updated your question", "success"))
      history.push("/dashboard")
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: QuestionActionTypes.QUESTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }

// Delete A Question
export const deleteQuestion = id => async dispatch => {
    try {
      await axios.delete(`/questions/${id}`);
  
      dispatch({
        type: QuestionActionTypes.DELETE_QUESTION,
        payload: id
      });
  
      dispatch(setAlert('Deleted your question successfully', 'success'));
    } catch (err) {
        dispatch({
            type: QuestionActionTypes.QUESTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
          });
    }
  };  