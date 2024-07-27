import {
  ADD_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  CLEAR_ERRORS,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  FETCH_COMING_EVENTS_REQUEST,
  FETCH_COMING_EVENTS_SUCCESS,
  FETCH_COMING_EVENTS_FAILURE,
  EVENT_FAILURE,
  EVENT_SUCCESS,
  EVENT_DETAILS,
} from "../constant/allConstants";

const initialState = {
  events: [],
  upcomingEvents: [],
  loading: false,
  error: null,
  event: {},
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        event: action.payload,
        error: null,
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.events,
      };
      case EVENT_DETAILS:
        return {
          ...state,
          loading: true,
        };
      case EVENT_SUCCESS:
        return {
          ...state,
          loading: false,
          event: action.payload,
        };
      case EVENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
        error: null,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case FETCH_COMING_EVENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COMING_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                upcomingEvents: action.payload,
                error: null,
            };
        case FETCH_COMING_EVENTS_FAILURE:
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

export const eventDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};