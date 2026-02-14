// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { container } from './inversify';
import { CommandRegistry } from './core/command-registry';
import { CodeLensRegistry } from './core/code-lens-registry';

const registerCommands = (
  context: vscode.ExtensionContext
): vscode.Disposable[] => {
  const commands = container.get<CommandRegistry>(CommandRegistry).getAll();
  return commands.map(({ id, handle }) =>
    vscode.commands.registerCommand(id, (...args) => handle(context, ...args))
  );
};

const registerCodeLenses = (): vscode.Disposable[] => {
  const codeLenses = container.get<CodeLensRegistry>(CodeLensRegistry).getAll();
  return codeLenses.map(instance =>
    vscode.languages.registerCodeLensProvider(instance.options, instance)
  );
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const commandDisposables = registerCommands(context);
  const codeLensDisposables = registerCodeLenses();

  context.subscriptions.push(...commandDisposables, ...codeLensDisposables);
}

// This method is called when your extension is deactivated
export function deactivate() {}
