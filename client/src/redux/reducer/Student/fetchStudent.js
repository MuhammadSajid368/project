import axios from "axios";
import { FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_SUCCESS } from "../../constant/allConstants";


const initialState = {
    students: [],
    loading: false,
    error: null,
    user: {},
  };
  

export const studentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                students: action.payload.students,
                error: ''
            };
        case FETCH_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                students: [],
                error: action.payload
            };
        default:
            return state;
    }
};

