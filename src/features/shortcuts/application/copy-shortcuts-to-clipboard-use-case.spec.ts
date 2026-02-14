import 'reflect-metadata';
import { CopyShortcutsToClipboardUseCase } from './copy-shortcuts-to-clipboard-use-case';
import { ShortcutsRepository } from './interfaces/shortcuts-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';
import { Shortcuts } from '../domain/shortcuts';

const createMockAdapter = (): jest.Mocked<VscodeAdapter> => ({
  showInfo: jest.fn(),
  showError: jest.fn(),
  copyToClipboard: jest.fn(),
});

const createMockRepo = (): jest.Mocked<ShortcutsRepository> => ({
  getShortcuts: jest.fn(),
});

describe('CopyShortcutsToClipboardUseCase', () => {
  let useCase: CopyShortcutsToClipboardUseCase;
  let mockAdapter: jest.Mocked<VscodeAdapter>;
  let mockRepo: jest.Mocked<ShortcutsRepository>;

  beforeEach(() => {
    mockAdapter = createMockAdapter();
    mockRepo = createMockRepo();
    useCase = new CopyShortcutsToClipboardUseCase(mockRepo, mockAdapter);
  });

  it('should copy shortcuts to clipboard and show info', async () => {
    const shortcuts = new Shortcuts([{ key: 'ctrl+p', command: 'quickOpen' }]);
    mockRepo.getShortcuts.mockResolvedValue(shortcuts);

    await useCase.handle();

    expect(mockAdapter.copyToClipboard).toHaveBeenCalledWith(
      shortcuts.getStringShortcuts()
    );
    expect(mockAdapter.showInfo).toHaveBeenCalledWith(
      'VS Code shortcuts copied to clipboard! You can now paste them into your keybindings.json.'
    );
  });

  it('should show error on failure', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockRepo.getShortcuts.mockRejectedValue(new Error('fail'));

    await useCase.handle();

    expect(mockAdapter.showError).toHaveBeenCalledWith(
      'Error occurred while copying shortcuts'
    );
  });
});
