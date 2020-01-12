import * as vscode from 'vscode';
import { TodoTreeNodeProvider } from './todoTree';
import { TodoStore } from './todoStore';
import { showCreateToDo } from './todoInputs';
import { TodoTreeItem } from './todoTreeItem';

export function activate(context: vscode.ExtensionContext) {
	const todoStore = new TodoStore();

	const todoTreeNodeProvider = new TodoTreeNodeProvider(todoStore);
	vscode.window.registerTreeDataProvider('todoListView', todoTreeNodeProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('todoList.addTodo', async () => {
			const todo = await showCreateToDo();

			if (todo) {
				todoStore.addTodo(todo);
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('todoList.reopen', (item: TodoTreeItem) => {
			todoStore.undoItem(item.id || '');
		}),
		vscode.commands.registerCommand('todoList.complete', (item: TodoTreeItem) => {
			todoStore.completeItem(item.id || '');
		}),
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
