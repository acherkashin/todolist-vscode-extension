import { observable } from "mobx";

const uuidv1 = require('uuid/v1');

export interface ITodoItem {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
}

export function createTodoItem(options: Omit<ITodoItem, "id">): ITodoItem {
    return observable({
        ...options,
        ...{ id: uuidv1() }
    });
}