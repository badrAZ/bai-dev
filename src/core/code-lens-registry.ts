import { Container, injectable } from 'inversify';
import { VscodeCodeLens } from './vscode-code-lens';
import { JestRunnerCodeLens } from '@/features/jest-runner/controllers/jest-runner-code-lens';

@injectable()
export class CodeLensRegistry {
  private codeLenses: VscodeCodeLens[] = [];

  register(codeLens: VscodeCodeLens) {
    this.codeLenses.push(codeLens);
  }

  getAll() {
    return this.codeLenses;
  }
}

export const bindCodeLensRegistry = (container: Container) => {
  container.bind(CodeLensRegistry).toDynamicValue(() => {
    const codeLensRegistry = new CodeLensRegistry();

    // register code lenses here
    const jestRunnerCodeLens = container.get(JestRunnerCodeLens);
    codeLensRegistry.register(jestRunnerCodeLens);

    return codeLensRegistry;
  });
};
