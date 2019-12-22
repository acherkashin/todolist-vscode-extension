import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { TodoItem } from './todoTreeItem';

export class TodoTreeNodesProvider implements vscode.TreeDataProvider<TodoItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<TodoItem | undefined> = new vscode.EventEmitter<TodoItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TodoItem | undefined> = this._onDidChangeTreeData.event;

	constructor() {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TodoItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: TodoItem): Thenable<TodoItem[]> {
		if (element) {
			return Promise.resolve([]);
		} else {
			return Promise.resolve([
				new TodoItem("Task 1", vscode.TreeItemCollapsibleState.None),
				new TodoItem("Task 2", vscode.TreeItemCollapsibleState.None),
				new TodoItem("Task 3", vscode.TreeItemCollapsibleState.None),
			]);
		}

	}
}

