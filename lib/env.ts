import "server-only";

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value.trim();
}

export function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export function getBooleanEnv(name: string, defaultValue: boolean = false): boolean {
  const value = getOptionalEnv(name);
  if (!value) return defaultValue;
  const normalized = value.toLowerCase();
  return normalized === "true" || normalized === "1";
}

export function isStaffApplicationOpen(): boolean {
  return (
    getBooleanEnv("STAFF_APPLICATION_OPEN", false) ||
    getBooleanEnv("NEXT_PUBLIC_STAFF_APPLICATION_OPEN", false)
  );
}

