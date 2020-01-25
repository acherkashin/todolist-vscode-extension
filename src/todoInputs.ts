import * as vscode from "vscode";
import { ITodoItem, createTodoItem } from "./todoItem";

export async function showCreateToDo(): Promise<ITodoItem | null> {
  const name = await showNameBox();

  if (name) {
    const description = await showDescriptionBox();

    return createTodoItem({
      title: name,
      description,
      isCompleted: false
    });
  }

  return null;
}

export async function showNameBox(value?: string): Promise<string | undefined> {
  const name = await vscode.window.showInputBox({
    prompt: "Input TODO name",
    placeHolder: "Name",
    value,
    validateInput: text => {
      return !text ? "TODO name cannot be empty!" : null;
    }
  });

  return name;
}

export async function showDescriptionBox(
  value?: string
): Promise<string | undefined> {
  const description = await vscode.window.showInputBox({
    prompt: "Input TODO description",
    placeHolder: "Description (Optional)",
    value
  });

  return description;
}

export async function showToDoList(
  todos: string[]
): Promise<string | undefined> {
  return await vscode.window.showQuickPick(todos, {
    canPickMany: false,
    placeHolder: "Choose ToDo"
  });
}
