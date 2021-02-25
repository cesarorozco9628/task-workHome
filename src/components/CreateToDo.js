import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'

const CreateToDo = ({task, onCreateTask,student,buttonText, resetForm, data8 = {
    task:'',
    student:''
}}) =>{
    const {register, handleSubmit, reset} = useForm({
        defaultValues: data8,
    });
   

    const sendData = (data) => {
        onCreateTask(data)
    };

    useEffect(()=>{
        if(resetForm){
            reset({
                task:'into the task',
                student:''
            }); 
        }
    },[resetForm, reset])
    return(
    <form onSubmit={handleSubmit(sendData)} className='card-form'>
        <label>
            <p>{task}</p>
            <input 
            name='task' 
            ref={register}
            placeholder='task' 
            className='card-input '
            required='requer'/>
        </label>
        <label>
            <p>{student}</p>
            <input 
            name='student' 
            ref={register} 
            placeholder='student' 
            className='card-input'/>
        </label>
        <button className='btn'>{buttonText}</button>
    </form>
    );
}


export default CreateToDo;
