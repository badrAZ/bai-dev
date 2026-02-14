import { inject, injectable } from 'inversify';
import { VscodeCommand } from '@/core/vscode-command';
import { InstallExtensionsUseCase } from '../application/install-extensions-use-case';

@injectable()
export class ExtensionCommand extends VscodeCommand {
  id = 'bai-dev.installExtensions';

  constructor(
    @inject(InstallExtensionsUseCase)
    private readonly installExtensionsUseCase: InstallExtensionsUseCase
  ) {
    super();
  }

  handle(): void {
    this.installExtensionsUseCase.handle();
  }
}
