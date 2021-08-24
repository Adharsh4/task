
import React, { useState, useEffect } from 'react';
import "./Task.css";
import {connect} from 'react-redux';
import { withRouter  } from 'react-router-dom';
import * as actions from "../store/action";
import Loader from "react-loader-spinner"
import {Tooltip} from "react-tippy"

function Task(props) {
    const [focusTime, setFocusTime] = useState(false);
    const [taskDescription, setTaskDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [assignUser, setAssignUser] = useState("");
    const [timeList, setTimeList] = useState(["12:00am", "12:30am", "1:00am", "1:30am","2:00am", "2:30am","3:00am", "3:30am","4:00am", "4:30am","5:00am", "5:30am","6:00am", "6:30am","7:00am", "7:30am","8:00am", "8:30am","9:00am", "9:30am","10:00am", "10:30am","11:00am", "11:30am","12:00pm", "12:30pm", "1:00pm", "1:30pm","2:00pm", "2:30pm","3:00pm", "3:30pm","4:00pm", "4:30pm","5:00pm", "5:30pm","6:00pm", "6:30pm","7:00pm", "7:30pm","8:00pm", "8:30pm","9:00pm", "9:30pm","10:00pm", "10:30pm","11:00pm", "11:30pm"])
    
    
    useEffect(() => {
        if(props.singleTaskValue){
            setTaskDescription(props.singleTask.task_msg);
            setDate(props.singleTask.task_date);
            setTime(timeList[(props.singleTask.task_time/(60*60))*2]);  // logic for converting milliseconds to the actual time from the above list
        }
    }, [props.singleTaskValue])

    const timeHandler = (e) => {
        e.preventDefault();
        setTime(e.target.value);
        // console.log(e.target.value);
        if(e.target.value === "" ){
            setFocusTime(false);
            return;
        }
        setFocusTime(true);
    }

    const saveTask = (e) => {
        e.preventDefault();
        // console.log("aaa", props.fullState, date);
        let timeInSeconds = 0;
        if(time !== ""){
            let timeZone = time.slice(-2);
            let initialPart = time.slice(0, time.length-2);
            let hoursAndMinutes = initialPart.split(":");
            if(timeZone === "am"){
                if(parseInt(hoursAndMinutes[0]) === 12){
                    timeInSeconds = parseInt(hoursAndMinutes[1]*60)
                }else{
                    timeInSeconds = (parseInt(hoursAndMinutes[0])*60*60) + (parseInt(hoursAndMinutes[1])*60)
                }
            }else{
                if(parseInt(hoursAndMinutes[0]) === 12){
                    timeInSeconds = (parseInt(hoursAndMinutes[0])*60*60) + (parseInt(hoursAndMinutes[1])*60)
                }else{
                    timeInSeconds = (parseInt(hoursAndMinutes[0])*60*60) + (parseInt(hoursAndMinutes[1])*60) + (12*60*60)
                }
            }
        }
        // console.log("uuu", timeInSeconds);
        props.addNewTask({
            assigned_user:  props.userId, 
            task_date: date,
            task_time: timeInSeconds,
            is_completed: 0,
            time_zone: 35000,
            task_msg: taskDescription
        }, props.singleTaskValue, props.singleTaskValue ? 
        props.location.state.taskId : 0) // props.fullState.singleTaskValue is for reusing this component(checking if user is updating the task or adding it new)
        props.history.push("/")
        // console.log(props);
        
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        props.history.push("/")
    }

    const deleteHandler = (e) => {
        e.preventDefault();
        const result = window.confirm("Pleae confirm")
        if(result){
            props.deleteTask(props.location.state.taskId)
            props.history.push("/")
        }
    }


    return (
        props.startedSaving ? <Loader type="Oval" color="#00BFFF" height={30} width={30}/> : <div className="task__body">
        <form>
            <div className="row">
                <div className="form-group col-xs-12 col-md-12 mb-3">
                    <label htmlFor="description" className="control-label mb-1">Task Description</label>
                    <div className="input-group">

                        <input className="form-control description__style" id="description" name="description" type="text" placeholder="Follow up" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
                        <span className="custom-style"><i className="fa fa-id-badge"></i></span>
                        
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-xs-12 col-md-6">
                    {/* <label htmlFor="date" className="control-label mb-1">Date</label>
                    <div className="input-group-date">
                        <span className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </span>
                        </span>
                    </div> */}
                    <label htmlFor="date" className="control-label mb-1">Date</label>
                    {/* <i className="fa fa-sort custom-style-for-dropdown" aria-hidden="true"></i> */}
                    <input type="date" className="form-control date-input" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    
                </div>
                <div className="form-group col-xs-12 col-md-6 mb-3">
                <label htmlFor="time" className="control-label mb-1">Time</label>
                    <div className="input-group time__style">
                        {/* <input className={`form-control ${focusTime ? 'check' : ''}`} id="time" list="timeList" onChange={timeHandler} name="time" type="text" placeholder="Time" value={time}  /> */}
                        <span className="custom-style-for-time"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg></span>
                        {/* <input className={`form-control ${focusTime ? 'check' : ''}`} id="time" list="timeList" onChange={timeHandler} name="time" type="text"  */}
                        <input className="form-control check" id="time" list="timeList" onChange={timeHandler} name="time" type="text" 
                        placeholder="Time" value={time} minLength="2" />
                        <datalist id="timeList" className="hide-datalist-icon">
                            {timeList.map((time, index) => {
                                return <option key={index} value={time}/>
                            })}
                            
                        </datalist>
                        
                        {/* <i class="fa fa-clock-o"></i> */}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-xs-12 col-md-12 mb-4">
                    <label htmlFor="assign-user" className="control-label mb-1">Assign User</label>
                    
                    <select className="form-control" value={assignUser} onChange={(e) => setAssignUser(e.target.value)}>
                        {props.fullState.acceptedUsers.length !== 0 ? props.fullState.acceptedUsers.map((accpeptedUser, index) => {
                            return <option key={index} value={accpeptedUser.user_id}>{accpeptedUser.name}</option>
                        }) : null}
                    </select>
                    <i className="fa fa-sort custom-style-for-dropdown" aria-hidden="true"></i>
                </div>
            </div>
            <div className="task-footer">
                {props.singleTaskValue ? <div className="" onClick={deleteHandler}>
                    <Tooltip title="Delete Task" position="top" trigger="mouseenter" arrow="true">
                        <button className="delete__icon"><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </Tooltip>
                        
                </div> : null}
                <div className="task-footer-buttons">
                    <div>
                        <button type="button" className="cancel__button" onClick={cancelHandler}>Cancel</button>
                    </div>
                    <div>
                        <button type="button" className="btn btn-success save__button" onClick={saveTask}>Save</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
        
    )
}


const mapStateToProps = (state) => {
    return{
       fullState: state,
       startedSaving: state.startedSaving,
       singleTaskValue: state.singleTaskValue,
       singleTask: state.singleTask,
       userId: state.userId
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return{ 
        addNewTask: (body, isUpdating, taskId) => dispatch(actions.addNewTask(body, isUpdating, taskId)),
        deleteTask: (taskId) => dispatch(actions.deleteTask(taskId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));

