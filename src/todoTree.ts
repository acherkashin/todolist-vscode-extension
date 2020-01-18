import * as vscode from 'vscode';
import { TodoTreeItem, TodoTreeItemCategory } from './todoTreeItem';
import { TodoStore } from './todoStore';
import { observe } from 'mobx';
import { ITodoItem } from './todoItem';

type TreeNode = TodoTreeItem | TodoTreeItemCategory;

export class TodoTreeNodeProvider implements vscode.TreeDataProvider<TreeNode> {

	private _onDidChangeTreeData: vscode.EventEmitter<TreeNode | undefined> = new vscode.EventEmitter<TreeNode | undefined>();
	readonly onDidChangeTreeData: vscode.Event<TreeNode | undefined> = this._onDidChangeTreeData.event;

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

	getChildren(element?: TreeNode): Thenable<TreeNode[]> {
		if (!element) {
			const items = Array.from(this.getRootItems());
			return Promise.resolve(items);
		} else if (element instanceof TodoTreeItemCategory) {
			if (element.label === "Opened") {
				const items = this.toTreeItems(this.todoStore.openedTodos);
				return Promise.resolve(items);
			} else if (element.label === "Completed") {
				const items = this.toTreeItems(this.todoStore.completedTodos);
				return Promise.resolve(items);
			}
		}

		return Promise.resolve([]);
	}

	*getRootItems() {
		if (this.todoStore.openedTodos.length) {
			yield new TodoTreeItemCategory("Opened", vscode.TreeItemCollapsibleState.Expanded);
		}

		if (this.todoStore.completedTodos.length) {
			yield new TodoTreeItemCategory("Completed", vscode.TreeItemCollapsibleState.Collapsed);
		}
	}

	private toTreeItems(items: ITodoItem[]): TodoTreeItem[] {
		// TODO: https://github.com/mobxjs/mobx/issues/1167#issuecomment-330193263
		return items.map((item) => {
			const treeItem = new TodoTreeItem(item, vscode.TreeItemCollapsibleState.None);
			observe(item, (change) => {
				if (change.name === "isCompleted") {
					this.refresh();
					return;
				}

				treeItem.update(item);
				this.refresh(treeItem);
			});

			return treeItem;
		});
	}
}

