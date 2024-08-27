/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';

export const todoContext = createContext({
    todoLists : [{
        id: 1,
        title: "Title",
        completed: false
    }],
    updateTodo: (id, todo)=>{},
    addTodo: (todo)=>{},
    deleteTodo: (id)=>{},
    toggleStatus: (id)=>{}
});

export const TodoProvider = todoContext.Provider;

export function useTodo(){
    return useContext(todoContext);
}