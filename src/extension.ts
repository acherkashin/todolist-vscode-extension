import * as vscode from 'vscode';
import { TodoTreeNodeProvider } from './todoTree';
import { TodoStore } from './todoStore';


export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "todolist-vscode-extension" is now active!');

	const todoStore = new TodoStore();
	todoStore.addTodo({ title: "TODO1", description: "Description" });

	const todoTreeNodeProvider = new TodoTreeNodeProvider(todoStore);
	vscode.window.registerTreeDataProvider('todoListView', todoTreeNodeProvider);

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	vscode.commands.registerCommand('todoList.addTodo', () => {
		todoStore.addTodo({ title: `TODO: ${todoStore.getAll().length + 1}`, description: "Added todo" });
		todoTreeNodeProvider.refresh();
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
