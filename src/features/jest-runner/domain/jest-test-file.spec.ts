import { JestTestFile } from './jest-test-file';

describe('JestTestFile', () => {
  it('should return filename and content', () => {
    const file = new JestTestFile('example.spec.ts', 'some content');

    expect(file.data()).toEqual({
      filename: 'example.spec.ts',
      content: 'some content',
    });
  });

  it('should create from data', () => {
    const file = JestTestFile.fromData({
      filename: 'example.spec.ts',
      content: 'content',
    });

    expect(file).toBeInstanceOf(JestTestFile);
    expect(file.data().filename).toBe('example.spec.ts');
  });

  it('should parse test lines from content', () => {
    const content =
      "describe('MyClass', () => {\n" +
      "  it('should do something', () => {\n" +
      '    expect(true).toBe(true)\n' +
      '  })\n' +
      '\n' +
      "  test('should do another thing', () => {\n" +
      '    expect(1).toBe(1)\n' +
      '  })\n' +
      '})';

    const file = JestTestFile.fromData({
      filename: 'my-class.spec.ts',
      content,
    });
    const testLines = file.getTestLines();

    expect(testLines).toHaveLength(2);
    expect(testLines[0].title).toBe('should do something');
    expect(testLines[1].title).toBe('should do another thing');
  });

  it('should parse it.skip and test.only', () => {
    const content = `describe('Suite', () => {
  it.skip('skipped test', () => {})
  test.only('only test', () => {})
})`;

    const file = new JestTestFile('suite.spec.ts', content);
    const testLines = file.getTestLines();

    expect(testLines).toHaveLength(2);
    expect(testLines[0].title).toBe('skipped test');
    expect(testLines[1].title).toBe('only test');
  });

  it('should return empty array when no tests found', () => {
    const content = `const x = 1`;

    const file = new JestTestFile('no-tests.ts', content);
    const testLines = file.getTestLines();

    expect(testLines).toHaveLength(0);
  });
});
