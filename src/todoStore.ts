import { ITodoItem } from "./todoItem";
import { observable, action, computed } from "mobx";


export class TodoStore {
    @observable todos: ITodoItem[] = [];

    @computed get completedTodos(): ITodoItem[] {
        return this.todos.filter((item) => item.isCompleted);
    }

    @computed get openedTodos(): ITodoItem[] {
        return this.todos.filter((item) => !item.isCompleted);
    }

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

    @action updateDescription(itemId: string, newDescription?: string) {
        const todo = this.getTodo(itemId);
        todo && (todo.description = newDescription);
    }

    @action private toggleCompletion(itemId: string, isCompleted: boolean) {
        const todo = this.getTodo(itemId);
        todo && (todo.isCompleted = isCompleted);
    }
}