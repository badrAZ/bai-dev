import { GetJestCommandsUseCase } from './get-jest-commands-use-case';
import { JestTestFile } from '../domain/jest-test-file';

describe('GetJestCommandsUseCase', () => {
  const useCase = new GetJestCommandsUseCase();

  it('should return a "Run tests" command for the file', () => {
    const testFile = JestTestFile.fromData({
      filename: '/path/to/file.spec.ts',
      content: '',
    });

    const commands = useCase.handle(testFile);

    expect(commands[0]).toEqual({
      title: 'Run tests',
      line: 0,
      indent: 0,
      commandArgs: ['/path/to/file.spec.ts'],
    });
  });

  it('should return commands for each test', () => {
    const content = `describe('Suite', () => {
  it('should work', () => {})
  test('should also work', () => {})
})`;

    const testFile = JestTestFile.fromData({
      filename: 'suite.spec.ts',
      content,
    });

    const commands = useCase.handle(testFile);

    expect(commands).toHaveLength(3);
    expect(commands[0].title).toBe('Run tests');
    expect(commands[1]).toEqual({
      title: 'Run Test',
      line: 2,
      indent: 2,
      commandArgs: ['suite.spec.ts', 'should work'],
    });
    expect(commands[2]).toEqual({
      title: 'Run Test',
      line: 3,
      indent: 2,
      commandArgs: ['suite.spec.ts', 'should also work'],
    });
  });

  it('should return only the file command when no tests found', () => {
    const testFile = JestTestFile.fromData({
      filename: 'empty.spec.ts',
      content: '// no tests here',
    });

    const commands = useCase.handle(testFile);

    expect(commands).toHaveLength(1);
    expect(commands[0].title).toBe('Run tests');
  });
});
