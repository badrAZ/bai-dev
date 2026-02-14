import { injectable } from 'inversify';
import { VscodeInterfaceImpl } from '@/core/vscode-interface-impl';
import { VscodeAdapter } from '../application/interfaces/vscode-adapter';

@injectable()
export class VscodeAdapterImpl
  extends VscodeInterfaceImpl
  implements VscodeAdapter {}
