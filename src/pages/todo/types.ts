export interface ToDo {
    id: number;
    name: string;
    isCompleted: boolean;
}

export type TodoList = Record<string, ToDo>;
