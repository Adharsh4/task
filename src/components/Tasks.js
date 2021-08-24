/*****************

// Getting all tasks and rendering it

*****************/
import React, {useState, useEffect, useCallback, useMemo} from 'react'
import "./Tasks.css"
import {connect} from 'react-redux';
import { withRouter  } from 'react-router-dom';
import * as actions from "../store/action";
import {Tooltip} from "react-tippy"
import Loader from "react-loader-spinner"

function Tasks(props) {


    useEffect(() => {
        props.getLoginDetails({         // This will be called to  1) Getting Access Token 2) Getting User ID from access token 3) Assigned USER dropdown Display User DETAILS
                                        // because we dont have a seperate component for login for this given task I am caling it in useEffect
            email: "good@test3.com",
            password: "12345678"
        });
        
         
    }, [])

    const editHandler = (e, taskId) => {
        e.preventDefault();
        props.getSingleTask(taskId)
        props.history.push({
            pathname: "/task",
            state: {taskId: taskId}
        })
         
    }

    const dateFormat = (date) => {
        let d = new Date(date);
        let dateString = d.getFullYear() + "/" + ("0" + (d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
        return dateString
    }

    return (
        props.startedSaving ? <Loader type="Oval" color="#00BFFF" height={30} width={30}/> : props.allTasks.map((task, index) => {
            return (
                <div className="all-tasks" key={index}>
                    <div className="avatar">
                        <img src={props.user.icon} className="avatar-image"/>
                    </div>
                    <div className="all-tasks__body">
                        <div className="task__description">
                            <h6 className="description__text">{task.task_msg}</h6>
                            <span className="description__date">{dateFormat(task.task_date)}</span>
                        </div>
                        <div className="task__icons">
                            <Tooltip title="Edit this Task" position="top" trigger="mouseenter" arrow="true">
                                <button onClick={(e) => editHandler(e, task.id)} className="task__icons-button edit-icon" ><i className="fa fa-pencil size-pencil-icon" aria-hidden="true"></i></button>
                            </Tooltip>
                            <button className="task__icons-button"><i className="fa fa-bell" aria-hidden="true"></i></button>
                            <button className="task__icons-button"><i className="fa fa-check" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            );
        })
        
        
    )
}
const mapStateToProps = (state) => {
    return{
        startedSaving: state.startedSaving,
        allTasks: state.allTasks,
        user: state.user,
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return{
        getLoginDetails: (body) => dispatch(actions.getLoginDetails(body)),
        getSingleTask: (taskId) => dispatch(actions.getSingleTask(taskId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tasks));
