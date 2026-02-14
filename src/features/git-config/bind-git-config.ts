import { Container } from 'inversify';
import { CopyGitConfigToClipboardUseCase } from './application/copy-git-config-to-clipboard-use-case';
import { GitConfigRepository } from './application/interfaces/git-config-repository';
import { GitConfigRepositoryImpl } from './infra/git-config-repository-impl';
import { VscodeAdapter } from './application/interfaces/vscode-adapter';
import { VscodeAdapterImpl } from './infra/vscode-adapter-impl';
import { GitConfigCommand } from './controllers/git-config-command';

export const bindGitConfig = (container: Container) => {
  container.bind(CopyGitConfigToClipboardUseCase).toSelf();
  container.bind(GitConfigCommand).toSelf();
  container.bind(GitConfigRepository).to(GitConfigRepositoryImpl);
  container.bind(VscodeAdapter).to(VscodeAdapterImpl);
};
