import {QuestionActionTypes} from "./question.types";

const initialState = {
    questions: [],
    totalQuestions: null,
    question: null,
    loading: true,
    error: {}
}

const questionReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case QuestionActionTypes.GET_QUESTIONS:
            return {
              ...state,
              questions: payload.questions,
              totalQuestions: payload.totalItems,
              loading: false
            };
            case QuestionActionTypes.GET_USER_QUESTIONS:
              return {
                ...state,
                questions: payload,
                loading: false
              }
          case QuestionActionTypes.GET_QUESTION:
            return {
              ...state,
              question: payload,
              loading: false
            };
          case QuestionActionTypes.ADD_QUESTION:
            return {
              ...state,
              questions: [payload, ...state.questions],
              loading: false
            };
            case QuestionActionTypes.UPDATE_QUESTION:
              return {
                ...state,
                questions: state.questions.map(question => question._id === payload.id ? {...question, title: payload.title, description: payload.description} : question),
                loading: false
              }
          case QuestionActionTypes.DELETE_QUESTION:
            return {
              ...state,
              questions: state.questions.filter(question => question._id !== payload),
              loading: false
            };
          case QuestionActionTypes.QUESTION_ERROR:
            return {
              ...state,
              error: payload,
              loading: false
            };
          case QuestionActionTypes.LIKE_QUESTION:
            return {
              ...state,
              questions: state.questions.map(question =>
                question._id === payload.id ? { ...question, likes: payload.likes } : question
              ),
              loading: false
            };
        default:
            return state;
    }
}

export default questionReducer;