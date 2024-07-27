import { createStore , combineReducers , applyMiddleware } from "redux"
import {thunk} from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { feacultyReducers, teacherReducers, userDetailsReducer, usersReducer } from "./reducer/userReducer"
import { courseDetailsReducer, courseReducer } from "./reducer/courseReducer"
import leaveReducer from "./reducer/leaveReducer"
import { eventReducer} from './reducer/eventReducer'
import { studentReducer } from "./reducer/Student/fetchStudent"



const reducer = combineReducers({
    users : usersReducer ,
    user : userDetailsReducer ,
    students : studentReducer ,
    teachers : teacherReducers ,
    staff : feacultyReducers ,
    events: eventReducer,
    courses  : courseReducer,
    course  : courseDetailsReducer,
    leaves : leaveReducer ,

})
let initalState = {}
const middleware = [thunk]
const store = createStore(reducer , initalState , composeWithDevTools(applyMiddleware(...middleware)))

export default store