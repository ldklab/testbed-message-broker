import { Capabilities } from './capabilities.model';

export interface Device {
  id?: string;
  name: string;
  description?: string;
  capabilities: Capabilities;
  lastActive: Date;
  address?: string;
  driver?: string;
  driver_id?: string;
}
