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
    this.execTestCommand(fileName, testTitle)
  }

  private execTestCommand(fileName: string = '', testTitle?: string): void {
    const command = this.getJestCommand()
    const terminal = this.getTerminal()

    const test = testTitle ? `-t "${testTitle}"` : ''

    terminal.show()
    terminal.sendText(`${command} ${fileName} ${test}`, true)
  }

  private getJestCommand(): string {
    return (
      vscode.workspace.getConfiguration('bai-dev').get<string>('jestCommand') ??
      'yarn jest'
    )
  }

  private getTerminal(): vscode.Terminal {
    const name = 'Jest Test Runner'

    const terminal = vscode.window.terminals.find(t => t.name === name)
    if (terminal) {
      return terminal
    }

    return vscode.window.createTerminal({ name })
  }
}
