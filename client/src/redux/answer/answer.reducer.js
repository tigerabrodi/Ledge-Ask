import {AnswerActionTypes} from "./answer.types"

const initialState = {
    answers: [],
    error: {},
    loading: true
}

const answerReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch(type) {
        case AnswerActionTypes.GET_ANSWERS:
            return {
                ...state,
                answers: payload,
                loading: false
            }
            case AnswerActionTypes.ADD_ANSWER:
                return {
                    ...state,
                    answers: [payload, ...state.answers],
                    loading: false
                }
                case AnswerActionTypes.UPDATE_ANSWER:
                    return {
                      ...state,
                      answers: state.answers.map(answer => answer._id === payload.id ? {...answer, text: payload.text} : answer),
                      loading: false
                    }
                    case AnswerActionTypes.DELETE_ANSWER:
                        return {
                            ...state,
                            answers: state.answers.filter(answer => answer._id !== payload),
                            loading: false
                        }
            case AnswerActionTypes.ANSWER_ERROR:
                return {
                  ...state,
                  error: payload,
                  loading: false
                };
                default:
                    return state;
    }
}

export default answerReducer;