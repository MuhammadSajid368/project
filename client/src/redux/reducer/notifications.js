import { SEND_NOTIFICATION } from "../constant/allConstants";

const initialState = {
  notifications: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    default:
      return state;
  }
};

export default notificationReducer;
