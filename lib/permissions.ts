import type { RoleName } from "@/lib/types";

export type Permission =
  | "users.manage"
  | "roles.manage"
  | "events.manage"
  | "brands.manage"
  | "brands.stock"
  | "event_brands.manage"
  | "sponsors.manage"
  | "media.manage"
  | "talent.review";

const permissionMatrix: Record<RoleName, Permission[]> = {
  main_admin: [
    "users.manage",
    "roles.manage",
    "events.manage",
    "brands.manage",
    "brands.stock",
    "event_brands.manage",
    "sponsors.manage",
    "media.manage",
    "talent.review"
  ],
  operations_staff: [
    "events.manage",
    "brands.manage",
    "event_brands.manage",
    "sponsors.manage",
    "media.manage",
    "talent.review"
  ],
  guest: []
};

export function hasPermission(role: RoleName, permission: Permission) {
  return permissionMatrix[role]?.includes(permission) ?? false;
}

export function isAdminRole(role: RoleName) {
  return role === "main_admin" || role === "operations_staff";
}

