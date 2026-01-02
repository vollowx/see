let uniqueIdCounters: Record<string, number> = {};

/**
 * Generates a unique ID with an prefix.
 */
export function genUniqueId(prefix: string): string {
  if (!(prefix in uniqueIdCounters)) {
    uniqueIdCounters[prefix] = 0;
  }
  const id = `${prefix}-${uniqueIdCounters[prefix]++}`;
  return id;
}
