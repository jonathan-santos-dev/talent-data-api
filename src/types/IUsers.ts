import { Role } from "./Role";

export interface IUser {
    userId: string;
    email: string;
    password: string;
    roles: Role[];
}

export type IUsers = IUser[];