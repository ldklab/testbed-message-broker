export interface InteractionInput {
  title: string;
  name: string;
  type: string;
  elements?: {text: string, value: string}[];
  required?: boolean;
}

interface InteractionResponse {
  name: string;
  value: string;
}

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
  level: number;
  inputs?: InteractionInput[];
  response?: InteractionResponse[];
}
