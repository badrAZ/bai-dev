import { Container } from 'inversify';
import { CopyShortcutsToClipboardUseCase } from './application/copy-shortcuts-to-clipboard-use-case';
import { ShortcutsCommand } from './controllers/shortcuts-command';
import { VscodeAdapter } from './application/interfaces/vscode-adapter';
import { VscodeAdapterImpl } from './infra/vscode-adapter-impl';
import { ShortcutsRepository } from './application/interfaces/shortcuts-repository';
import { ShortcutsRepositoryImpl } from './infra/shortcuts-repository-impl';

export const bindShortcuts = (container: Container) => {
  container.bind(CopyShortcutsToClipboardUseCase).toSelf();
  container.bind(ShortcutsCommand).toSelf();
  container.bind(VscodeAdapter).to(VscodeAdapterImpl);
  container.bind(ShortcutsRepository).to(ShortcutsRepositoryImpl);
};
