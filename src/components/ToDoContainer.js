import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreateToDo from './CreateToDo';
import ToDoItem from './ToDoItem'


const ToDoContainer = () =>{
    const [isTask, setTask] = useState([]);
    const [newTask, setNewTask] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [resetForm, setResetForm] = useState(false);
    const [taskComplet, setTaskComplet] = useState({id:'', isCompleted:false});

    const HandlerTask = (data) =>{
        setNewTask(data);
    }

    //  Method POST
    useEffect(()=>{
        if(newTask){
            const res = axios({
                url:'https://todos-academlo.herokuapp.com/api/todo',
                data:newTask,
                method:'POST',
            })
            res.then((respose)=>{
                setTask([...respose.data, ...isTask])
                setResetForm(true);
            })
        }         
    },[newTask])
    // Method GET
    useEffect(()=>{
        const res =  axios.get('https://todos-academlo.herokuapp.com/api/todos')
        res.then((respose) => {
            setTask(respose.data.todos);
        })
    },[])

    //Method DELETE
    useEffect(()=>{
        if(idToDelete){
            const res = axios.delete(`https://todos-academlo.herokuapp.com/api/todo/${idToDelete}`)
            res.then(() => {
                setTask((prevState) => prevState.filter((value) => value._id !== idToDelete))
            })
        }
        return () => {
            setIdToDelete(null);
        }
    },[idToDelete])

    // Method PUT
    useEffect(()=>{
        if(taskComplet){
            const res = axios.put(`https://todos-academlo.herokuapp.com/api/todo/${taskComplet.id}`,taskComplet);
            res.then((respose) =>{
                setTask((prevState) =>{
                    prevState.map((task)=>{
                        if(task._id === respose.data._id ){
                            return task;
                        }
                        return {...respose.data};
                    })
                })
            })
            setTaskComplet(null);
        }
    },[taskComplet])

    

    return(
        <>
            <header>
                <h1>Task</h1>
            </header>
            <div className='container'>
                <div className='container-create'>
                    <h2>Create Task</h2>
                    <CreateToDo
                        resetForm={resetForm}
                        task='Task'
                        student='Student'
                        onCreateTask={HandlerTask}
                        buttonText='Submit'
                    />
                </div>
                <div className='cotainer-task'>
                        <h2>Tasks Incompleted</h2>
                    {isTask.map((value)=>(
                        <>
                            <div className='task'>
                                <ToDoItem
                                    name={value._id}
                                    onCheck={() => setTaskComplet({
                                        id: value._id,
                                        isCompleted: true,
                                    })}
                                />
                                <span>{value.task}</span>
                                <span>{value.student}</span>
                                <button className='btn-trash' onClick={() => setIdToDelete(value._id)}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </>
                    ))}
                </div>
            </div>
          </>  
    );
}

export default ToDoContainer;

