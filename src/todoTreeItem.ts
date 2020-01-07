import * as vscode from 'vscode';
import * as path from 'path';

export class TodoTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly _description: string | undefined,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return this.label;
    }

    get description() {
        return this._description;
    }

    // iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    // };

    contextValue = 'todo';

}