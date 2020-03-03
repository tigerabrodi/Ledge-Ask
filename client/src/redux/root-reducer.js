import { combineReducers } from 'redux';

import authReducer from './auth/auth.reducer';
import alertReducer from "./alert/alert.reducer";
import questionReducer from './question/question.reducer';
import answerReducer from './answer/answer.reducer';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
  question: questionReducer,
  answer: answerReducer
});