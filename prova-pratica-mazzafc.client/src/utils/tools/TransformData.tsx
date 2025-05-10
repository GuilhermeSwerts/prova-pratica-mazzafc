export function TransformData<T>(
  data: T[],
  keys: (keyof T)[]
): Record<string, any[]> {
  const result: Record<string, any[]> = {};

  keys.forEach(key => {
    result[String(key)] = [];
  });

  data.forEach(item => {
    keys.forEach(key => {
      const value = item[key];
      const keyName = String(key);
      if (!result[keyName].includes(value)) {
        result[keyName].push(value);
      }
    });
  });

  return result;
}
