import { Settings } from '../../domain/settings';

export interface SettingRepository {
  get(): Promise<Settings>
}
export const SettingRepository = Symbol('SettingRepository');