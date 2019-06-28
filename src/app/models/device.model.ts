interface Capabilities {
  in: string[];
  out: string[];
}


export interface Device {
  _id?: string;
  name: string;
  description?: string;
  capabilities: Capabilities;
  lastActive?: Date;
  address?: string;
  driver?: string;
  driver_id?: string;
  online?: boolean;
}
