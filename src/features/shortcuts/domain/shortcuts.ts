export class Shortcuts {
  constructor(public readonly shortcuts: Record<string, unknown>[]) {}

  get data() {
    return {
      shortcuts: this.shortcuts,
    };
  }

  getStringShortcuts() {
    return JSON.stringify(this.data.shortcuts, null, 2);
  }

  static fromData(data: { shortcuts: Record<string, unknown>[] }) {
    return new Shortcuts(data.shortcuts);
  }
}
