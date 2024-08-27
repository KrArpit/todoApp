// import React from 'react'
import { useState } from 'react'
import { useTodo } from '../context';

function TextInput() {

    const [todo, settodo] = useState("");
    const {addTodo} = useTodo();
    // Function to add text from input to list
    const add = (e)=>{
        e.preventDefault();
        if(!todo) return;
        addTodo({id:Date.now(), title:todo, completed:false});
        settodo("");
    }

  return (
    <form className='w-full bg-[#f1faee] p-4 rounded-md flex items-center justify-center gap-3 mb-4'
            onSubmit={add}>
        <input type="text"
            placeholder='Add a new task'
            className='w-full bg-transparent border border-[#b2b5ce] rounded-md px-3 py-2 font-medium outline-none overflow-hidden placeholder:text-center' 
            value={todo}
            onChange={(e)=>(settodo(e.target.value))}/>
        <button className='bg-[#ffd166] text-[#073b4c] px-3 py-2 rounded-md border border-[#073b4c] cursor-pointer'>Add</button>
    </form>
  )
}

export default TextInput