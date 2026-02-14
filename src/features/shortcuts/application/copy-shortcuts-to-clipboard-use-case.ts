import { inject, injectable } from 'inversify';
import { ShortcutsRepository } from './interfaces/shortcuts-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';

@injectable()
export class CopyShortcutsToClipboardUseCase {
  constructor(
    @inject(ShortcutsRepository)
    private readonly shortcutsRepository: ShortcutsRepository,
    @inject(VscodeAdapter)
    private readonly vscodeAdapter: VscodeAdapter
  ) {}

  async handle() {
    try {
      const shortcuts = await this.shortcutsRepository.getShortcuts();
      await this.vscodeAdapter.copyToClipboard(shortcuts.getStringShortcuts());
      await this.vscodeAdapter.showInfo(
        'VS Code shortcuts copied to clipboard! You can now paste them into your keybindings.json.'
      );
    } catch (error) {
      console.error(error);
      await this.vscodeAdapter.showError(
        'Error occurred while copying shortcuts'
      );
    }
  }
}
