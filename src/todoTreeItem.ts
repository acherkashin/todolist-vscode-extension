import * as vscode from 'vscode';
import { TodoItem } from './todoItem';

export class TodoTreeItem extends vscode.TreeItem {
    constructor(
        public readonly todoItem: TodoItem,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(todoItem.title, collapsibleState);
        this.contextValue = this.getContextValue();
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

    private getContextValue() {
        if (this.todoItem.isCompleted) {
            return "completedTodo";
        }

        return "uncompletedTodo";
    }
}