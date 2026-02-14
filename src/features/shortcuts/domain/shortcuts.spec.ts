import { Shortcuts } from './shortcuts';

describe('Shortcuts', () => {
  const mockShortcuts = [
    { key: 'ctrl+shift+p', command: 'workbench.action.showCommands' },
    { key: 'ctrl+p', command: 'workbench.action.quickOpen' },
  ];

  it('should create a Shortcuts instance', () => {
    const shortcuts = new Shortcuts(mockShortcuts);

    expect(shortcuts.data).toEqual({ shortcuts: mockShortcuts });
  });

  it('should return stringified shortcuts', () => {
    const shortcuts = new Shortcuts(mockShortcuts);

    const result = shortcuts.getStringShortcuts();

    expect(result).toBe(JSON.stringify(mockShortcuts, null, 2));
  });

  it('should create Shortcuts from data', () => {
    const shortcuts = Shortcuts.fromData({ shortcuts: mockShortcuts });

    expect(shortcuts).toBeInstanceOf(Shortcuts);
    expect(shortcuts.data.shortcuts).toEqual(mockShortcuts);
  });

  it('should handle empty shortcuts', () => {
    const shortcuts = new Shortcuts([]);

    expect(shortcuts.getStringShortcuts()).toBe('[]');
  });
});
