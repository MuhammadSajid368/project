import { SEND_NOTIFICATION } from "../constant/allConstants";



export const sendNotificationToAllUsers = (eventData) => {
    return {
      type: SEND_NOTIFICATION,
      payload: eventData
    };
  }