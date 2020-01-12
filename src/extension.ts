import * as vscode from 'vscode';
import { TodoTreeNodeProvider } from './todoTree';
import { TodoStore } from './todoStore';
import { showCreateToDo, showNameBox } from './todoInputs';
import { TodoTreeItem } from './todoTreeItem';

export function activate(context: vscode.ExtensionContext) {
	const todoStore = new TodoStore();

	const todoTreeNodeProvider = new TodoTreeNodeProvider(todoStore);
	vscode.window.registerTreeDataProvider('todoListView', todoTreeNodeProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('todoList.addTodo', async () => {
			const todo = await showCreateToDo();

			todo && todoStore.addTodo(todo);
		}),
		vscode.commands.registerCommand('todoList.reopen', (item: TodoTreeItem) => {
			todoStore.undoItem(<string>item.id);
		}),
		vscode.commands.registerCommand('todoList.complete', (item: TodoTreeItem) => {
			todoStore.completeItem(<string>item.id);
		}),
		vscode.commands.registerCommand('todoList.editTitle', async (item: TodoTreeItem) => {
			const todo = todoStore.getTodo(<string>item.id)
			const newName = await showNameBox(todo?.title);

			newName && todoStore.updateTitle(<string>item.id, newName);
		}),
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
