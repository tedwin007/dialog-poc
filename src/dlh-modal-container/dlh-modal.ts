import { DLHModal } from './../../src/dlh-modal.class';

export interface BaseDlhModal<InputData, OutputData = InputData>
  extends DLHModal<InputData> {
  close(data?: OutputData): void;
}
export type dialogType = ComponentDialog | TemplateRefDialog;

type ComponentDialog = any;
type TemplateRefDialog = any;
