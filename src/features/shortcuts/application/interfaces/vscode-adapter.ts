export interface VscodeAdapter {
  showInfo(message: string): Promise<void>
  showError(message: string): Promise<void>
  copyToClipboard(content: string): Promise<void>
}

export const VscodeAdapter = Symbol('VscodeAdapter');
