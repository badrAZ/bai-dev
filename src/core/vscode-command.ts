import * as vscode from 'vscode';

export abstract class VscodeCommand {
  abstract id: string
  abstract handle(context: vscode.ExtensionContext, ...args: any): void | Promise<void>
}
