import axios from "axios";
import {
  ALL_COURSES_FAILURE,
  ALL_COURSES_REQUEST,
  ALL_COURSES_SUCCESS,
  CLEAR_ERRORS,
  COURSE_DETAILS_FAILURE,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
} from "../constant/allConstants";

export const fetchCourses = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COURSES_REQUEST });
    const api = "http://localhost:8080/api/v1/courses";

    const { data } = await axios.get(api);
    console.log(data);
    dispatch({
      type: ALL_COURSES_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_COURSES_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const courseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/course/${id}`
    );
    console.log(data);
    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data.course,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};
