export class Settings {
  constructor(
    private readonly settings: Record<string, any>,
    private readonly font: { name: string; url: string }
  ) {}

  get data() {
    return {
      settings: this.settings,
      font: this.font,
    };
  }

  static fromData(data: {
    settings: Record<string, any>
    font: { name: string; url: string }
  }) {
    return new Settings(data.settings, data.font);
  }
}
