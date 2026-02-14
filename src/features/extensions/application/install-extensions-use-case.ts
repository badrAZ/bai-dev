import { inject, injectable } from 'inversify';
import { ExtensionsRepository } from './interfaces/extensions-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';

@injectable()
export class InstallExtensionsUseCase {
  constructor(
    @inject(ExtensionsRepository)
    private readonly extensionsRepository: ExtensionsRepository,
    @inject(VscodeAdapter) private readonly vscodeAdapter: VscodeAdapter
  ) {}

  private async handleExtension(extensionId: string): Promise<boolean> {
    const isInstalled =
      await this.vscodeAdapter.isExtensionInstalled(extensionId);
    if (isInstalled) {
      return true;
    }

    const shouldInstall = await this.vscodeAdapter.showConfirmation(
      `Extension ${extensionId} is not installed. Do you want to install it?`
    );
    if (!shouldInstall) {
      return false;
    }

    await this.vscodeAdapter.installExtension(extensionId);
    await this.vscodeAdapter.showInfo(
      `Extension ${extensionId} has been installed`
    );
    return false;
  }

  private async handleExtensions() {
    const extensions = await this.extensionsRepository.getAll();
    if (extensions.length === 0) {
      await this.vscodeAdapter.showInfo('No extensions to install');
      return;
    }

    const installedExtensions = [];
    for (const extension of extensions) {
      const installed = await this.handleExtension(extension.id);
      if (installed) {
        installedExtensions.push(extension.id);
      }
    }

    if (installedExtensions.length > 0) {
      await this.vscodeAdapter.showInfo(
        `Already installed extensions: ${installedExtensions.join(', ')}`
      );
    }
  }

  async handle() {
    try {
      await this.handleExtensions();
    } catch (error: any) {
      await this.vscodeAdapter.showError('Error while installing extensions');
      console.error(error);
    }
  }
}
