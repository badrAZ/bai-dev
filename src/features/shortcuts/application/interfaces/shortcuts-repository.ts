import { Shortcuts } from "../../domain/shortcuts";

export interface ShortcutsRepository {
  getShortcuts(): Promise<Shortcuts>
}
export const ShortcutsRepository = Symbol('ShortcutsRepository');
