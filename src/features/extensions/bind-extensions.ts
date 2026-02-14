import { Container } from 'inversify';
import { InstallExtensionsUseCase } from './application/install-extensions-use-case';
import { ExtensionsRepository } from './application/interfaces/extensions-repository';
import { ExtensionsRepositoryImpl } from './infra/extensions-repository-impl';
import { VscodeAdapter } from './application/interfaces/vscode-adapter';
import { VscodeAdapterImpl } from './infra/vscode-adapter-impl';
import { ExtensionCommand } from './controllers/extension-command';

export const bindExtensions = (container: Container) => {
  container.bind(InstallExtensionsUseCase).toSelf();
  container.bind(ExtensionCommand).toSelf();
  container.bind(ExtensionsRepository).to(ExtensionsRepositoryImpl);
  container.bind(VscodeAdapter).to(VscodeAdapterImpl);
};
