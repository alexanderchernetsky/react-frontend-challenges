import {useCallback, useEffect, useRef, useState} from "react";
import {TodoList} from "./types";
import storage from "./LocalStorageClient";
import ToDoItem from "./TodoItem/TodoItem";

// OBJECTIVE: implement ToDo application with add / delete / search / complete functionality
const TodoPage = () => {
    const [todos, setTodos] = useState<TodoList>({});
    const [filteredTodos, setFilteredTodos] = useState<TodoList | null>(null);

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
            return;
        }

        const newTodo = {
            id: Math.round(Math.random() * 1_000_000),
            name: title,
            isCompleted: false,
        };

        const updatedTodos = {...todos, [newTodo.id]: newTodo};
        setTodos(updatedTodos);
        storage.store(updatedTodos);

        form.reset();
    }

    const toggleTodo = useCallback((id: number) => {
        setTodos(prev => {
            const updated = {
                ...prev,
                [id]: {
                    ...prev[id],
                    isCompleted: !prev[id].isCompleted
                }
            }
            // update store
            storage.store(updated);
            return updated;
        });
    }, [])

    const deleteTodo = useCallback((id: number) => {
        setTodos(prev => {
            const updated = {...prev};
            delete updated[id];
            storage.store(updated);
            return updated;
        });
    }, []);


    // search with debouncing without external libraries
    const filterTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;

        // Clear the previous timeout if it exists
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Filtering logic with attention to case sensitivity
        // case-sensitive search
        // const filtered = todos.filter(item => {
        //     return item.name.includes(searchText);
        // });

        const timeout = setTimeout(() => {
            // case-insensitive search
            const entries = Object.entries(todos);

            const filtered = entries.filter(item => {
                return item[1].name.toLowerCase().includes(searchText.toLowerCase());
            });

            setFilteredTodos(Object.fromEntries(filtered));
        }, 300);

        debounceTimerRef.current = timeout;
    }

    useEffect(() => {
        // if todos change - filter todos again
        const searchText = searchInputRef?.current?.value;
        if (!searchText) return;

        const entries = Object.entries(todos);

        const filtered = entries.filter(item => {
            return item[1].name.toLowerCase().includes(searchText.toLowerCase());
        });

        setFilteredTodos(Object.fromEntries(filtered));
    }, [todos])

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

    console.log('todos', todos);

    return (
        <main className="flex flex-col justify-start items-center min-h-screen py-8 p-[32px]">
            <h1 className="text-3xl font-bold mb-8">Manage Todos</h1>

            <section className="w-full max-w-md mb-12 p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Objective: Implement a ToDo Application</h2>
                <p className="text-blue-800 mb-4">
                    Create a comprehensive task management tool with persistence and search capabilities.
                </p>
                <div className="space-y-2">
                    <p className="font-medium text-blue-900">Key Requirements:</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2">
                        <li>Add new tasks to the list</li>
                        <li>Toggle task completion status</li>
                        <li>Delete tasks from the list</li>
                        <li>Search/filter tasks with debouncing</li>
                        <li>Persist data using Local Storage</li>
                    </ul>
                </div>
            </section>

            <div className="w-full max-w-md flex flex-col gap-6">
                <form id="todo-form" onSubmit={addToDo} className="flex flex-row gap-2">
                    <label htmlFor="title" className="sr-only">ToDo Name</label>
                    <input type="text" id="title" name="title" placeholder="New todo..." className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Add</button>
                </form>

                <div className="flex flex-col gap-2">
                    <label htmlFor="search-input" className="text-sm font-medium">Search:</label>
                    <input ref={searchInputRef} name="search-input" id="search-input" type="search" onChange={filterTodos} placeholder="Search todos..." className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold border-b pb-1">ToDo List:</p>
                    <ul className="list-none p-0 flex flex-col gap-1">
                        {filteredTodos ? (
                            Object.keys(filteredTodos).length === 0 ? <div>No items found.</div> :
                                Object.values(filteredTodos).map(item => <ToDoItem key={item.id} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
                        ) : (
                            Object.values(todos).map(item => <ToDoItem key={item.id} {...item} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)
                        )}

                        {Object.keys(todos).length === 0 && (
                            <li className="text-gray-500 italic">No items in the list.</li>
                        )}
                    </ul>

                    {filteredTodos && (
                        <button type="button" onClick={resetFilter} className="mt-2 text-blue-500 hover:underline self-start">Reset search filter</button>
                    )}
                </div>
            </div>
        </main>
    )
}

export default TodoPage;
