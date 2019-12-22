import * as vscode from 'vscode';
import { TodoTreeNodesProvider as TodoTreeNodeProvider } from './todoTree';


export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "todolist-vscode-extension" is now active!');

	const todoTreeNodeProvider = new TodoTreeNodeProvider();
	vscode.window.registerTreeDataProvider('todoListView', todoTreeNodeProvider);

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
