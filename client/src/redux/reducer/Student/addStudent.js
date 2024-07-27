import {
    SIGNUP_STUDENT_REQUEST,
    SIGNUP_STUDENT_SUCCESS,
    SIGNUP_STUDENT_FAILURE,
  } from "../../constant/studentConstants";
  
  const initialState = {
    students: [],
    isLoading: false,
    error: null,
  };
  
  export const addStudent = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_STUDENT_REQUEST:
        return {
          // ...state,
          isLoading: true,
          products : [] ,
          error: null,
        };
      case SIGNUP_STUDENT_SUCCESS:
        return {
          // ...state,
          isLoading: false,
          students: action.payload.students,
          error: null,
        };
      case SIGNUP_STUDENT_FAILURE:
        return {
          // ...state,
          isLoading: false,
          error: action.payload,
          error: true,
        };
      default:
        return state; 
    }
  };
  