// all roles (source of truth)
export const ROLE = {
  USER: "user",
  STUDENT: "student",
  PAID_STUDENT: "paid-student",
  STAFF: "staff",
  RAJI: "raji",
  MIA: "mia",
} as const;

// all roles type
export type RoleValue = (typeof ROLE)[keyof typeof ROLE];
export type Roles = RoleValue;

// Categorized role types
export type StaffRole = typeof ROLE.STAFF | typeof ROLE.RAJI | typeof ROLE.MIA;
export type UserRole =
  | typeof ROLE.USER
  | typeof ROLE.STUDENT
  | typeof ROLE.PAID_STUDENT;
export type StudentRole = UserRole | typeof ROLE.STAFF | typeof ROLE.RAJI;

// === Categorized arrays ===
export const ALL_STAFF_ROLES: StaffRole[] = [ROLE.STAFF, ROLE.RAJI, ROLE.MIA];

export const USER_ROLES: UserRole[] = [
  ROLE.USER,
  ROLE.STUDENT,
  ROLE.PAID_STUDENT,
];

export const STUDENTS_ROLES: StudentRole[] = [
  ROLE.USER,
  ROLE.STUDENT,
  ROLE.PAID_STUDENT,
  ROLE.STAFF,
  ROLE.RAJI,
];

export const ALL_ROLES: RoleValue[] = Object.values(ROLE);

// === Utilities ===
export const isStaff = (role: string): role is StaffRole =>
  ALL_STAFF_ROLES.includes(role as StaffRole);

export const isUserRole = (role: string): role is UserRole =>
  USER_ROLES.includes(role as UserRole);

// === Optional labels or meta ===
export const ROLE_LABELS: Record<RoleValue, string> = {
  [ROLE.USER]: "User (default)",
  [ROLE.STUDENT]: "Student",
  [ROLE.PAID_STUDENT]: "Paid Student",
  [ROLE.STAFF]: "Staff Member",
  [ROLE.RAJI]: "Developer Raji",
  [ROLE.MIA]: "Main Teacher Mia",
};
