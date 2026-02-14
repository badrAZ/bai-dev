import { injectable } from 'inversify';
import { JestTestFile } from '../domain/jest-test-file';

type CommandType = {
  title: string
  line: number
  indent: number
  commandArgs?: string[]
}

@injectable()
export class GetJestCommandsUseCase {
  handle(testFile: JestTestFile): CommandType[] {
    const commands: CommandType[] = [];

    const filename = testFile.data().filename;

    // Top file command
    commands.push({
      title: 'Run tests',
      line: 0,
      indent: 0,
      commandArgs: [filename],
    });

    const testLines = testFile.getTestLines();
    for (const { title, line, indent } of testLines) {
      commands.push({
        title: 'Run Test',
        line,
        indent,
        commandArgs: [filename, title],
      });
    }

    return commands;
  }
}
