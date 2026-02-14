import 'reflect-metadata';
import { InstallSettingUseCase } from './install-setting-use-case';
import { SettingRepository } from './interfaces/setting-repository';
import { VscodeAdapter } from './interfaces/vscode-adapter';
import { Settings } from '../domain/settings';

const createMockAdapter = (): jest.Mocked<VscodeAdapter> => ({
  showInfo: jest.fn(),
  showError: jest.fn(),
  showConfirmation: jest.fn(),
  applySettings: jest.fn(),
  openUrl: jest.fn(),
});

const createMockRepo = (): jest.Mocked<SettingRepository> => ({
  get: jest.fn(),
});

describe('InstallSettingUseCase', () => {
  let useCase: InstallSettingUseCase;
  let mockAdapter: jest.Mocked<VscodeAdapter>;
  let mockRepo: jest.Mocked<SettingRepository>;

  const mockSettings = Settings.fromData({
    settings: { 'editor.fontSize': 14 },
    font: { name: 'Fira Code', url: 'https://example.com/fira-code' },
  });

  beforeEach(() => {
    mockAdapter = createMockAdapter();
    mockRepo = createMockRepo();
    useCase = new InstallSettingUseCase(mockRepo, mockAdapter);
  });

  it('should apply settings and show success message', async () => {
    mockRepo.get.mockResolvedValue(mockSettings);
    mockAdapter.showConfirmation.mockResolvedValue(false);

    await useCase.handle();

    expect(mockAdapter.applySettings).toHaveBeenCalledWith({
      'editor.fontSize': 14,
    });
    expect(mockAdapter.showInfo).toHaveBeenCalledWith(
      'Badr AI settings applied successfully! If you do not see the changes, you may need to restart VS Code.'
    );
  });

  it('should open font URL when user confirms', async () => {
    mockRepo.get.mockResolvedValue(mockSettings);
    mockAdapter.showConfirmation.mockResolvedValue(true);

    await useCase.handle();

    expect(mockAdapter.openUrl).toHaveBeenCalledWith(
      'https://example.com/fira-code'
    );
  });

  it('should not open font URL when user declines', async () => {
    mockRepo.get.mockResolvedValue(mockSettings);
    mockAdapter.showConfirmation.mockResolvedValue(false);

    await useCase.handle();

    expect(mockAdapter.openUrl).not.toHaveBeenCalled();
  });

  it('should show error on failure', async () => {
    jest.spyOn(console, 'error').mockImplementation();
    mockRepo.get.mockRejectedValue(new Error('fail'));

    await useCase.handle();

    expect(mockAdapter.showError).toHaveBeenCalledWith(
      'An error occurred while applying settings.'
    );
  });
});
