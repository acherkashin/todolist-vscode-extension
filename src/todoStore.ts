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

    getTodo(itemId: string) {
        return this.todos.find((todo) => todo.id === itemId);
    }

    @action updateTitle(itemId: string, newTitle: string) {
        const todo = this.getTodo(itemId);
        todo && (todo.title = newTitle);
    }

    @action private toggleCompletion(itemId: string, isCompleted: boolean) {
        const todo = this.getTodo(itemId);
        todo && (todo.isCompleted = isCompleted);
    }
}