import {addNewTask ,updateTask } from './server'

(async function myFunc(){
    await addNewTask({
        name:"My Task",
        id:"12347"
    });

    await updateTask({
        name:"My Task-UPDATED!!!",
        id:"12347"
    });    
})();
