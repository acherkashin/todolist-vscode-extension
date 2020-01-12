import { TodoItem } from "./todoItem";

export class TodoStore {
    private todos: TodoItem[] = [];

    completeItem(itemId: string) {

    }

    addTodo(item: TodoItem) {
        this.todos.push(item);
    }

    getAll(): TodoItem[] {
        return this.todos;
    }
}