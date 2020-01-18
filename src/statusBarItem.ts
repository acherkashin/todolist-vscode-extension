import * as vscode from 'vscode';
import { TodoStore } from './todoStore';
import { autorun } from 'mobx';
import { ITodoItem } from './todoItem';

export function createStatusBarItem(store: TodoStore): vscode.StatusBarItem {
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);

    autorun(() => update(item, store.openedTodos));

    return item;
}

function update(item: vscode.StatusBarItem, items: ITodoItem[]) {
    if (items?.length) {
        item.text = `$(checklist) ${items.length} TODO`;
        item.show();
    } else {
        item.hide();
    }
}