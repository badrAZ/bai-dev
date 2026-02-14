import 'reflect-metadata';
import { CopyGitConfigToClipboardUseCase } from './copy-git-config-to-clipboard-use-case';
import { GitConfigRepository } from './interfaces/git-config-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';

const createMockAdapter = (): jest.Mocked<VscodeAdapter> => ({
  showInfo: jest.fn(),
  showError: jest.fn(),
  copyToClipboard: jest.fn(),
});

const createMockRepo = (): jest.Mocked<GitConfigRepository> => ({
  get: jest.fn(),
});

describe('CopyGitConfigToClipboardUseCase', () => {
  let useCase: CopyGitConfigToClipboardUseCase;
  let mockAdapter: jest.Mocked<VscodeAdapter>;
  let mockRepo: jest.Mocked<GitConfigRepository>;

  beforeEach(() => {
    mockAdapter = createMockAdapter();
    mockRepo = createMockRepo();
    useCase = new CopyGitConfigToClipboardUseCase(mockRepo, mockAdapter);
  });

  it('should copy git config to clipboard and show info', async () => {
    mockRepo.get.mockResolvedValue('[user]\n  name = Badr');

    await useCase.handle();

    expect(mockAdapter.copyToClipboard).toHaveBeenCalledWith(
      '[user]\n  name = Badr'
    );
    expect(mockAdapter.showInfo).toHaveBeenCalledWith(
      'Git config copied to clipboard! You can now paste them into your ~/.gitconfig.'
    );
  });

  it('should show error on failure', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockRepo.get.mockRejectedValue(new Error('fail'));

    await useCase.handle();

    expect(mockAdapter.showError).toHaveBeenCalledWith(
      'Error while copying git config to clipboard'
    );
  });
});
