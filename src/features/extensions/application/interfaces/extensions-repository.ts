import { Extension } from "../../domain/extension";

export interface ExtensionsRepository {
  getAll(): Promise<Extension[]>
}

export const ExtensionsRepository = Symbol('ExtensionsRepository');
