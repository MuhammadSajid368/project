import axios from "axios";
import {
  ADD_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_COMING_EVENTS_REQUEST,
  FETCH_COMING_EVENTS_SUCCESS,
  FETCH_COMING_EVENTS_FAILURE,
  EVENT_DETAILS,
  EVENT_SUCCESS,
  EVENT_FAILURE,
} from "../constant/allConstants";

export const eventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/event/${id}`
    );
    dispatch({
      type: EVENT_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: EVENT_FAILURE,
      payload: error.response.data.message,
    });
  }
};
export const addEvent = (newEvent) => async (dispatch) => {
  try {
    dispatch({ type: ADD_EVENT_REQUEST });
    // Make API request to add the event
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/create`,
      newEvent
    );

    dispatch({
      type: ADD_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EVENT_FAILURE,
      payload: error.response.data.message || "Something went wrong",
    });
  }
};

export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENTS_REQUEST });
    // Make API request to add the event
    const { data } = await axios.get(`http://localhost:8080/api/v1/get/events`);

    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_EVENTS_FAILURE,
      payload: error.response.data.message || "Something went wrong",
    });
  }
};

export const fetchComingEvents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COMING_EVENTS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/upcoming/events`
    );
    dispatch({
      type: FETCH_COMING_EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMING_EVENTS_FAILURE,
      payload: error.response.data.message || "Something went wrong",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
