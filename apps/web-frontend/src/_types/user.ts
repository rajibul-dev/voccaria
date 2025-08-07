import { Roles } from "@/_constants/roles";

export interface User {
  _id: string;
  name: string;
  email: string;
  roles: [Roles];
  isVerified: boolean;
  verified?: Date;
  provider: "google" | "local";
  providerId?: string;
  avatar?: string;
  avatars: {
    manual?: string;
    google?: string;
    discord?: string;
    selected?: "manual" | "google" | "discord";
  };
  google?: {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    email_verified?: boolean;
  };
  discord?: {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    verified?: boolean;
    display_name?: string;
    avatar?: string;
  };
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllUsersResponse {
  users: User[];
  length: number;
}
