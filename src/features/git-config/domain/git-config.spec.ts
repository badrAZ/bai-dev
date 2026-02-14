import { GitConfig } from './git-config';

describe('GitConfig', () => {
  it('should create a GitConfig with config string', () => {
    const gitConfig = new GitConfig('[user]\n  name = Badr');

    expect(gitConfig.data()).toEqual({ config: '[user]\n  name = Badr' });
  });

  it('should create GitConfig from data', () => {
    const gitConfig = GitConfig.fromData({ config: '[core]\n  editor = vim' });

    expect(gitConfig).toBeInstanceOf(GitConfig);
    expect(gitConfig.data().config).toBe('[core]\n  editor = vim');
  });
});
