import { VscodeCommand } from '@/core/vscode-command'
import { inject, injectable } from 'inversify'
import * as vscode from 'vscode'
import * as process from 'child_process'
import * as path from 'path'
import { JestRunnerResult } from './jest-runner-result'

export const JEST_RUNNER_COMMAND_ID = 'bai-dev.jestRunner'

@injectable()
export class JestRunnerCommand extends VscodeCommand {
  id = JEST_RUNNER_COMMAND_ID

  constructor(
    @inject(JestRunnerResult)
    private readonly jestRunnerResult: JestRunnerResult
  ) {
    super()
  }

  async handle(
    _context: vscode.ExtensionContext,
    range: vscode.Range,
    uri: vscode.Uri,
    fileName: string,
    testTitle?: string
  ): Promise<void> {
    const editor = this.getEditor(uri)
    if (!editor) {
      return
    }

    const jestRunnerResult = this.jestRunnerResult
    jestRunnerResult.init(editor, range)

    jestRunnerResult.addRunningState()

    try {
      const testFileArgs = fileName ? path.basename(fileName) : ''
      const testTitleArg = testTitle ? `-t "${testTitle}"` : ''
      const result = await this.execCommand(
        `yarn jest --no-cache ${testFileArgs} ${testTitleArg}`,
        path.dirname(uri.fsPath)
      )

      jestRunnerResult.addPassedState(result)
    } catch (error) {
      jestRunnerResult.addFailedState(
        error instanceof Error ? error.message : String(error)
      )
    }
  }

  private getEditor(uri: vscode.Uri): vscode.TextEditor | undefined {
    return vscode.window.visibleTextEditors.find(
      e => e.document.uri.toString() === uri.toString()
    )
  }

  private execCommand(command: string, cwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const proc = process.exec(command, { cwd, maxBuffer: 10 * 1024 * 1024 })

      let stdout = ''
      let stderr = ''

      proc.stdout?.on('data', (data: string) => {
        stdout += data
      })
      proc.stderr?.on('data', (data: string) => {
        stderr += data
      })

      proc.on('close', code => {
        if (code === 0) {
          resolve(stdout)
        } else {
          reject(stderr)
        }
      })
    })
  }
}
