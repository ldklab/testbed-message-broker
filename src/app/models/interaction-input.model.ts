export interface InteractionInput {
  title: string;
  name: string;
  type: string;
  elements?: {text: string, value: string}[];
  required?: boolean;
}
