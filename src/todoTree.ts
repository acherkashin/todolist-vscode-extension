import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { TodoTreeItem } from './todoTreeItem';
import { TodoStore, TodoItem } from './todoStore';

export class TodoTreeNodeProvider implements vscode.TreeDataProvider<TodoTreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<TodoTreeItem | undefined> = new vscode.EventEmitter<TodoTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TodoTreeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private todoStore: TodoStore) {
	}

	addTodo(todoData: { title: string }) {

	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: TodoTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: TodoTreeItem): Thenable<TodoTreeItem[]> {
		if (element) {
			return Promise.resolve([]);
		} else {
			const items = this.toTreeItems(this.todoStore.getAll());
			return Promise.resolve(items);
		}
	}

	private toTreeItems(items: TodoItem[]) {
		return items.map((item) => new TodoTreeItem(item.title, item.description, vscode.TreeItemCollapsibleState.None));
	}
}

