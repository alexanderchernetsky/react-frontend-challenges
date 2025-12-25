import {TodoList} from "./types";

class LocalStorageClient {
    store(todos: TodoList) {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    retrieve() {
        const data = localStorage.getItem("todos");
        if (data) {
            return JSON.parse(data) as TodoList;
        } else {
            return null;
        }
    }
}

const storage = new LocalStorageClient();

export default storage;
