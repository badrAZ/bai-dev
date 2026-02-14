import { Container } from 'inversify';
import { InstallSettingUseCase } from './application/install-setting-use-case';
import { SettingsCommand } from './controllers/settings-command';
import { SettingRepository } from './application/interfaces/setting-repository';
import { SettingsRepositoryImpl } from './infra/settings-repository-impl';
import { VscodeAdapter } from './application/interfaces/vscode-adapter';
import { VscodeAdapterImpl } from './infra/vscode-adapter-impl';

export const bindSettings = (container: Container) => {
  container.bind(InstallSettingUseCase).toSelf();
  container.bind(SettingsCommand).toSelf();
  container.bind(SettingRepository).to(SettingsRepositoryImpl);
  container.bind(VscodeAdapter).to(VscodeAdapterImpl);
};
