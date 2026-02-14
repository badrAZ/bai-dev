export interface VscodeAdapter {
  applySettings(settings: Record<string, any>): Promise<void>
  showInfo(message: string): Promise<void>
  showError(message: string): Promise<void>
  showConfirmation(message: string): Promise<boolean>
  openUrl(url: string): Promise<void>
}
export const VscodeAdapter = Symbol('VscodeAdapter');
