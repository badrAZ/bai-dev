import { VscodeCommand } from '@/core/vscode-command';
import { inject, injectable } from 'inversify';
import { InstallSettingUseCase } from '../application/install-setting-use-case';

@injectable()
export class SettingsCommand extends VscodeCommand {
  id = 'bai-dev.applySettings';

  constructor(
    @inject(InstallSettingUseCase)
    private readonly installSettingUseCase: InstallSettingUseCase
  ) {
    super();
  }

  handle(): void {
    this.installSettingUseCase.handle();
  }
}
