import axios from "axios";



const initialState = {
    title: '',
    description: '',
    questions: [{ question: '', options: ['', '', '' , ''], correctAnswer: 0 }]
  };
  
  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_QUIZ_FORM':
        return { ...state, ...action.payload };
      case 'SUBMIT_QUIZ_FORM':
        const {data} = axios.post("http://localhost:8080/api/v1/create/quiz")
        return initialState; 
      default:
        return state;
    }
  };
  
  export default quizReducer;
  