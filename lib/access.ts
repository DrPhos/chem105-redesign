export const SEMESTER_ACCESS_CODE = "Fall2026-CHEM105";
export const ACCESS_COOKIE = "chem105_access";
export const ACCESS_COOKIE_VALUE = "fall-2026-chem105";

export function verifyAccessCode(code: string) {
  return code.trim() === SEMESTER_ACCESS_CODE;
}

export function hasCourseAccess(cookieValue: string | undefined) {
  return cookieValue === ACCESS_COOKIE_VALUE;
}
