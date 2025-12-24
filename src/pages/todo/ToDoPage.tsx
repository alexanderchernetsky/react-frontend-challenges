import {FC, useEffect, useRef, useState} from "react";
import './styles.css';
import {Trash2} from "lucide-react";

interface ToDo {
    id: number;
    name: string;
    isCompleted: boolean;
}

interface ToDoItemProps extends ToDo {
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

class LocalStorageClient {
    store(todos: ToDo[]) {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    retrieve() {
        const data = localStorage.getItem("todos");
        if (data) {
            return JSON.parse(data) as ToDo[];
        } else {
            return null;
        }
    }
}

const storage = new LocalStorageClient();

const ToDoItem:FC<ToDoItemProps> = ({id, name, deleteTodo, toggleTodo, isCompleted}) => {
    return (
        <li className="list-item">
            <label htmlFor={`todo-checkbox-${id}`}>{name}</label>
            <input id={`todo-checkbox-${id}`} type="checkbox" onChange={() => toggleTodo(id)} checked={isCompleted} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    toggleTodo(id);
                }
            }} />
            <button type='button' onClick={() => deleteTodo(id)}>
                <span className="sr-only">Delete</span>
                <Trash2 />
            </button>
        </li>
    )
}


// OBJECTIVE: implement ToDo application with add / delete / search / complete functionality
// todo: store the results in local storage and fetch initially, bug!
// todo: normalise the list
// todo: apply conditional styling - show completed as crossed
// todo: optimise the performance
const TodoPage = () => {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<ToDo[] | null>(null);

    // useRef to store the timeout ID so it persists across renders
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // get data from storage
        const todos = storage.retrieve();
        if (todos) {
            setTodos(todos);
        }
    }, []);

    const addToDo = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // get title field
        const form = event.currentTarget;
        const formData = new FormData(form);
        const title = formData.get("title") as string;

        if (!title) {
            console.warn("Title is required");
            return
        }
        // update state
        setTodos(prev => {
            return [...prev, {
                id: Math.round(Math.random() * 1_000_000),
                name: title,
                isCompleted: false,
            }];
        });

        // clean up the form
        form.reset();

        // store
        storage.store(todos);
    }

    // search with debouncing without external libraries
    const filterTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;

        // Clear the previous timeout if it exists
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Filtering logic with attention to case sensitivity: make it case-sensitive and case-insensitive
        // case-sensitive search
        // const filtered = todos.filter(item => {
        //     return item.name.includes(searchText);
        // });

        const timeout = setTimeout(() => {
            // case-insensitive search
            const filtered = todos.filter(item => {
                return item.name.toLowerCase().includes(searchText.toLowerCase());
            });

            setFilteredTodos(filtered);
        }, 300);

        debounceTimerRef.current = timeout;
    }

    useEffect(() => {
        // if todos change - filter todos again
        const searchText = searchInputRef?.current?.value;

        console.log(searchText);

        if (!searchText) return;

        const filtered = todos.filter(item => {
            return item.name.toLowerCase().includes(searchText.toLowerCase());
        });

        setFilteredTodos(filtered);
    }, [todos])

    const toggleTodo = (id: number) => {
        setTodos(prev => {
            const updated = prev.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        isCompleted: !item.isCompleted
                    }
                }
                return item;
            });

            return updated;
        });

        // store
        storage.store(todos);
    }

    const resetFilter = () => {
        setFilteredTodos(null);
        // reset input value
        const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
        if (searchInput) {
            searchInput.value = '';
            // Optional: keep focus so user can immediately type again
            searchInput.focus();
        }
    }

    const deleteTodo = (id: number) => {
        setTodos(prev => {
            return prev.filter(item => item.id !== id);
        });

        // store
        storage.store(todos);
    }

    console.log('render', filteredTodos);

    return (
        <main className="page-content">
            <h1>ToDo list</h1>
            <div className="container">
                <form id="todo-form" onSubmit={addToDo} className="todo-form">
                    <label htmlFor="title">ToDo Name</label>
                    <input type="text" id="title" name="title"/>
                    <button type="submit">Add</button>
                </form>

                <div className="todo-search">
                    <label htmlFor="search-input">Search:</label>
                    <input ref={searchInputRef} name="search-input" id="search-input" type="search" onChange={filterTodos} />
                </div>

                <p className="list-label">ToDo List:</p>
                <ul>
                    {filteredTodos ? (
                        filteredTodos.map(item => <ToDoItem key={item.id} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
                    ) : (
                        todos.map(item => <ToDoItem key={item.id} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
                    )}

                    {filteredTodos && (
                        <button type="button" onClick={resetFilter}>Reset filter</button>
                    )}

                    {todos?.length === 0 && (
                        <li>No items in the list.</li>
                    )}
                </ul>
            </div>
        </main>
    )
}

export default TodoPage;
