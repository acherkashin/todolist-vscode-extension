import * as vscode from 'vscode';
import { ITodoItem } from './todoItem';

export class TodoTreeItem extends vscode.TreeItem {
    constructor(
        public readonly todoItem: ITodoItem,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(todoItem.title, collapsibleState);
        this.id = todoItem.id;
        this.refreshContextValue();
    }

    get tooltip(): string {
        return this.todoItem.description || "";
    }

    get description() {
        return this.todoItem.description;
    }

    // iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    // };

    refreshContextValue() {
        if (this.todoItem.isCompleted) {
            this.contextValue = "completedTodo";
        } else {
            this.contextValue = "uncompletedTodo";
        }
    }
}