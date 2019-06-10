import { InteractionButton } from './interaction-button.model';
import { InteractionInput } from './interaction-input.model';

export interface Interaction{
  id?: string;
  timestamp?: Date;
  us_id?: string;
  status?: number;
  title: string;
  message: string;
  specific?: string;
  instructions?: string[];
  buttons?: InteractionButton[];
  level: number;
  inputs?: InteractionInput[];
}
