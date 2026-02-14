import { ExtensionsRepository } from '../application/interfaces/extensions-repository';
import { Extension } from '../domain/extension';
import extensions from './data/extensions.json';

export class ExtensionsRepositoryImpl implements ExtensionsRepository {
  async getAll(): Promise<Extension[]> {
    return extensions.map(id => Extension.fromData({ id }));
  }
}
