import { Settings } from './settings';

describe('Settings', () => {
  const mockSettings = { 'editor.fontSize': 14, 'editor.tabSize': 2 };
  const mockFont = { name: 'Fira Code', url: 'https://example.com/fira-code' };

  it('should create a Settings instance', () => {
    const settings = new Settings(mockSettings, mockFont);

    expect(settings.data).toEqual({
      settings: mockSettings,
      font: mockFont,
    });
  });

  it('should create Settings from data', () => {
    const settings = Settings.fromData({
      settings: mockSettings,
      font: mockFont,
    });

    expect(settings).toBeInstanceOf(Settings);
    expect(settings.data.settings).toEqual(mockSettings);
    expect(settings.data.font).toEqual(mockFont);
  });
});
