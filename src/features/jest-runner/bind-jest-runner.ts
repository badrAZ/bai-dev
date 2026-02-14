import * as vscode from 'vscode'
import { Container } from 'inversify'
import { GetJestCommandsUseCase } from './application/get-jest-commands-use-case'
import { JestRunnerCodeLens } from './controllers/jest-runner-code-lens'
import { JestRunnerCommand } from './controllers/jest-runner-command'
import { JestRunnerResult } from './controllers/jest-runner-result'

export const bindJestRunner = (container: Container) => {
  container.bind(GetJestCommandsUseCase).toSelf()
  container.bind(JestRunnerCodeLens).toSelf()
  container.bind(JestRunnerCommand).toSelf()
  container.bind(JestRunnerResult).toSelf().inSingletonScope()
}
