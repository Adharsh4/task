
import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actions from "../store/action";
import {Tooltip} from "react-tippy"

function Header(props) {

    useEffect(() => {
        if(props.taskCount.user){
            props.getAllTasks("https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=company_0336d06ff0ec4b3b9306ddc288482663");
        }
    }, [props.taskCount.user])

    const newTaskHandler = (e) => {
        e.preventDefault();
        props.history.push("/task");
    }
    return (
        <div className="task__header">
            <span className="small-text"><span className="task__text">TASKS</span> &nbsp;{props.taskCount.allTasks.length}</span>
            <Tooltip title="New Task" position="top" trigger="mouseenter" arrow="true">
                <button onClick={newTaskHandler} className="plus-icon">+</button>
            </Tooltip>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskCount: state
    }
}

 
const mapDispatchToProps = (dispatch) => {
    return{
        getAllTasks: (url) => dispatch(actions.getAllTasks(url))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
