export interface VscodeAdapter {
  showInfo(message: string): Promise<void>
  showConfirmation(message: string): Promise<boolean>
  showError(message: string): Promise<void>
  isExtensionInstalled(extensionId: string): Promise<boolean>
  installExtension(extensionId: string): Promise<void>
}

export const VscodeAdapter = Symbol('VscodeAdapter');
