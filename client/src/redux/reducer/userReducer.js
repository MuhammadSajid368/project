import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  ALL_USERS_FAILURE,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  FETCH_TEACHERS_FAILURE,
  FETCH_FEACULTY_REQUEST,
  FETCH_FEACULTY_SUCCESS,
  FETCH_FEACULTY_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILD,
} from "../constant/allConstants.js";

const initialState = {
  users: [],
  loading: false,
  error: null,
  user: {},
  staff: [],
  teachers: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST: return { loading: true, users: [] };
    case ALL_USERS_SUCCESS: return { loading: false, users: action.payload.users, userCount: action.payload.usersCount, resPerPage: action.payload.resPerPage, error: null };
    case ALL_USERS_FAILURE: return { loading: false, error: action.payload};
    case DELETE_USER_REQUEST : return {loading : true }
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        user: action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_REQUEST: return { ...state, loading: true };
    case DELETE_USER_SUCCESS: return { ...state, loading: false,  users: state.users.filter(user => user._id !== action.payload)};
    case DELETE_USER_FAILD: return { ...state, loading: false, error: action.payload};
    case CLEAR_ERRORS: return { ...state, error: null };
    default: return state;
  }
};

export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_DETAILS_FAILURE:
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
    default:
      return state;
  }
};

export const teacherReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.payload.teachers,
        error: "",
      };
    case FETCH_TEACHERS_FAILURE:
      return {
        ...state,
        loading: false,
        teachers: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const feacultyReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEACULTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FEACULTY_SUCCESS:
      return {
        ...state,
        loading: false,
        staff: action.payload.staff,
        error: "",
      };
    case FETCH_FEACULTY_FAILURE:
      return {
        ...state,
        loading: false,
        staff: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
