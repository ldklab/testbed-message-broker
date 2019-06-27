import { InteractionButton } from './interaction-button.model';
import { InteractionInput } from './interaction-input.model';

export interface Interaction {
  _id?: string;
  timestamp?: Date;
  us_id?: string;
  device?: string;
  status?: number;
  title: string;
  description: string;
  specific?: string;
  instructions?: string[];
  buttons?: InteractionButton[];
  level: number;
  inputs?: InteractionInput[];
}
