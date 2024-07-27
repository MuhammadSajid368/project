import {
  CLEAR_ERRORS,
  FETCH_LEAVES_FAILURE,
  FETCH_LEAVES_REQUEST,
  FETCH_LEAVES_STUDENT_FAILURE,
  FETCH_LEAVES_STUDENT_REQUEST,
  FETCH_LEAVES_STUDENT_SUCCESS,
  FETCH_LEAVES_SUCCESS,
  POST_LEAVE_FAILURE,
  POST_LEAVE_REQUEST,
  POST_LEAVE_SUCCESS,
} from "../constant/allConstants";

const initialState = {
  loading: false,
  error: null,
  leave: null,
};

const leaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LEAVE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_LEAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        leave: action.payload,
      };
    case POST_LEAVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_LEAVES_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEAVES_SUCCESS:
      return { ...state, loading: false, leaves: action.payload };
    case FETCH_LEAVES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_LEAVES_STUDENT_REQUEST:
      return { ...state, loading: true };
    case FETCH_LEAVES_STUDENT_SUCCESS:
      return { ...state, loading: false, leaves: action.payload };
    case FETCH_LEAVES_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default leaveReducer;
