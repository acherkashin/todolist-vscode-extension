import * as vscode from 'vscode';
import { ITodoItem } from "./todoItem";
import { observable, action, computed, observe } from "mobx";

export class TodoStore {
    @observable todos: ITodoItem[] = [];

    constructor(context: vscode.ExtensionContext) {
        const todos = context.workspaceState.get<ITodoItem[]>('todos', []);

        this.todos = todos;

        observe(this.todos, () => context.workspaceState.update('todos', this.todos));
    }

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

    @action deleteTodo(id: string) {
        const itemIndex = this.todos.findIndex((item) => item.id === id);
        this.todos.splice(itemIndex, 1);
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