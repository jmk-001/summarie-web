export function deepSet<T extends object>(
  obj: T,
  path: string,
  value: unknown
) {
  const keys = path.split(".");
  let cur: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!;
    if (cur[k] == null || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[keys[keys.length - 1]!] = value;
}

export function deepUnset<T extends object>(obj: T, path: string) {
  const keys = path.split(".");
  let cur: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!;
    if (cur[k] == null || typeof cur[k] !== "object") return;
    cur = cur[k];
  }
  delete cur[keys[keys.length - 1]!];
}
