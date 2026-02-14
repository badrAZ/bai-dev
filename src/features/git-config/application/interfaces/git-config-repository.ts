export interface GitConfigRepository {
  get(): Promise<string>
}

export const GitConfigRepository = Symbol('GitConfigRepository');
