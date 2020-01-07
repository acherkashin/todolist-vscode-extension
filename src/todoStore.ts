export interface TodoItem {
    title: string;
    description?: string;
    isCompleted: boolean;
}

export class TodoStore {
    private todos: TodoItem[] = [];

    addTodo(item: TodoItem) {
        this.todos.push(item);
    }

    getAll(): TodoItem[] {
        return this.todos;
    }
}