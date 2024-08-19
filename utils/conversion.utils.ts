/**
 * Convert BigInt to string.
 * @param value - The BigInt value.
 * @returns The string representation of the BigInt.
 */
export function bigIntToString(value: BigInt): string {
    return value.toString();
  }
  
  /**
   * Convert string to BigInt.
   * @param value - The string representation of a BigInt.
   * @returns The BigInt value.
   */
  export function stringToBigInt(value: string): BigInt {
    return BigInt(value);
  }
  