import * as vscode from 'vscode';
import { TodoItem } from './todoStore';

export async function showCreateToDo(): Promise<TodoItem | null> {
    const name = await showInputBox();

    if (name) {
        const description = await showDescriptionBox();

        return {
            title: name,
            description,
            isCompleted: false,
        };
    }

    return null;
}

export async function showInputBox(): Promise<string | undefined> {
    const name = await vscode.window.showInputBox({
        prompt: 'Input TODO name',
        placeHolder: 'Name',
        validateInput: text => {
            return !text ? 'TODO name cannot be empty!' : null;
        }
    });

    return name;
}

export async function showDescriptionBox(): Promise<string | undefined> {
    const description = await vscode.window.showInputBox({
        prompt: 'Input TODO description',
        placeHolder: 'Description (Optional)'
    });

    return description;
}