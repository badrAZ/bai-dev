import { injectable } from 'inversify';
import { ShortcutsRepository } from '../application/interfaces/shortcuts-repository';
import { Shortcuts } from '../domain/shortcuts';
import shortcutsData from './data/shortcuts.json';

@injectable()
export class ShortcutsRepositoryImpl implements ShortcutsRepository {
  getShortcuts(): Promise<Shortcuts> {
    return Promise.resolve(Shortcuts.fromData({ shortcuts: shortcutsData }));
  }
}
