import * as vscode from 'vscode';

/**
 * This file is intended to implement the interface that interacts with VS Code APIs.
 */
export class VscodeInterfaceImpl {
  async showInfo(message: string): Promise<void> {
    await vscode.window.showInformationMessage(message);
  }
  async showError(message: string): Promise<void> {
    await vscode.window.showErrorMessage(message);
  }
  async showConfirmation(message: string): Promise<boolean> {
    const answer = await vscode.window.showInformationMessage(
      message,
      'Yes',
      'No'
    );
    return answer === 'Yes';
  }
  async isExtensionInstalled(extensionId: string): Promise<boolean> {
    return !!vscode.extensions.getExtension(extensionId);
  }
  async installExtension(extensionId: string): Promise<void> {
    await vscode.commands.executeCommand(
      'workbench.extensions.installExtension',
      extensionId
    );
  }
  async copyToClipboard(content: string): Promise<void> {
    await vscode.env.clipboard.writeText(content);
  }
  async openUrl(url: string): Promise<void> {
    await vscode.env.openExternal(vscode.Uri.parse(url));
  }
  async applySettings(settings: Record<string, any>): Promise<void> {
    const config = vscode.workspace.getConfiguration();
    for (const [key, value] of Object.entries(settings)) {
      await config.update(key, value, vscode.ConfigurationTarget.Global);
    }
  }
}
