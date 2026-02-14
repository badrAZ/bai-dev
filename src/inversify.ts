import { Container } from 'inversify';
import { bindExtensions } from './features/extensions/bind-extensions';
import { bindGitConfig } from './features/git-config/bind-git-config';
import { bindCommandRegistry } from './core/command-registry';
import { bindSettings } from './features/settings/bind-settings';
import { bindShortcuts } from './features/shortcuts/bind-shortcuts';
import { bindJestRunner } from './features/jest-runner/bind-jest-runner';
import { bindCodeLensRegistry } from './core/code-lens-registry';

const container = new Container();

// bind core
bindCommandRegistry(container);
bindCodeLensRegistry(container);

// bind features
bindExtensions(container);
bindGitConfig(container);
bindSettings(container);
bindShortcuts(container);
bindJestRunner(container);

export { container };
