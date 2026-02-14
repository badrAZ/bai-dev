import { VscodeCommand } from '@/core/vscode-command';
import { inject, injectable } from 'inversify';
import { CopyShortcutsToClipboardUseCase } from '../application/copy-shortcuts-to-clipboard-use-case';

@injectable()
export class ShortcutsCommand extends VscodeCommand {
  id = 'bai-dev.shortcuts';

  constructor(
    @inject(CopyShortcutsToClipboardUseCase)
    private readonly copyShortcutsToClipboardUseCase: CopyShortcutsToClipboardUseCase
  ) {
    super();
  }

  handle(): void {
    this.copyShortcutsToClipboardUseCase.handle();
  }
}
