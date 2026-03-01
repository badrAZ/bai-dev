import { Container } from 'inversify'
import { GetJestCommandsUseCase } from './application/get-jest-commands-use-case'
import { JestRunnerCodeLens } from './controllers/jest-runner-code-lens'
import { JestRunnerCommand } from './controllers/jest-runner-command'

export const bindJestRunner = (container: Container) => {
  container.bind(GetJestCommandsUseCase).toSelf()
  container.bind(JestRunnerCodeLens).toSelf()
  container.bind(JestRunnerCommand).toSelf()
}
