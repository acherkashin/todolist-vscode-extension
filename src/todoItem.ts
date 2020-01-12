const uuidv1 = require('uuid/v1');

export interface TodoItem {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
}

export function createTodoItem(options: Omit<TodoItem, "id">): TodoItem {
    return {
        ...options,
        ...{ id: uuidv1() }
    };
}