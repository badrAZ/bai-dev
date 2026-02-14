export class GitConfig {
  constructor(private readonly config: string) {}

  data() {
    return {
      config: this.config,
    };
  }

  static fromData(data: { config: string }): GitConfig {
    return new GitConfig(data.config);
  }
}
