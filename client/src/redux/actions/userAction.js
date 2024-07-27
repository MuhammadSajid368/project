import axios from "axios";
import {
  ALL_USERS_FAILURE,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_USER_FAILD,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_FEACULTY_FAILURE,
  FETCH_FEACULTY_REQUEST,
  FETCH_FEACULTY_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constant/allConstants";

// Update user request
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "http://localhost:8080/api/v1/update/user",
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.user,
    });

    dispatch(loadUser());

    toast.success("Profile Updated Successfully");
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.error,
    });

    toast.error(error.response.data.error);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axios.post("/login", { email, password });

    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("auth", JSON.stringify(data));
    // Optionally, you can dispatch additional actions here, like redirecting the user
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.response.data.error });
  }
};

export const fetchUsers =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/admin/all/users`
      );

      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    await axios.delete(`http://localhost:8080/api/v1/delete-user/${userId}`);

    dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/admin/user/${id}`
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_REQUEST });
  try {
    const response = await axios.get("/all/students");
    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchTeachers = () => async (dispatch) => {
  dispatch({ type: FETCH_TEACHERS_REQUEST });
  try {
    const response = await axios.get("/all/teachers");
    dispatch({
      type: FETCH_TEACHERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TEACHERS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchFeaculty = () => async (dispatch) => {
  dispatch({ type: FETCH_FEACULTY_REQUEST });
  try {
    const response = await axios.get("/all/staff");
    dispatch({
      type: FETCH_FEACULTY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_FEACULTY_FAILURE,
      payload: error.message,
    });
  }
};
