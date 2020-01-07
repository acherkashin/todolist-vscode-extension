import * as vscode from 'vscode';
import { TodoTreeNodeProvider } from './todoTree';
import { TodoStore } from './todoStore';
import { showCreateToDo } from './todoInputs';


export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "todolist-vscode-extension" is now active!');

	const todoStore = new TodoStore();
	todoStore.addTodo({ title: "TODO1", description: "Description" });

	const todoTreeNodeProvider = new TodoTreeNodeProvider(todoStore);
	vscode.window.registerTreeDataProvider('todoListView', todoTreeNodeProvider);

	context.subscriptions.push(
		vscode.commands.registerCommand('todoList.addTodo', async () => {
			const todo = await showCreateToDo();

			if (todo) {
				todoStore.addTodo(todo);
				todoTreeNodeProvider.refresh();
			}
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }
