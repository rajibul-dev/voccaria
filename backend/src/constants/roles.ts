// all roles
export const ROLE = {
  USER: "user",
  STUDENT: "student",
  PAID_STUDENT: "paid-student",
  STAFF: "staff",
  RAJI: "raji",
  MIA: "mia",
} as const;

// role descriptions
export const ROLE_LABELS: Record<Roles, string> = {
  [ROLE.USER]: "User (default)",
  [ROLE.STUDENT]: "Student",
  [ROLE.PAID_STUDENT]: "Paid Student",
  [ROLE.STAFF]: "Staff Member",
  [ROLE.RAJI]: "Developer Raji",
  [ROLE.MIA]: "Admin Mia",
};

// types
export type StaffRole = typeof ROLE.STAFF | typeof ROLE.RAJI | typeof ROLE.MIA;
export type UserRole =
  | typeof ROLE.USER
  | typeof ROLE.STUDENT
  | typeof ROLE.PAID_STUDENT;
export type Roles = StaffRole | UserRole;

export type StudentRole =
  | typeof ROLE.STAFF
  | typeof ROLE.RAJI
  | typeof ROLE.USER
  | typeof ROLE.STUDENT
  | typeof ROLE.PAID_STUDENT;

// role arrays
export const ALL_STAFF_ROLES: StaffRole[] = [ROLE.STAFF, ROLE.RAJI, ROLE.MIA];
export const USER_ROLES: UserRole[] = [
  ROLE.USER,
  ROLE.STUDENT,
  ROLE.PAID_STUDENT,
];
export const ALL_ROLES: (StaffRole | UserRole)[] = [
  ...ALL_STAFF_ROLES,
  ...USER_ROLES,
];

// inheritted role logic
export const STUDENTS_ROLES: StudentRole[] = [
  ROLE.STAFF,
  ROLE.RAJI,
  ROLE.USER,
  ROLE.STUDENT,
  ROLE.PAID_STUDENT,
];

// utilities
export const isStaff = (role: string): role is StaffRole =>
  ALL_STAFF_ROLES.includes(role as StaffRole);

export const isUserRole = (role: string): role is UserRole =>
  USER_ROLES.includes(role as UserRole);
