import {Trash2} from "lucide-react";
import React, {FC} from "react";
import {ToDo} from "../types";


interface ToDoItemProps extends ToDo {
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const ToDoItem:FC<ToDoItemProps> = ({id, name, deleteTodo, toggleTodo, isCompleted}) => {
    return (
        <li className="flex flex-row justify-start items-center gap-1 p-1">
            <input id={`todo-checkbox-${id}`} type="checkbox" onChange={() => toggleTodo(id)} checked={isCompleted} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    toggleTodo(id);
                }
            }} className="cursor-pointer" />
            <label htmlFor={`todo-checkbox-${id}`} className={`cursor-pointer ${isCompleted ? 'line-through text-gray-500' : ''}`}>{name}</label>
            <button type='button' onClick={() => deleteTodo(id)} className="ml-auto p-1 text-red-500 hover:bg-red-100 rounded transition-colors">
                <span className="sr-only">Delete</span>
                <Trash2 size={18} />
            </button>
        </li>
    )
}

export default React.memo(ToDoItem);
