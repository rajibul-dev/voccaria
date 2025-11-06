export function isGmail(email: string): boolean {
  return email.toLowerCase().endsWith("@gmail.com");
}
