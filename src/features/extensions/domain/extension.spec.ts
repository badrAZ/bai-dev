import { Extension } from './extension';

describe('Extension', () => {
  it('should create an Extension with an id', () => {
    const extension = new Extension('esbenp.prettier-vscode');

    expect(extension.id).toBe('esbenp.prettier-vscode');
  });

  it('should return data with id', () => {
    const extension = new Extension('dbaeumer.vscode-eslint');

    expect(extension.data).toEqual({ id: 'dbaeumer.vscode-eslint' });
  });

  it('should create an Extension from data', () => {
    const extension = Extension.fromData({ id: 'eamodio.gitlens' });

    expect(extension).toBeInstanceOf(Extension);
    expect(extension.id).toBe('eamodio.gitlens');
  });
});
