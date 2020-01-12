import * as vscode from 'vscode';
import { TodoTreeItem } from './todoTreeItem';
import { TodoStore } from './todoStore';
import { TodoItem } from './todoItem';

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

	getTreeItem(element: TodoTreeItem): TodoTreeItem {
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

	private toTreeItems(items: TodoItem[]): TodoTreeItem[] {
		return items.map((item) => new TodoTreeItem(item, vscode.TreeItemCollapsibleState.None));
	}
}

