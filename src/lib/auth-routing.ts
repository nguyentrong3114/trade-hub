export type UserType = "admin" | "business" | "user";

/**
 * Return dashboard path (WITHOUT locale prefix) for each user type.
 */
export function getDashboardPathByUserType(userType: UserType): string {
  switch (userType) {
    case "admin":
      return "/dashboard/admin";
    case "business":
      return "/dashboard/company";
    case "user":
    default:
      return "/dashboard/user";
  }
}


