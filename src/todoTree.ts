import * as vscode from 'vscode';
import { TodoTreeItem } from './todoTreeItem';
import { TodoStore } from './todoStore';
import { observe } from 'mobx';

export class TodoTreeNodeProvider implements vscode.TreeDataProvider<TodoTreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<TodoTreeItem | undefined> = new vscode.EventEmitter<TodoTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TodoTreeItem | undefined> = this._onDidChangeTreeData.event;

	constructor(private todoStore: TodoStore) {
		observe(todoStore.todos, (change) => {
			this.refresh();
		});
	}

	refresh(item?: TodoTreeItem): void {
		this._onDidChangeTreeData.fire(item);
	}

	getTreeItem(element: TodoTreeItem): TodoTreeItem {
		return element;
	}

	getChildren(element?: TodoTreeItem): Thenable<TodoTreeItem[]> {
		if (element) {
			return Promise.resolve([]);
		} else {
			const items = this.toTreeItems();
			return Promise.resolve(items);
		}
	}

	private toTreeItems(): TodoTreeItem[] {
		// https://github.com/mobxjs/mobx/issues/1167#issuecomment-330193263
		return this.todoStore.todos.map((item) => {
			const treeItem = new TodoTreeItem(item, vscode.TreeItemCollapsibleState.None);
			observe(item, () => {
				treeItem.update(item);
				this.refresh(treeItem);
			});

			return treeItem;
		});
	}
}

