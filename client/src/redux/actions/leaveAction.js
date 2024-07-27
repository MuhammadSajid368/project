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

import axios from "axios";

export const fetchUserLeaves = (token) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LEAVES_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:8080/api/v1/leaves",
      config
    );

    dispatch({
      type: FETCH_LEAVES_SUCCESS,
      payload: data.leaves,
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAVES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchLeavesByTeacher = (teacherId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LEAVES_REQUEST });

    const response = await axios.get(
      `http://localhost:8080/api/v1/teacher/${teacherId}`
    );

    dispatch({
      type: FETCH_LEAVES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAVES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchLeavesByStudent = (studentId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LEAVES_STUDENT_REQUEST });
    const response = await axios.get(
      `http://localhost:8080/api/v1/student/${studentId}`
    );

    dispatch({
      type: FETCH_LEAVES_STUDENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_LEAVES_STUDENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postLeaveRequest = (leaveData) => async (dispatch) => {
  try {
    dispatch({ type: POST_LEAVE_REQUEST });
    const res = await axios.post(
      "http://localhost:8080/api/v1/user/request-for-leave",
      leaveData
    );
    dispatch({
      type: POST_LEAVE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_LEAVE_FAILURE,
      payload: error.response.data.error,
    });
  }
};
