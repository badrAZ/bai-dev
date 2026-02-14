export class Extension {
  constructor(public id: string) {}

  get data() {
    return {
      id: this.id,
    };
  }

  static fromData(data: { id: string }) {
    return new Extension(data.id);
  }
}
