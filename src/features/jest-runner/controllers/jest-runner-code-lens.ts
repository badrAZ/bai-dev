import * as vscode from 'vscode'

import { inject, injectable } from 'inversify'
import { GetJestCommandsUseCase } from '../application/get-jest-commands-use-case'
import { JestTestFile } from '../domain/jest-test-file'
import { VscodeCodeLens } from '@/core/vscode-code-lens'
import { JEST_RUNNER_COMMAND_ID } from './jest-runner-command'

@injectable()
export class JestRunnerCodeLens extends VscodeCodeLens {
  options = {
    pattern: '**/*.{spec,test}.{ts,js,tsx,jsx}',
  }

  constructor(
    @inject(GetJestCommandsUseCase)
    private readonly getJestCommandsUseCase: GetJestCommandsUseCase
  ) {
    super()
  }

  provideCodeLenses(
    document: vscode.TextDocument
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    const commands = this.getJestCommandsUseCase.handle(
      JestTestFile.fromData({
        filename: document.fileName,
        content: document.getText(),
      })
    )


    return commands.map(command => {
      const range = new vscode.Range(
        command.line,
        0,
        command.line,
        0
      )

      const args = command.commandArgs ?? []
      return new vscode.CodeLens(range, {
        title: command.title,
        command: JEST_RUNNER_COMMAND_ID,
        arguments: [range, document.uri, ...args],
      })
    })
  }
}
