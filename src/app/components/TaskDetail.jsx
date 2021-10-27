import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const TaskDetail = ({
    id,
    comments,
    task,
    isComplete,
    groups
}) => (
<div>
    <h2>
        Details
    </h2>
    <button>Complete / Reopen Task</button>

</div>
)

const mapStateToProps = (state, ownProps)=>{
    let id = ownProps.match.params.id;
    let task = state.tasks.find(task=>task.id === id);
    let groups = state.groups;

    return{
        id,
        task,
        groups,
        isComplete:task.isComplete
    }
}

export const ConnectTaskDetail = connect(mapStateToProps)(TaskDetail);