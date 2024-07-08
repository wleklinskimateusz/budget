export function get<T, TKey extends keyof T>(key: TKey) {
  return (v: T) => v[key];
}
