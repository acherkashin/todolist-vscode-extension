import * as vscode from 'vscode';
import { TodoStore } from './todoStore';
import { observe } from 'mobx';

export function createStatusBarItem(store: TodoStore): vscode.StatusBarItem {
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    update(item, store);

    observe(store.todos, () => update(item, store));

    return item;
}

function update(item: vscode.StatusBarItem, store: TodoStore) {
    if (store.todos?.length) {
        item.text = `$(checklist) ${store.todos.length} TODO`;
        item.show();
    } else {
        item.hide();
    }
}