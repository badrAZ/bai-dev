import * as vscode from 'vscode';

export abstract class VscodeCodeLens implements vscode.CodeLensProvider {
  abstract options: vscode.DocumentSelector
  provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    throw new Error('Method not implemented.');
  }
}
