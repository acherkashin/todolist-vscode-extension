import { ITodoItem } from "./todoItem";
import { observable, action } from "mobx";


export class TodoStore {
    @observable todos: ITodoItem[] = [];

    completeItem(itemId: string) {
        this.toggleCompletion(itemId, true);
    }

    undoItem(itemId: string) {
        this.toggleCompletion(itemId, false);
    }

    @action addTodo(item: ITodoItem) {
        this.todos.push(item);
    }

    @action private toggleCompletion(itemId: string, isCompleted: boolean) {
        const todo = this.todos.find((todo) => todo.id === itemId);
        if (todo) {
            todo.isCompleted = isCompleted;
        }
    }
}