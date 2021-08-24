import * as actionTypes from './actionTypes';


const initialState = {
    user: null,
    userId: "",
    acceptedUsers: [],
    allTasks: [],
    singleTask: null,
    singleTaskValue: false,
    startedSaving: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_LOGINDETAILS:
            return {
                
                ...state,
                user: action.loginDetails
            }
        case actionTypes.SET_USERID:
            return {
                ...state,
                userId: action.userId
            }
        case actionTypes.SET_ACCEPTEDUSERS:
            // console.log(action.acceptedUsers)
            return {
                ...state,
                acceptedUsers: action.acceptedUsers.filter(user => user.user_status === "accepted")
            }
        case actionTypes.SET_ALLTASKS:
            return{
                ...state,
                allTasks: action.allTasks,
                singleTaskValue: false,
                startedSaving: false
            }
        case actionTypes.SET_SINGLETASK:
            return {
                ...state,
                singleTask: action.singleTask,
                singleTaskValue: true,
                startedSaving: false
            }
        case actionTypes.START_SAVE:
            return{
                ...state,
                startedSaving: true
            }
        default:
            return state;    
    }
}

export default reducer;