// Convert BigInt to string and handle null values
export function transformData<T>(data: T): T {
    if (Array.isArray(data)) {
      return data.map(item => transformData(item)) as any;
    }
  
    if (data && typeof data === 'object') {
      return Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        if (value === null) {
          acc[key] = "";
        } else if (typeof value === 'bigint') {
          acc[key] = value.toString();
        } else if (typeof value === 'object') {
          acc[key] = transformData(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as T);
    }
  
    return data;
  }
  