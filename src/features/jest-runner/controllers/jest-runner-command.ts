import * as vscode from 'vscode'
import { VscodeCommand } from '@/core/vscode-command'
import { injectable } from 'inversify'

export const JEST_RUNNER_COMMAND_ID = 'bai-dev.jestRunner'

@injectable()
export class JestRunnerCommand extends VscodeCommand {
  id = JEST_RUNNER_COMMAND_ID

  async handle(
    _context: vscode.ExtensionContext,
    fileName: string,
    testTitle?: string
  ): Promise<void> {
    const command = this.getJestCommand()
    this.execCommand(command, fileName, testTitle)
  }

  private getJestCommand(): string {
    return (
      vscode.workspace.getConfiguration('bai-dev').get<string>('jestCommand') ??
      'yarn jest'
    )
  }

  private execCommand(
    command: string,
    fileName: string = '',
    testTitle?: string
  ): void {
    const test = testTitle ? `-t "${testTitle}"` : ''

    const terminal = vscode.window.createTerminal({ name: 'Jest Test Runner' })
    terminal.show()
    terminal.sendText(`${command} ${fileName} ${test}`, true)
  }
}
