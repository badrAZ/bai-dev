import { inject, injectable } from 'inversify';
import { VscodeCommand } from '@/core/vscode-command';
import { CopyGitConfigToClipboardUseCase } from '../application/copy-git-config-to-clipboard-use-case';

@injectable()
export class GitConfigCommand extends VscodeCommand {
  id = 'bai-dev.gitConfig';

  constructor(
    @inject(CopyGitConfigToClipboardUseCase)
    private copyGitConfigToClipboardUseCase: CopyGitConfigToClipboardUseCase
  ) {
    super();
  }

  handle(): void {
    this.copyGitConfigToClipboardUseCase.handle();
  }
}
