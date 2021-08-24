import * as actionTypes from './actionTypes';

import axios from 'axios';

export const setLoginDetails = (loginDetails) => {
    return {
        type: actionTypes.SET_LOGINDETAILS,
        loginDetails: loginDetails
    }
}


export const setUserId = (userId) => {
    return {
        type: actionTypes.SET_USERID,
        userId: userId
    }
}

export const setAcceptedUsers = (acceptedUsers) => {
    return {
        type: actionTypes.SET_ACCEPTEDUSERS,
        acceptedUsers: acceptedUsers
    }
}

export const setAllTasks = (allTasks) => {
    return {
        type: actionTypes.SET_ALLTASKS,
        allTasks: allTasks
    }
}

export const setSingleTaskValue = (singleTask) => {
    return {
        type: actionTypes.SET_SINGLETASK,
        singleTask: singleTask
    }
}

export const getLoginDetails = (body) => {
    return (dispatch) => {
        dispatch(startSaving())
        axios.post('https://stage.api.sloovi.com/login', body, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }).then((response) => {
            // console.log(response.data.results)
            dispatch(setLoginDetails(response.data.results))
            dispatch(getUserId("https://stage.api.sloovi.com/user?company_id=company_0336d06ff0ec4b3b9306ddc288482663&product=outreach"))
        }).catch((error) => {
            
            alert(error)
        })
    }
}

export const getUserId = (url) => {
    return (dispatch, getState) => {
        const user = getState();
            axios.get(url, {
                headers:{
                    'Authorization': 'Bearer ' + user.user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                dispatch(setUserId(response.data.results.user_id));
                dispatch(getAcceptedUsers("https://stage.api.sloovi.com/team?company_id=company_0336d06ff0ec4b3b9306ddc288482663&product=outreach"));
            }).catch(err => {
                alert(err)
            })
        
    }
}

export const getAcceptedUsers = (url) => {
    return (dispatch, getState) => {
        const user = getState();
        axios.get(url, {
            headers:{
                'Authorization': 'Bearer ' + user.user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(response.data.results.data)
            dispatch(setAcceptedUsers(response.data.results.data));
            dispatch(getAllTasks("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663"))
        }).catch(err => {
            alert(err.response)
        })
        
    }
}

export const getAllTasks = (url) => {
    return (dispatch, getState) => {
        
        const user = getState();
        axios.get(url, {
            headers:{
                'Authorization': 'Bearer ' + user.user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(response.data.results)
            dispatch(setAllTasks(response.data.results));
        }).catch(err => {
            alert(err.response)
        })
        
    }
}

export const startSaving = () => {
    return {
        type: actionTypes.START_SAVE,
    }
}


export const addNewTask = (body, isUpdating, taskId) => {
    return (dispatch, getState) => {
        dispatch(startSaving());
        const user = getState();
        if(!isUpdating){
            axios.post("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663", body, {
                headers:{
                    'Authorization': 'Bearer ' + user.user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // console.log(user.user.token)
                // console.log(response.data.results)
                dispatch(getAllTasks("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663"));
            }).catch(err => {
                alert(err.response)
            })
        }else{
            axios.put(`https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${taskId}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`, body, {
                headers:{
                    'Authorization': 'Bearer ' + user.user.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // console.log(user.user.token)
                // console.log(response.data)
                dispatch(getAllTasks("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663"));
            }).catch(err => {
                alert(err.response)
            })
        }
        
    }
}

export const getSingleTask = (taskId) => {
    return (dispatch, getState) => {
        dispatch(startSaving())
        const user = getState();
        axios.get(`https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${taskId}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`, {
            headers:{
                'Authorization': 'Bearer ' + user.user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(taskId)
            // console.log(response.data.results)
            dispatch(setSingleTaskValue(response.data.results));
        }).catch(err => {
            alert(err.response)
        })
        
    }
}


export const deleteTask = (taskId) => {
    return (dispatch, getState) => {
        dispatch(startSaving())
        const user = getState();
        axios.delete(`https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${taskId}?company_id=company_0336d06ff0ec4b3b9306ddc288482663`, {
            headers:{
                'Authorization': 'Bearer ' + user.user.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(taskId)
            // console.log(response)
            dispatch(getAllTasks("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663"))
            // dispatch(setSingleTaskValue(response.data.results));
        }).catch(err => {
            alert(err.response)
        })
        
    }
}