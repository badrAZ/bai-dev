import { Container, injectable } from 'inversify'
import { VscodeCommand } from './vscode-command'
import { ExtensionCommand } from '@/features/extensions/controllers/extension-command'
import { GitConfigCommand } from '@/features/git-config/controllers/git-config-command'
import { SettingsCommand } from '@/features/settings/controllers/settings-command'
import { ShortcutsCommand } from '@/features/shortcuts/controllers/shortcuts-command'
import { JestRunnerCommand } from '@/features/jest-runner/controllers/jest-runner-command'

@injectable()
export class CommandRegistry {
  private commands: VscodeCommand[] = []

  register(command: VscodeCommand) {
    this.commands.push(command)
  }

  getAll() {
    return this.commands
  }
}

export const bindCommandRegistry = (container: Container) => {
  container.bind(CommandRegistry).toDynamicValue(() => {
    const commandRegistry = new CommandRegistry()

    // register commands here
    const extensionCommand = container.get<ExtensionCommand>(ExtensionCommand)
    commandRegistry.register({
      id: extensionCommand.id,
      handle: extensionCommand.handle.bind(extensionCommand),
    })

    const gitConfigCommand = container.get<GitConfigCommand>(GitConfigCommand)
    commandRegistry.register({
      id: gitConfigCommand.id,
      handle: gitConfigCommand.handle.bind(gitConfigCommand),
    })

    const settingsCommand = container.get<SettingsCommand>(SettingsCommand)
    commandRegistry.register({
      id: settingsCommand.id,
      handle: settingsCommand.handle.bind(settingsCommand),
    })

    const shortcutsCommand = container.get<ShortcutsCommand>(ShortcutsCommand)
    commandRegistry.register({
      id: shortcutsCommand.id,
      handle: shortcutsCommand.handle.bind(shortcutsCommand),
    })

    const jestRunnerCommand =
      container.get<JestRunnerCommand>(JestRunnerCommand)
    commandRegistry.register({
      id: jestRunnerCommand.id,
      handle: jestRunnerCommand.handle.bind(jestRunnerCommand),
    })

    return commandRegistry
  })
}
