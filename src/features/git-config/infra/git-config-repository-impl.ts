import { injectable } from 'inversify';
import { GitConfigRepository } from '../application/interfaces/git-config-repository';
import gitconfig from './data/gitconfig.txt';

@injectable()
export class GitConfigRepositoryImpl implements GitConfigRepository {
  async get(): Promise<string> {
    return gitconfig;
  }
}
