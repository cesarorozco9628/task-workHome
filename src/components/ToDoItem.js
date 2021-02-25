import React from 'react' 
import {useForm} from 'react-hook-form'

const ToDiItem = ({inTask, id, onCheck}) =>{
    const {register, handleSubmit}= useForm();

    const onsubmit = (data) => {
        inTask(data)
    }

    return(
       <form onSubmit={handleSubmit(onsubmit)} className=''>
           <input type='checkbox' ref={register} name={id} onClick={onCheck}/>
       </form>
    );
}

export default ToDiItem;