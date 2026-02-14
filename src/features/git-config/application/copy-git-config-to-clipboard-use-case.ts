import { inject, injectable } from 'inversify';
import { VscodeAdapter } from './interfaces/vscode-adapter';
import { GitConfigRepository } from './interfaces/git-config-repository';

@injectable()
export class CopyGitConfigToClipboardUseCase {
  constructor(
    @inject(GitConfigRepository)
    private readonly gitConfigRepository: GitConfigRepository,
    @inject(VscodeAdapter) private readonly vscodeAdapter: VscodeAdapter
  ) {}

  async handle() {
    try {
      const gitConfig = await this.gitConfigRepository.get();
      await this.vscodeAdapter.copyToClipboard(gitConfig);
      await this.vscodeAdapter.showInfo(
        'Git config copied to clipboard! You can now paste them into your ~/.gitconfig.'
      );
    } catch (error) {
      console.error(error);
      await this.vscodeAdapter.showError(
        'Error while copying git config to clipboard'
      );
    }
  }
}
