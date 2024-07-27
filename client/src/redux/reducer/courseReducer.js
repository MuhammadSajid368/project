import {
  ALL_COURSES_REQUEST,
  ALL_COURSES_SUCCESS,
  ALL_COURSES_FAILURE,
  CLEAR_ERRORS,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAILURE,
} from "../constant/allConstants.js";

const initialState = {
  courses: [],
  course: {},
  loading: false,
  error: null,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COURSES_REQUEST:
      return {
        loading: true,
        courses: [],
      };
    case ALL_COURSES_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        courseCount: action.payload.courseCount,
        error: null,
      };
    case ALL_COURSES_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
      case COURSE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COURSE_DETAILS_SUCCESS:
      return {
        loading: false,
        course: action.payload,
      };
    case COURSE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
};