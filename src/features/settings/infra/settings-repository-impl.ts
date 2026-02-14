import { injectable } from 'inversify';
import { SettingRepository } from '../application/interfaces/setting-repository';
import { Settings } from '../domain/settings';
import fontData from './data/font.json';
import settingsData from './data/settings.json';

@injectable()
export class SettingsRepositoryImpl implements SettingRepository {
  get(): Promise<Settings> {
    return Promise.resolve(
      Settings.fromData({ settings: settingsData, font: fontData })
    );
  }
}
