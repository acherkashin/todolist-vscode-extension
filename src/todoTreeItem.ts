import * as vscode from 'vscode';
import { ITodoItem } from './todoItem';

export class TodoTreeItem extends vscode.TreeItem {
    constructor(
        todoItem: ITodoItem,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(todoItem.title, collapsibleState);
        this.update(todoItem);
    }

    get tooltip(): string {
        return <string>this.description;
    }

    // iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    // };

    update(todoItem: ITodoItem) {
        this.id = todoItem.id;
        this.description = todoItem.description;
        this.label = todoItem.title;
        this.contextValue = getContextValue(todoItem);
    }
}

function getContextValue(todoItem: ITodoItem) {
    return todoItem.isCompleted ? "completedTodo" : "uncompletedTodo";
}