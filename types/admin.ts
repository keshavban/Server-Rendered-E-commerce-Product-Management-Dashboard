import { Role } from "./roles";

export interface Admin {
  _id: string;
  email: string;
  role: Role;
}
