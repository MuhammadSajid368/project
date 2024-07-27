import axios from "axios";

// reducers/assignmentReducer.js
const initialState = {
    title: '',
    description: '',
    deadline: ''
  };
  
  const assignmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_ASSIGNMENT_FORM':
        return { ...state, ...action.payload };
      case 'SUBMIT_ASSIGNMENT_FORM':
        const {data} = axios.post("http://localhost:2000/api/v1/create/assignment")
        return initialState; // Reset form state after submission
      default:
        return state;
    }
  };
  
  export default assignmentReducer;
  