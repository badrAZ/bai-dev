import 'reflect-metadata';
import { InstallExtensionsUseCase } from './install-extensions-use-case';
import { ExtensionsRepository } from './interfaces/extensions-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';
import { Extension } from '../domain/extension';

const createMockVscodeAdapter = (): jest.Mocked<VscodeAdapter> => ({
  showInfo: jest.fn(),
  showError: jest.fn(),
  showConfirmation: jest.fn(),
  isExtensionInstalled: jest.fn(),
  installExtension: jest.fn(),
});

const createMockRepository = (): jest.Mocked<ExtensionsRepository> => ({
  getAll: jest.fn(),
});

describe('InstallExtensionsUseCase', () => {
  let useCase: InstallExtensionsUseCase;
  let mockAdapter: jest.Mocked<VscodeAdapter>;
  let mockRepo: jest.Mocked<ExtensionsRepository>;

  beforeEach(() => {
    mockAdapter = createMockVscodeAdapter();
    mockRepo = createMockRepository();
    useCase = new InstallExtensionsUseCase(mockRepo, mockAdapter);
  });

  it('should show info when no extensions to install', async () => {
    mockRepo.getAll.mockResolvedValue([]);

    await useCase.handle();

    expect(mockAdapter.showInfo).toHaveBeenCalledWith('No extensions to install');
  });

  it('should show already installed extensions', async () => {
    mockRepo.getAll.mockResolvedValue([
      Extension.fromData({ id: 'ext-1' }),
      Extension.fromData({ id: 'ext-2' }),
    ]);
    mockAdapter.isExtensionInstalled.mockResolvedValue(true);

    await useCase.handle();

    expect(mockAdapter.showInfo).toHaveBeenCalledWith(
      'Already installed extensions: ext-1, ext-2'
    );
  });

  it('should prompt to install missing extensions', async () => {
    mockRepo.getAll.mockResolvedValue([Extension.fromData({ id: 'ext-1' })]);
    mockAdapter.isExtensionInstalled.mockResolvedValue(false);
    mockAdapter.showConfirmation.mockResolvedValue(true);

    await useCase.handle();

    expect(mockAdapter.installExtension).toHaveBeenCalledWith('ext-1');
    expect(mockAdapter.showInfo).toHaveBeenCalledWith(
      'Extension ext-1 has been installed'
    );
  });

  it('should skip installation when user declines', async () => {
    mockRepo.getAll.mockResolvedValue([Extension.fromData({ id: 'ext-1' })]);
    mockAdapter.isExtensionInstalled.mockResolvedValue(false);
    mockAdapter.showConfirmation.mockResolvedValue(false);

    await useCase.handle();

    expect(mockAdapter.installExtension).not.toHaveBeenCalled();
  });

  it('should show error on failure', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockRepo.getAll.mockRejectedValue(new Error('Network error'));

    await useCase.handle();

    expect(mockAdapter.showError).toHaveBeenCalledWith(
      'Error while installing extensions'
    );
  });
});
