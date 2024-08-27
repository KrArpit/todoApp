/* eslint-disable react/prop-types */
// import React from 'react'
import { useTodo } from '../context';
import { useState, useRef, useEffect } from "react";

function TodoDisplay({todo}) {
    console.log({todo});
    
    
    const inputRef = useRef(null);
    // const textareaRef = useRef(null)
     
    const [editTodoMsg, seteditTodoMsg] = useState(todo.title);
    
    const [isTodoEditable, setisTodoEditable] = useState(false);

    const {updateTodo, deleteTodo, toggleStatus} = useTodo();

    const edit =()=>{
        if(editTodoMsg.trim() === '') {
            alert("Todo title cannot be empty");
            deleteTodo(todo.id);
            return;
        }
        updateTodo(todo.id, {...todo, title:editTodoMsg});
        setisTodoEditable(false);
    }
    useEffect(() => {
        if (isTodoEditable) {
            inputRef.current.focus();  // Focus on the input
          }
    }, [isTodoEditable]);
    
    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.style.height = '2.3em';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
        }
    })

    const changeStatus = ()=>{
        toggleStatus(todo.id)
    }

  return (
    <div 
        className={`flex gap-2 items-center justify-center w-full px-3 py-2 rounded-md mb-2 ${todo.completed?"bg-[#c6e9a7]":"bg-[#f1faee]"}`}>
            <input type="checkbox"
                    className='cursor-pointer h-5 w-5 outline-none appearance-none border border-slate-500 rounded-full checked:bg-slate-400'
                    checked={todo.completed}
                    onChange={changeStatus} />
            <textarea
                    className={`sm:w-11/12 min-h-[2em] resize-none bg-transparent border border-[#b2b5ce] rounded-md px-1 py-1 text-lg font-medium outline-none text-black read-only:border-none ${isTodoEditable?"border-[#b2b5ce]":"border-none"} ${todo.completed?"line-through":""}`}
                    value={editTodoMsg}
                    onChange={(e)=>(seteditTodoMsg(e.target.value))}
                    readOnly={!isTodoEditable} 
                    ref={inputRef}/>
                    {/* Delete and Edit Buttons */}
            <div className="flex items-center justify-center gap-2">
                <button 
                        className={`border text-center text-xl py-1 px-2 bg-[#06d6a0] rounded-md cursor-pointer disabled:opacity-50`}
                        onClick={()=>{
                            if(todo.completed) return
                            if(isTodoEditable) edit();
                            else setisTodoEditable((prev)=>(!prev))
                        }} 
                        disabled = {todo.completed}>
                            {isTodoEditable?<i className="fa-regular fa-square-check"></i>:<i className="fa-regular fa-pen-to-square "></i>}
                    </button>
                <button className="border text-center text-xl py-1 px-2 bg-[#e0525e] rounded-md cursor-pointer"
                onClick={()=>deleteTodo(todo.id)} >
                    <i className="fa-regular fa-square-minus "></i>
                    </button>
            </div>
        </div>
  )
}

export default TodoDisplay