import { inject, injectable } from 'inversify';
import { VscodeAdapter } from './interfaces/vscode-adapter';
import { SettingRepository } from './interfaces/setting-repository';

@injectable()
export class InstallSettingUseCase {
  constructor(
    @inject(SettingRepository) private settingRepository: SettingRepository,
    @inject(VscodeAdapter) private vscodeAdapter: VscodeAdapter
  ) {}

  async handle() {
    try {
      const settings = await this.settingRepository.get();
      await this.vscodeAdapter.applySettings(settings.data.settings);
      await this.vscodeAdapter.showInfo(
        'Badr AI settings applied successfully! If you do not see the changes, you may need to restart VS Code.'
      );

      const confirm = await this.vscodeAdapter.showConfirmation(
        `Do you want to install ${settings.data.font.name} font? (recommended)`
      );
      if (confirm) {
        await this.vscodeAdapter.openUrl(settings.data.font.url);
      }
    } catch (error) {
      console.error(error);
      await this.vscodeAdapter.showError(
        'An error occurred while applying settings.'
      );
    }
  }
}
